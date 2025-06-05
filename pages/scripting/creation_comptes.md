
## Prérequis

Droits administrateur sur l'AD

Accès aux modules Active Directory PowerShell

---

### ✅ `creation_comptes.md`

```markdown
# Création de comptes Active Directory

Automatisation complète de la création des comptes utilisateurs, groupes et boîtes aux lettres.

## Fonctionnalités incluses

- Création des utilisateurs via CSV ou formulaire
- Affectation automatique des groupes et permissions
- Création des boîtes Exchange (optionnel)
- Application du modèle AGDLP dès la création

## Exemple de commande PowerShell

```powershell
New-ADUser -Name "Jean Dupont" -SamAccountName "jdupont" -UserPrincipalName "jdupont@domaine.com" -Path "OU=Utilisateurs,DC=lab,DC=local" -Enabled $true
```
