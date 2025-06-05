# Bases de Sécurité Informatique pour l'Administration

## 🔐 Introduction

La sécurité informatique est un pilier indispensable de l'administration des systèmes et réseaux. Elle vise à protéger les données, l'accès aux ressources et la continuité des services contre les menaces internes et externes.

---

## 🔒 Les 3 grands principes fondamentaux

### 1️⃣ Confidentialité

* Protéger les données contre les accès non autorisés.
* Chiffrement, droits d'accès NTFS, contrôle des identités.

### 2️⃣ Intégrité

* Garantir que les données ne soient pas modifiées de manière illégitime.
* Journaux d'événements, contrôle des versions, hash de vérification.

### 3️⃣ Disponibilité

* Garantir l'accès aux services et aux données légitimes.
* Redondance, sauvegardes, haute disponibilité.

---

## 🔧 Les composants essentiels de la sécurité

### 🔑 Gestion des comptes et des accès (IAM)

* Utiliser Active Directory pour centraliser les identités.
* Appliquer le principe du moindre privilège (seulement les droits nécessaires).
* Exiger des mots de passe complexes et du renouvellement régulier.
* Mettre en place le MFA (authentification multifacteur).

### 🔑 Gestion des groupes (modèle AGDLP)

* AGDLP : Accounts > Global groups > Domain Local groups > Permissions.
* Simplifie la gestion des droits et la traçabilité.

### 🔑 Contrôle d'accès aux fichiers (NTFS + Partages)

* Cumuler les droits NTFS (niveau fichiers) et Share (niveau partage).
* Préférer la gestion par groupes plutôt qu’individuellement.

---

## 🧱 Sécurisation des postes et serveurs

### 🔥 Pare-feu Windows

* Activer et configurer les règles entrantes/sortantes.
* Restreindre les ports uniquement nécessaires.

### 🧪 Antivirus et antimalware

* Solutions type Microsoft Defender, Sophos, Bitdefender...
* Mise à jour régulière des signatures.

### 🔒 Mises à jour système

* WSUS ou Windows Update pour déployer les patchs de sécurité.
* Veiller à l’application rapide des correctifs critiques.

### 🔒 Gestion des GPO de sécurité

* Restrictions d'accès aux périphériques USB.
* Configuration des politiques de mot de passe.
* Restrictions logicielles et contrôle des applications autorisées.

### 🔏 Journalisation et audit

* Activer l'audit de sécurité : connexion, modification de fichier, élévation de privilèges.
* Centraliser les logs via un serveur Syslog, SIEM ou Windows Event Collector.

---

## 🛡️ Sécurisation du réseau

* VLAN de séparation des flux sensibles (admin, production, utilisateurs).
* Sécurisation des routeurs et switchs (accès SSH, ACL).
* VPN sécurisé pour les accès distants (ex: WireGuard, IPsec).
* Protection contre les attaques DDOS, sniffing et spoofing.

---

## 🗄️ Sauvegardes et continuité d'activité

* Réaliser des sauvegardes complètes et incrémentales.
* Tester les restaurations régulièrement.
* Mettre en place des PRA/PCA (plans de reprise/d'activité).
* Externaliser les sauvegardes pour éviter la perte totale locale.

---

## 🚀 Bonnes pratiques de l'administrateur

* Toujours utiliser des comptes d’administration distincts des comptes utilisateurs.
* Ne jamais travailler en administrateur en continu.
* Chiffrer les postes et serveurs sensibles (BitLocker, TPM).
* Former les utilisateurs à la sensibilisation sécurité (phishing, mots de passe, fuites de données).
* Mettre en place des procédures de gestion des incidents (plan de réponse aux incidents).
