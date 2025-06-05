## But

Permettre une analyse régulière des structures d'accès et assurer un suivi documentaire.

---

### ✅ `exports.md`

```markdown
# Exports et reporting

Scripts d'exportation permettant de générer des fichiers d'inventaire à partir de l'Active Directory.

## Types d'exports réalisés

- Liste des utilisateurs
- Liste des groupes
- Appartenance des utilisateurs aux groupes
- Exports spécifiques AGDLP
- Exportation des ACL des partages NTFS

## Exemple

```powershell
Get-ADUser -Filter * -Property DisplayName, Department, Title | Export-Csv -Path "Utilisateurs.csv" -NoTypeInformation -Delimiter ";"
