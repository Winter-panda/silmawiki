# Bases Active Directory pour l'Administration

## 📌 Introduction

Active Directory (AD) est un service d'annuaire de Microsoft permettant de centraliser la gestion des utilisateurs, des ordinateurs, des groupes, des droits et des ressources au sein d'un réseau d'entreprise.

* Centralise l'identité des utilisateurs
* Gère les droits d'accès et les permissions
* Organise les ressources via une structure hiérarchique

---

## 🔍 Concepts de base

### Domaine

* Un domaine est un regroupement logique d'objets AD (utilisateurs, machines, groupes).
* Exemple : `domain.local`

### Contrôleur de domaine (DC)

* Serveur qui héberge l'annuaire AD.
* Réplique les données entre plusieurs DC.

### Unites d'organisation (OU)

* Sous-divisions logiques pour organiser les objets AD.
* Exemple : `OU=Utilisateurs,OU=Entreprise,DC=domain,DC=local`

### Groupes

* Utilisés pour attribuer des droits et permissions à plusieurs utilisateurs simultanément.
* Types :

  * **Security** : pour les droits d'accès
  * **Distribution** : pour la messagerie

### GPO (Group Policy Objects)

* Permettent de configurer automatiquement les paramètres système et sécurité des machines et des utilisateurs.
* S'appliquent aux OU et aux utilisateurs/machines qu'elles contiennent.

---

## 🔧 Commandes PowerShell de base

### Importer le module AD

```powershell
Import-Module ActiveDirectory
```

### Créer un utilisateur

```powershell
New-ADUser -Name "Jean Dupont" -GivenName "Jean" -Surname "Dupont" -SamAccountName "jdupont" -UserPrincipalName "jdupont@domain.local" -Path "OU=Utilisateurs,DC=domain,DC=local" -AccountPassword (ConvertTo-SecureString "P@ssw0rd!" -AsPlainText -Force) -Enabled $true
```

### Créer un groupe

```powershell
New-ADGroup -Name "Groupe-Support" -GroupScope Global -GroupCategory Security -Path "OU=Groupes,DC=domain,DC=local"
```

### Ajouter un utilisateur à un groupe

```powershell
Add-ADGroupMember -Identity "Groupe-Support" -Members "jdupont"
```

### Lister les membres d'un groupe

```powershell
Get-ADGroupMember -Identity "Groupe-Support"
```

### Rechercher un utilisateur

```powershell
Get-ADUser -Filter "Name -like '*Jean*'"
```

---

## 🔢 Outils graphiques complémentaires

* **Utilisateurs et ordinateurs Active Directory (dsa.msc)** : gestion graphique des objets AD.
* **GPMC (Group Policy Management Console)** : gestion des GPO.
* **RSAT** : outils d'administration à distance.

---

## ✅ Bonnes pratiques

* Organiser les OU par fonction ou site.
* Privilégier les groupes pour l’attribution des droits (modèle AGDLP).
* Documenter toutes les créations et modifications.
* Activer la journalisation et le monitoring AD.
