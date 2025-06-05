# Bases Réseau pour l'Administration

## 🔌 Introduction

L'administration réseau est un des piliers des infrastructures informatiques. Maîtriser les concepts de base est essentiel pour la gestion et le diagnostic des systèmes connectés.

---

## 🔧 Composants réseau de base

### Adresse IP

* Identifiant unique d'une machine sur un réseau.
* Exemple IPv4 : `192.168.1.10`
* Masque de sous-réseau : détermine la taille du réseau (ex: `255.255.255.0`).

### Passerelle (Gateway)

* Route par défaut permettant d'accéder aux réseaux extérieurs.

### DNS (Domain Name System)

* Résolution des noms de domaine en adresses IP.
* Exemple : `google.com` -> `142.250.190.14`

### DHCP (Dynamic Host Configuration Protocol)

* Attribution dynamique des adresses IP aux clients du réseau.

### VLAN (Virtual LAN)

* Segmentation logique du réseau pour isoler les flux et renforcer la sécurité.

---

## 🔢 Commandes de diagnostic essentielles

### Afficher la configuration réseau locale

```powershell
ipconfig /all
```

### Vérifier la connectivité

```powershell
ping adresse_ip_ou_nom
```

### Suivre le chemin jusqu'à une destination

```powershell
tracert adresse_ip_ou_nom
```

### Tester la résolution DNS

```powershell
nslookup nom_de_domaine
```

### Voir les connexions actives et les ports

```powershell
netstat -an
```

### Scanner les ports d'une machine distante (PowerShell v5+)

```powershell
test-netconnection -computername serveur -port 80
```

---

## 📁 Partages réseaux et lecteurs mappés

### Mapper un lecteur réseau

```powershell
New-PSDrive -Name "Z" -PSProvider FileSystem -Root "\\serveur\partage" -Persist
```

### Supprimer un lecteur réseau

```powershell
Remove-PSDrive -Name "Z"
```

### Liste des lecteurs réseaux

```powershell
Get-PSDrive -PSProvider FileSystem
```

### Ancienne méthode (toujours utilisable)

```powershell
net use
```

---

## 🔒 Concepts de sécurité réseau associés

* Pare-feu Windows (inbound/outbound rules)
* Filtrage IP sur les routeurs
* Isolation de VLAN sensibles (ex : serveurs, production, management)
* Limitation des droits d'accès aux partages réseaux (NTFS + Share Permissions)

---

## ✅ Bonnes pratiques

* Documenter les plans d'adressage IP.
* Segmenter les réseaux selon les usages (utilisateurs, serveurs, supervision).
* Surveiller les performances et les saturations de bande passante.
* Contrôler les journaux d'événements réseaux (Switchs, Firewall, Serveurs).
