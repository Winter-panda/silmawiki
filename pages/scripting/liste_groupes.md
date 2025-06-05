
---

### ✅ `gestion_groupes.md`


# Gestion des groupes AD (exports membres)

Scripts permettant de lister les membres de groupes Active Directory à des fins de documentation et d'analyse.

## Fonctionnalités

- Export des membres de tous les groupes
- Possibilité de cibler un ou plusieurs groupes spécifiques
- Sortie CSV pour exploitation documentaire

## Exemple simple

```powershell
Get-ADGroupMember -Identity "DL_FINANCE_MODIFY" | Select-Object Name, SamAccountName | Export-Csv -Path "Membres_Finance.csv" -NoTypeInformation
