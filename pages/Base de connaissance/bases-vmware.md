# Bases VMware pour l'Administration de la Virtualisation

## 🔧 Introduction générale à VMware

VMware est un des leaders mondiaux de la virtualisation de serveurs, de postes de travail et de datacenters.  
Il propose plusieurs produits adaptés à des environnements différents :

- VMware **ESXi** : hyperviseur bare-metal utilisé en production sur des serveurs physiques.
- VMware **Workstation** : hyperviseur de type 2 utilisé principalement sur les postes de travail, pour des environnements de tests, développement et lab.

---

## 🖥️ Présentation de VMware ESXi

### 📌 Qu'est-ce que ESXi ?

- Hyperviseur de type 1 (bare-metal), s'installe directement sur le serveur physique.
- Fournit un environnement d'exécution de machines virtuelles très performant et fiable.
- N'a pas d'interface graphique locale : la gestion s'effectue depuis un autre poste via vSphere Client ou Web Client.

### 📌 Architecture générale

- Serveur physique (CPU, RAM, Disques, Cartes réseaux, etc.)
- Hyperviseur ESXi
- Machines virtuelles exécutées au-dessus d’ESXi
- Gestion centralisée possible via vCenter Server

### 📌 Fonctionnalités clés

- Haute disponibilité (HA)
- Répartition de charge (DRS)
- vMotion (migration à chaud des VM)
- Snapshots
- Gestion avancée du stockage (iSCSI, NFS, Fibre Channel)

---

## 🛠️ Installation d'ESXi (bare-metal)

### Prérequis matériel

- Serveur physique compatible VMware (Vérifier la **Hardware Compatibility List (HCL)** de VMware)
- Clé USB, CD/DVD ou ISO pour l’installation

### Étapes d'installation

1. Démarrer sur le média d'installation ESXi.
2. Suivre l'assistant (choix du disque, configuration du mot de passe root).
3. Redémarrer le serveur.
4. Accéder à l'interface Web pour la configuration initiale :  
   `https://adresse_IP_ESXi/ui`

---

## 🖥️ Présentation de VMware Workstation

### 📌 Qu'est-ce que VMware Workstation ?

- Hyperviseur de type 2 (hosted).
- Fonctionne sous Windows ou Linux.
- Permet de créer et exécuter des VM sur un poste de travail classique.
- Idéal pour :  
  - Lab personnel  
  - Développement et tests  
  - Formations et maquettes

### 📌 Fonctionnalités principales

- Création de snapshots.
- Réseautage avancé : NAT, bridged, host-only.
- Partage de VM.
- Support de multiples OS (Windows, Linux, etc.).
- Copie et clonage de VM.
- Intégration avec vSphere/ESXi pour monter des labs hybrides.

---

## ⚙️ Différences principales ESXi vs Workstation

| Fonction | ESXi | Workstation |
|----------|------|-------------|
| Type d'hyperviseur | Type 1 (bare-metal) | Type 2 (hosté) |
| Support de production | Oui | Non |
| Support HA, vMotion | Oui (via vCenter) | Non |
| Nombre de VM supportées | Très élevé (datacenter) | Limité à la machine hôte |
| Utilisation | Production serveur | Poste de travail, lab, dev |
| Interface de gestion | Web Client ou vSphere | Application locale |

---

## 🗃️ Composants communs importants

### 📂 Datastore (ESXi)

- Zone de stockage contenant les fichiers VM : 
  - `.vmdk` (disques)
  - `.vmx` (configurations)
  - Snapshots

### 🌐 Réseautage VMware

- **Virtual Switch (vSwitch) :** Commutateur virtuel interne à ESXi ou Workstation.
- **Port Group :** Définition des VLAN et politiques réseau.
- **VMKernel Adapter (ESXi) :** Interfaces réseau système pour la gestion, vMotion, stockage, etc.

---

## 🔒 Sécurisation minimale de l’infrastructure VMware

- Mise à jour régulière des hyperviseurs (patchs de sécurité).
- Séparer le réseau de gestion (management) du réseau de production.
- Restreindre les accès à l'interface d'administration.
- Mettre en place des sauvegardes régulières des VM.

---

## 🧰 Outils complémentaires

- **vSphere Client** : gestion graphique des hôtes ESXi et vCenter.
- **Veeam Backup & Replication** : sauvegarde professionnelle de VM.
- **VMware Converter** : migration physique vers virtuel (P2V).
- **VMware Tools** : amélioration des performances et de l’intégration des VM.

---

## ✅ Bonnes pratiques de l’administrateur VMware

- Toujours planifier l'espace disque suffisant pour les snapshots.
- Limiter les snapshots dans le temps.
- Vérifier les logs ESXi régulièrement (`/var/log/`).
- Documenter chaque hôte et chaque VM (CPU, RAM, réseau, stockage).
- Tester régulièrement les procédures de restauration de VM.

---

# 🚀 Conclusion rapide

- **VMware Workstation** → excellent pour apprendre, tester et simuler.
- **VMware ESXi** → solution de production robuste et performante.

Les deux solutions sont complémentaires pour tout administrateur souhaitant monter en compétence sur la virtualisation.

