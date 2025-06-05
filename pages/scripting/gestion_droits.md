
---

### ✅ `gestion_droits.md`

# Gestion des droits NTFS & AD

Scripts permettant d'automatiser l'attribution et le retrait des droits d'accès aux partages et aux dossiers.

## Fonctionnalités

- Attribution des droits NTFS via groupes AGDLP
- Suppression sécurisée des droits obsolètes
- Contrôle de cohérence entre groupes AD et ACL

## Exemple de modification NTFS

```powershell
icacls "D:\Partages\Finance" /grant "Domaine\DL_FINANCE_MODIFY:(OI)(CI)M"
