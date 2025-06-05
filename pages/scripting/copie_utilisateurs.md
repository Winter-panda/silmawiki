# Audit des accès effectifs

Ce module contient les scripts permettant d'analyser les accès réels des utilisateurs aux ressources du système de fichiers et aux partages NTFS.

## Fonctionnalités

- Extraction des droits effectifs (ACL + groupes AD)
- Calcul des héritages et permissions cumulées
- Exportation en CSV ou Excel pour audit et revue des droits

## Objectif

Faciliter les contrôles périodiques de sécurité et préparer les audits internes ou externes.

## Exemple de commande PowerShell

```powershell
Get-Acl -Path "D:\Partages\Donnees" | Format-List

```
## Remarques

Les groupes sources et cibles doivent exister préalablement.

Une vérification préalable des membres est recommandée avant exécution.