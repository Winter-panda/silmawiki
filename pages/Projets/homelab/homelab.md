
# 🏠 Mise en place de l'infrastructure complète à domicile

---

## 🔧 Prérequis Techniques

- Proxmox VE
- VMware ESXi (optionnel)
- Serveur physique dédié
- Routeur et switch manageables
- NAS TrueNAS
- Onduleur

---

## 🖥️ Création des Machines Virtuelles

Pour chaque VM :

- Créer la VM depuis l'interface Proxmox
- Affecter l'ISO d'installation adaptée
- Choisir le bridge réseau correspondant (ex : vmbr0, vmbr1...)
- Attribuer les ressources selon les besoins

---

## 🌐 Configuration Réseau

### Linux (Debian)

```bash
nano /etc/network/interfaces

iface ens18 inet static
    address 192.168.20.X
    netmask 255.255.255.0
    gateway 192.168.20.254
    dns-nameservers 192.168.20.250

systemctl restart networking
```

### Windows Server Core

```powershell
New-NetIPAddress -InterfaceAlias "Ethernet" -IPAddress 192.168.20.X -PrefixLength 24 -DefaultGateway 192.168.20.254
Set-DnsClientServerAddress -InterfaceAlias "Ethernet" -ServerAddresses 192.168.20.250
ping 192.168.20.250
```

---

## 🏢 Installation de l’Active Directory

- Windows Server 2022 avec interface graphique

### Installer les rôles AD, DNS, DHCP

```powershell
Install-WindowsFeature AD-Domain-Services, DNS, DHCP -IncludeManagementTools
```

### Promouvoir le serveur AD

```powershell
Install-ADDSForest -DomainName "ad.labhome.fr"
```

### Configurer DHCP

```powershell
Add-DhcpServerv4Scope -Name "LAN" -StartRange 192.168.20.100 -EndRange 192.168.20.200 -SubnetMask 255.255.255.0
Set-DhcpServerv4OptionValue -DnsServer 192.168.20.250 -DnsDomain "ad.labhome.fr"
```

- Créer les OU, utilisateurs et groupes via RSAT
- Déployer les GPO nécessaires

---

## 🐧 Intégration des Linux au domaine

### Installer les paquets nécessaires

```bash
apt update && apt install realmd sssd sssd-tools libnss-sss libpam-sss adcli krb5-user samba-common-bin -y
```

### Découverte et jonction au domaine

```bash
realm discover ad.labhome.fr
realm join --user=Administrateur ad.labhome.fr
```

### Configurer SSSD

```bash
nano /etc/sssd/sssd.conf
chmod 600 /etc/sssd/sssd.conf
systemctl restart sssd
id utilisateur@ad.labhome.fr
```

---

## 🗃️ Installation et configuration du NAS (TrueNAS)

- Installer TrueNAS en VM (1 disque système, 3 disques data)
  
- Créer un Pool ZFS nommé `backupnas`
  
- Activer le service iSCSI
  
- Créer le portail, target, extent et les associer
  
- Activer les services iSCSI

---

## 🔗 Configuration iSCSI sur les serveurs Windows

- Lancer l’initiateur iSCSI (`iscsicpl`)
  
- Ajouter le portail : `192.168.30.1`
  
- Connecter la cible
  
- Initialiser le disque et formater en NTFS

---

## 🗄️ RAID et Stockage Windows (srv-fic1)

- Ajouter les disques sous Proxmox
  
- Créer les volumes RAID 1 / RAID 5 via diskmgmt.msc
  
- Activer la déduplication de données :

```powershell
Install-WindowsFeature -Name FS-Data-Deduplication
```

---

## 💾 Sauvegardes

### Backup Exec

- Télécharger et installer Backup Exec
  
- Ajouter les serveurs `srv-ad1`, `srv-fic1`
  
- Créer les jobs :
  
    - Sauvegarde complète hebdomadaire
  
    - Sauvegarde incrémentale quotidienne
  
    - Destination : `BACKUPNAS`

### Veeam Backup & Replication

- Télécharger Veeam Backup Community Edition
  
- Ajouter les hôtes à sauvegarder
  
- Créer les jobs Full + Incrémental
  
- Test de restauration de fichiers et de VMs

---

## 🌐 Web et Reverse Proxy

### Serveurs Web

```bash
apt install apache2 -y
nano /var/www/html/index.html
```

### Proxy HAProxy

```bash
apt install haproxy -y
nano /etc/haproxy/haproxy.cfg
```

Exemple de configuration :

```bash
frontend http
    bind *:80
    default_backend webpool

backend webpool
    balance roundrobin
    server web1 192.168.20.21:80 check

    server web2 192.168.20.22:80 check

    server web3 192.168.20.23:80 check backup

```

- Ajouter un enregistrement DNS `www` pointant sur le proxy : `192.168.20.20`

---

## 🔐 VPN WireGuard

### Serveur VPN

```bash
apt update && apt install wireguard -y

wg genkey | tee privatekey | wg pubkey > publickey
```

Fichier de configuration serveur `/etc/wireguard/wg0.conf` :

```ini
[Interface]
Address = 10.6.0.1/24

ListenPort = 51820

PrivateKey = <clé_privée_serveur>


[Peer]
PublicKey = <clé_publique_client>

AllowedIPs = 10.6.0.2/32

```

### Activer l’IP forwarding

```bash
echo "net.ipv4.ip_forward=1" >> /etc/sysctl.conf

sysctl -p

systemctl enable wg-quick@wg0

systemctl start wg-quick@wg0

```

### Côté client WireGuard

Fichier de configuration client :

```ini
[Interface]
PrivateKey = <clé_privée_client>

Address = 10.6.0.2/32

DNS = 192.168.20.250


[Peer]
PublicKey = <clé_publique_serveur>

Endpoint = vpn.labhome.fr:51820

AllowedIPs = 192.168.20.0/24, 172.16.1.0/24

PersistentKeepalive = 25

```

---

## 📡 Supervision Centreon & Grafana

### Centreon

- Télécharger et installer Centreon depuis ISO
  
- Configurer les hôtes à superviser
  
- Installer les plugins :

```bash
apt install centreon-plugins centreon-plugin-* -y
```

- Déployer les agents SNMP, NRPE, NSClient++

### Gestion des notifications

- Créer les utilisateurs et groupes
  
- Paramétrer les notifications emails

### Grafana

- Installer Grafana :

```bash
apt install -y software-properties-common
add-apt-repository "deb https://packages.grafana.com/oss/deb stable main"
wget -q -O - https://packages.grafana.com/gpg.key | sudo apt-key add -
apt update && apt install grafana -y
systemctl enable grafana-server
systemctl start grafana-server
```

- Connecter Grafana à Centreon (API, InfluxDB, ou base SQL)
  
- Créer les dashboards de supervision

---

## 📧 Hébergement de Messagerie

### Installation Postfix + Dovecot

```bash
apt update && apt install postfix dovecot-core dovecot-imapd -y
```

### Configuration Postfix `/etc/postfix/main.cf`

```ini
myhostname = mail.labhome.fr
mydomain = labhome.fr
myorigin = /etc/mailname
inet_interfaces = all
inet_protocols = ipv4
mydestination = $myhostname, localhost.$mydomain, localhost, $mydomain
home_mailbox = Maildir/
smtpd_tls_cert_file=/etc/ssl/certs/letsencrypt/fullchain.pem
smtpd_tls_key_file=/etc/ssl/private/letsencrypt/privkey.pem
smtpd_use_tls=yes
```

### Génération de certificat SSL avec Let’s Encrypt

```bash
apt install certbot python3-certbot -y
certbot certonly --standalone -d mail.labhome.fr
```

### Configuration Dovecot `/etc/dovecot/conf.d/10-mail.conf`

```bash
mail_location = maildir:~/Maildir
```

### Création des boîtes Maildir

```bash
mkdir -p /home/utilisateur/Maildir
chown -R utilisateur:utilisateur /home/utilisateur/Maildir
```

### Redémarrage des services

```bash
systemctl restart dovecot
systemctl restart postfix
```

- Ajouter les enregistrements DNS MX / SPF / DKIM / DMARC sur le domaine `labhome.fr`

---

✅ **Cette infrastructure permet de mettre en oeuvre un grand nombre de compétences Systèmes, Réseaux, Sauvegarde, Sécurité, Automatisation et Supervision au sein d'un LAB personnel.**

---

## 📂 Documentation détaillée des étapes

Vous trouverez ci-dessous les pages détaillées de configuration et installation de chaque composant de l'infrastructure :

<div class="subpage-container">

<a href="#" onclick="loadContent('centreon_grafana')" class="subpage-card">
    <div style="font-size:40px; margin-bottom:10px;"><i class="fas fa-chart-line"></i></div>
    <h3>Centreon & Grafana</h3>
</a>

<a href="#" onclick="loadContent('guacamole')" class="subpage-card">
    <div style="font-size:40px; margin-bottom:10px;"><i class="fas fa-network-wired"></i></div>
    <h3>Guacamole</h3>
</a>

<a href="#" onclick="loadContent('proxmox')" class="subpage-card">
    <div style="font-size:40px; margin-bottom:10px;"><i class="fas fa-server"></i></div>
    <h3>Proxmox</h3>
</a>

<a href="#" onclick="loadContent('sauvegardes')" class="subpage-card">
    <div style="font-size:40px; margin-bottom:10px;"><i class="fas fa-database"></i></div>
    <h3>Sauvegardes</h3>
</a>

<a href="#" onclick="loadContent('serveur_mail')" class="subpage-card">
    <div style="font-size:40px; margin-bottom:10px;"><i class="fas fa-envelope"></i></div>
    <h3>Serveur Mail</h3>
</a>

<a href="#" onclick="loadContent('truenas')" class="subpage-card">
    <div style="font-size:40px; margin-bottom:10px;"><i class="fas fa-hdd"></i></div>
    <h3>TrueNAS</h3>
</a>

<a href="#" onclick="loadContent('vpn_wireguard')" class="subpage-card">
    <div style="font-size:40px; margin-bottom:10px;"><i class="fas fa-shield-alt"></i></div>
    <h3>VPN WireGuard</h3>
</a>

</div>


