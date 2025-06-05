# Introduction à PowerShell pour l'Administration Systèmes

## 📌 Qu'est-ce que PowerShell ?

PowerShell est un langage de script et une interface en ligne de commande développé par Microsoft.
Il est conçu spécifiquement pour l'automatisation des tâches d'administration système.

* Objectif principal : administrer Windows Server, Active Directory, Exchange, etc.
* Permet d’exécuter des commandes simples ou des scripts complexes.

---

## 📌 Fonctionnement de base

### Lancer une session PowerShell

* Sur un poste Windows :
  `Démarrer` > `Windows PowerShell` ou `Windows Terminal` (recommandé)

* L’invite de commande ressemble à :

```powershell
PS C:\Users\Administrateur>
```

### Cmdlets

Les commandes PowerShell sont appelées **cmdlets**.

* Syntaxe générale :
  **Verbe-Nom**

Exemples :

* `Get-Process` ➔ Récupérer les processus
* `Set-ExecutionPolicy` ➔ Modifier la stratégie d’exécution des scripts
* `Get-Help` ➔ Obtenir de l'aide

---

## 📌 Les bases à connaître

### Aide intégrée

```powershell
Get-Help Get-Process -Detailed
```

> Permet d’obtenir une description complète d'une cmdlet.

### Variables

```powershell
$Nom = "Jean"
Write-Output $Nom
```

### Exécution de scripts

Avant d'exécuter des scripts :

```powershell
Set-ExecutionPolicy RemoteSigned
```

Pour exécuter un script `.ps1` :

```powershell
.\MonScript.ps1
```

---

# 1️⃣ Création d'un utilisateur dans Active Directory

> Nécessite le module RSAT-AD-PowerShell (déjà présent sur les serveurs AD).

### Importer le module AD :

```powershell
Import-Module ActiveDirectory
```

### Créer un utilisateur

```powershell
New-ADUser `
    -Name "Jean Dupont" `
    -GivenName "Jean" `
    -Surname "Dupont" `
    -SamAccountName "jdupont" `
    -UserPrincipalName "jdupont@domain.local" `
    -Path "OU=Utilisateurs,DC=domain,DC=local" `
    -AccountPassword (ConvertTo-SecureString "P@ssw0rd!" -AsPlainText -Force) `
    -Enabled $true
```

---

# 2️⃣ Création d'un groupe

### Créer un groupe simple

```powershell
New-ADGroup `
    -Name "Groupe-Support" `
    -GroupScope Global `
    -GroupCategory Security `
    -Path "OU=Groupes,DC=domain,DC=local"
```

---

# 3️⃣ Ajouter un utilisateur à un groupe

### Ajouter

```powershell
Add-ADGroupMember -Identity "Groupe-Support" -Members "jdupont"
```

### Retirer

```powershell
Remove-ADGroupMember -Identity "Groupe-Support" -Members "jdupont" -Confirm:$false
```

### Voir les membres du groupe

```powershell
Get-ADGroupMember -Identity "Groupe-Support"
```

---

# 4️⃣ Vérifier l'application des GPO

### Voir les GPO appliquées sur le poste local

```powershell
gpresult /r
```

### Voir les GPO appliquées sur un autre ordinateur

```powershell
gpresult /S NomDuPoste /USER domaine\utilisateur /r
```

### Utiliser `Get-GPO` (si RSAT GroupPolicy installé)

```powershell
Get-GPO -All
```

---

# 5️⃣ Lister les lecteurs réseaux connectés

### Sur le poste local :

```powershell
Get-PSDrive -PSProvider FileSystem
```

### Méthode alternative :

```powershell
net use
```

### Sur un utilisateur distant (plus avancé, via session distante) :

```powershell
Invoke-Command -ComputerName NomDuPoste -ScriptBlock { net use }
```

---

# 6️⃣ Récapitulatif rapide des cmdlets clés

| Action                 | Cmdlet                 |
| ---------------------- | ---------------------- |
| Créer utilisateur      | `New-ADUser`           |
| Créer groupe           | `New-ADGroup`          |
| Ajouter membre         | `Add-ADGroupMember`    |
| Supprimer membre       | `Remove-ADGroupMember` |
| Voir membres groupe    | `Get-ADGroupMember`    |
| Liste GPO appliquées   | `gpresult`             |
| Liste lecteurs réseaux | `Get-PSDrive`          |

---

# ✅ Conseils pratiques

* Utilisez `Get-Help` pour explorer chaque cmdlet.
* Testez toujours vos commandes avec des comptes de test.
* Travaillez avec `-WhatIf` pour simuler avant exécution.

Exemple :

```powershell
Remove-ADUser -Identity "jdupont" -WhatIf
```
