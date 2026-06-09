# Document d'Explication de l'Application Chelonians App

Ce document présente de façon exhaustive les fonctionnalités de l'application, son fonctionnement global, son architecture technique multi-plateforme, et l'historique détaillé des modifications apportées à l'application **Chelonians App** (Groupe 2), développée pour l'IFREMER afin de suivre l'observation des chéloniens (tortues) en Martinique.

---

## 1. Ce que l'Application Réalise et Permet de Faire (Fonctionnalités)

L'application **Chelonians App** est un outil de science participative et de suivi scientifique destiné aux observateurs de tortues marines en Martinique. Elle offre les fonctionnalités suivantes :

### A. Accueil Immersif & Sensibilisation
* **Interface visuelle premium :** Présentation d'un visuel plein écran (Hero Layout) mettant en valeur une tortue marine pour capter l'intérêt de l'utilisateur dès l'ouverture de l'application ([Home.vue](file:///c:/xampp/htdocs/TOUT/cheloniens_groupe2/src/renderer/src/Views/Home.vue)).
* **Contraste accessible :** Une superposition d'ombrage sombre sur l'image d'arrière-plan assure le strict respect des contrastes d'accessibilité (normes WCAG AA), garantissant la parfaite lisibilité des textes et titres.
* **Appel à l'action immédiat (CTA) :** Un bouton incite l'utilisateur à démarrer instantanément le signalement d'une tortue.

### B. Signalement d'Observations de Tortues Marines
L'écran dédié ([SawTurtle.vue](file:///c:/xampp/htdocs/TOUT/cheloniens_groupe2/src/renderer/src/Views/SawTurtle.vue)) guide l'utilisateur pas à pas dans l'enregistrement d'une observation :
1. **Géolocalisation Assistée (GPS) :** Un bouton de localisation automatique détecte les coordonnées GPS de l'observateur.
2. **Carte Interactive Leaflet :** Une carte OpenStreetMap intégrée s'affiche à l'écran. L'utilisateur peut :
   * Cliquer n'importe où sur la carte pour définir précisément le lieu de son observation.
   * Glisser/déplacer le marqueur (pin) pour corriger sa position en temps réel.
   * Voir les champs de latitude et longitude se remplir automatiquement à partir de la carte.
3. **Formulaire de Données Complètes :** Saisie d'informations environnementales et biologiques :
   * Localisation textuelle (lieu-dit, commune).
   * Coordonnées géographiques (latitude/longitude renseignées par la carte).
   * Date d'observation.
   * Conditions météorologiques.
   * Nombre de tortues observées.
   * Profondeur estimée de l'observation (en mètres).
   * Ajout d'une photo de l'observation.
   * Commentaires ou remarques libres.

### C. Mode Hors-ligne Résilient (Zéro Perte de Données)
* **Détection de Réseau :** L'application teste en temps réel la connectivité de l'appareil via le plugin `@capacitor/network`.
* **File d'Attente de Sauvegarde Locale :** Si l'utilisateur effectue un signalement en pleine mer ou dans une zone sans couverture réseau :
  * Les données de l'observation sont interceptées avant l'envoi HTTP.
  * Elles sont stockées localement dans le `LocalStorage` de l'appareil (sous la clé `pending_observations`).
  * Un message rassurant indique à l'utilisateur que son signalement est sauvegardé localement et sera synchronisé ultérieurement.

### D. Gestion de Profil & Authentification Modulaire
* **Inscription & Connexion :** Un bouton de profil dans la barre de navigation ouvre une modale coulissante interactive proposant les formulaires d'inscription (Mail, Nom, Prénom, Mot de passe) et de connexion.
* **Découplage UX :** Les formulaires sont centralisés dans le composant autonome [LoginBox.vue](file:///c:/xampp/htdocs/TOUT/cheloniens_groupe2/src/renderer/src/Components/LoginBox.vue) avec commutation par onglets réactifs.
* **Fermeture intelligente :** La modale d'authentification se ferme automatiquement si l'utilisateur clique en dehors de celle-ci.

### E. Navigation Ergonomique & Responsive
* **Menu de Navigation Mobile :** Sur les écrans de smartphones et tablettes (< 768px de largeur), les liens textuels de navigation disparaissent pour laisser place à un bouton de menu hamburger (`☰`) qui déploie un menu vertical animé en transition slide-fade.
* **Thème Dynamique (Clair / Sombre) :** Possibilité de configurer et d'appliquer dynamiquement des couleurs personnalisées s'adaptant aux préférences visuelles de l'utilisateur via une feuille de style réactive gérée dans [appState.ts](file:///c:/xampp/htdocs/TOUT/cheloniens_groupe2/src/renderer/src/appState.ts).

---

## 2. Architecture Technique Multi-Plateforme

L'application est structurée en monorépo regroupant les environnements de bureau, mobiles et serveur.

```
       ┌─────────────────────────────────────────────────────────┐
       │                 Monorépo (package.json)                 │
       └─────────────────────────────────────────────────────────┘
                                    │
         ┌──────────────────────────┴──────────────────────────┐
         ▼                                                     ▼
┌──────────────────┐                                   ┌────────────────┐
│     FRONTEND     │                                   │    BACKEND     │
│  (src/renderer)  │                                   │   (backend/)   │
└──────────────────┘                                   └────────────────┘
         │                                                     │
 ┌───────┼───────┐                                             ▼
 ▼       ▼       ▼                                     ┌────────────────┐
Vue 3  Vite  Router                                    │ Express API    │
 │       │       │                                     │ (TypeScript)   │
 └───────┬───────┘                                     └────────────────┘
         │                                                     │
 ┌───────┴───────┐                                             ▼
 ▼               ▼                                     ┌────────────────┐
Electron     Capacitor                                 │ Pool MariaDB   │
(Bureau)   (Mobile iOS/Android)                        └────────────────┘
```

### A. Le Frontend (Vue 3 + Vite + Electron & Capacitor)
Situé à la racine et dans le dossier `src/` :
* **Vue 3 :** Framework d'interface avec la syntaxe moderne `<script setup>` (Composition API).
* **Vite & Vue Router :** Outil de build et routage d'application à page unique (SPA).
* **Electron :** Encapsule l'interface web pour s'exécuter sous forme d'application de bureau native (Windows, macOS, Linux).
* **Capacitor (v6) :** Permet d'encapsuler la même interface web pour générer des applications natives pour iOS et Android.
* **Leaflet (JS) :** Bibliothèque cartographique légère affichant les tuiles OpenStreetMap de la Martinique de façon performante.

### B. Le Backend (Express + TypeScript + MariaDB)
Situé dans le dossier `backend/` :
* **Express & TypeScript :** Serveur d'API typé, léger et performant.
* **tsx (TypeScript Execute) :** Exécute à la volée les fichiers de script du serveur avec surveillance automatique des modifications (live reloading).
* **MariaDB / MySQL :** Base de données relationnelle hébergeant les comptes utilisateurs (futur) et les signalements de tortues marines.

---

## 3. Stockage et Persistance des Données

L'application combine stockage relationnel distant et persistance locale.

### A. Stockage Relationnel distant (Serveur)
* **Base de données MariaDB :** Les signalements envoyés au serveur via la route `POST /api/observations` sont enregistrés dans la table `cheloniensmartinique` de la base `cheloniens`.
* **Pool de connexions asynchrones :** Configure dans [db_connect.ts](file:///c:/xampp/htdocs/TOUT/cheloniens_groupe2/backend/src/db_connect.ts), un pool de connexions MariaDB permet d'éviter l'ouverture/fermeture répétitive de sockets de base de données.
* **Initialisation Automatique :** Le script [initDb.ts](file:///c:/xampp/htdocs/TOUT/cheloniens_groupe2/backend/src/initDb.ts) s'assure au lancement que la base et la structure de la table existent.

### B. Stockage Local (Client & Mode Hors-ligne)
* **LocalStorage (Session & Thèmes) :** Sauvegarde des préférences utilisateur et de l'état de connexion.
* **LocalStorage (Observations en attente) :** Enregistrement temporaire au format JSON des signalements collectés hors-ligne.
* **Electron safeStorage (Bureau) :** Permet de chiffrer localement les données sensibles de connexion de manière sécurisée sous OS Windows/macOS.

---

## 4. Cartographie des Fichiers Clés

```text
cheloniens_groupe2/
├── backend/                        # Serveur API Express
│   ├── src/
│   │   ├── server.ts               # Routes de l'API (ex: POST /api/observations)
│   │   ├── db_connect.ts           # Connexion au pool MariaDB
│   │   ├── initDb.ts               # Initialisation automatique de la base
│   │   └── cheloniens.sql          # Structure SQL des tables
│   ├── package.json                # Dépendances & scripts du backend
│   └── tsconfig.json               # Config TypeScript du backend
├── src/                            # Code source Frontend (Electron & Web/Capacitor)
│   ├── main/
│   │   └── index.ts                # Processus principal Electron (fenêtre native)
│   ├── preload/
│   │   └── index.ts                # Pont de communication inter-processus (IPC)
│   └── renderer/                   # Interface Utilisateur (Vue 3 / Vite)
│       ├── index.html              # Point d'entrée HTML, CSP & Viewport
│       └── src/
│           ├── App.vue             # Composant racine de l'application web
│           ├── appState.ts         # Gestion de l'état global et thèmes CSS
│           ├── router.ts           # Configuration du routage
│           ├── Components/
│           │   ├── Header.vue      # Bandeau de navigation & Menu mobile hamburger
│           │   ├── Footer.vue      # Pied de page informatif
│           │   ├── LoginBox.vue    # Formulaires d'authentification (Tabs)
│           │   └── SvgSprites.vue  # Sprites d'icônes SVG intégrés
│           ├── Layouts/
│           │   └── MainLayout.vue  # Structure englobante commune des pages
│           └── Views/
│               ├── Home.vue        # Page d'accueil responsive avec image Hero
│               ├── SawTurtle.vue   # Carte interactive Leaflet & Formulaire
│               └── Error404.vue    # Page d'erreur de redirection
├── package.json                    # Configuration générale et scripts du Monorépo
└── electron.vite.config.ts         # Configuration de build Electron-Vite
```

---

## 5. Fonctionnement des Composants Clés

### A. Géolocalisation Hybride & Carte ([SawTurtle.vue](file:///c:/xampp/htdocs/TOUT/cheloniens_groupe2/src/renderer/src/Views/SawTurtle.vue))
* **Méthode `getGPSLocation` :**
  * Si exécutée sur ordinateur (`isDesktop` déterminé par la présence de l'objet `electron` dans `window`), la fonction utilise l'API standard `navigator.geolocation` du navigateur intégré à Electron.
  * Si exécutée sur un appareil mobile (iOS/Android), elle bascule sur le plugin natif `@capacitor/geolocation`.
* **Mise à jour et synchronisation :**
  Les coordonnées obtenues centrent la carte Leaflet et mettent à jour la position d'un marqueur déplaçable. Le déplacement (drag) de ce marqueur ou le clic à un autre endroit de la carte met instantanément à jour les inputs de formulaire `latitude` et `longitude` (configurés en lecture seule pour éviter des modifications incohérentes au clavier).

### B. Authentification Modulaire & Interface Responsive ([Header.vue](file:///c:/xampp/htdocs/TOUT/cheloniens_groupe2/src/renderer/src/Components/Header.vue) & [LoginBox.vue](file:///c:/xampp/htdocs/TOUT/cheloniens_groupe2/src/renderer/src/Components/LoginBox.vue))
* **Extraction structurelle :** La logique et le rendu des formulaires ont été déplacés dans `LoginBox.vue` pour garder `Header.vue` léger et lisible.
* **Transition d'affichage :** La modale d'authentification s'ouvre avec un effet de glissement vertical (`slideOut`) et écoute les clics à l'extérieur des composants `.loginBox` et `.profile` pour se refermer automatiquement.
* **Composant Mobile hamburger :** Une requête média CSS (`@media (max-width: 768px)`) masque le menu classique sur petits écrans. Un bouton menu hamburger (`☰`) pilote l'affichage d'une liste déroulante interactive `mobile-dropdown`.

### C. Design Immersif & Contrastes ([Home.vue](file:///c:/xampp/htdocs/TOUT/cheloniens_groupe2/src/renderer/src/Views/Home.vue))
* **Hero Section :** L'image d'accueil est dimensionnée pour occuper la totalité de l'espace disponible sous le header (`object-fit: cover`).
* **Masque d'ombrage :** Une superposition sombre à opacité contrôlée (`rgba(0, 0, 0, 0.45)`) est positionnée au-dessus de l'image de fond pour assurer un parfait respect des contrastes d'accessibilité (WCAG AA), rendant la typographie blanche lisible.
* **Image représentative :** Affiche l'image de la tortue ([image1.jpg](file:///c:/xampp/htdocs/TOUT/cheloniens_groupe2/src/renderer/src/assets/image1.jpg)) avec les dimensions appropriées pour illustrer le suivi.

---

## 6. Modifications Clés Apportées au Projet (Historique de la branche `mobileVersion`)

Voici le récapitulatif détaillé des modifications concrètes qui ont été apportées au code source pour résoudre les bugs d'environnement, intégrer la base de données relationnelle et préparer l'application pour le mobile :

### A. Configuration Générale & Scripts ([package.json](file:///c:/xampp/htdocs/TOUT/cheloniens_groupe2/package.json))
* **Résolution des crashs npm (`postinstall`) :** Suppression du script `"postinstall": "electron-builder install-app-deps"`. Ce script compilait inutilement des dépendances C++ natives inexistantes dans le projet et bloquait l'installation à cause d'incompatibilités sous Node v21.4.0.
* **Correction de compatibilité Vite/Vue (`@vitejs/plugin-vue`) :** Rétrogradation de `@vitejs/plugin-vue` en version `5.2.1` (via `--legacy-peer-deps`). La version 6 utilisait `crypto.hash` qui requiert Node.js >= 22, provoquant une erreur de compilation sur les machines équipées de Node v21.
* **Ajout de scripts pour le mobile :** Ajout des raccourcis `"dev:android": "npx cap run android"` et `"dev:ios": "npx cap run ios"`.
* **Ajout des dépendances Capacitor :** Intégration de `@capacitor/core@6`, `@capacitor/cli@6`, `@capacitor/android@6` et `@capacitor/ios@6` pour supporter le build mobile.
* **Ajout des dépendances Cartographiques & Off-line :** Ajout de `leaflet` et ses types `@types/leaflet`, ainsi que `@capacitor/geolocation` et `@capacitor/network` pour la gestion du GPS et de la connectivité réseau.
* **Ajout du client MariaDB :** Intégration de la dépendance `mariadb` à la racine pour assurer la connexion au serveur de base de données depuis Node.js.

### B. Interface Utilisateur & Stabilité TypeScript (`src/renderer/src/`)
* **Extraction de `LoginBox.vue` [NOUVEAU] :**
  * Création du composant autonome [LoginBox.vue](file:///c:/xampp/htdocs/TOUT/cheloniens_groupe2/src/renderer/src/Components/LoginBox.vue) contenant toute la structure (HTML) et la logique (TypeScript) d'authentification (connexion/inscription).
  * Refactorisation de [Header.vue](file:///c:/xampp/htdocs/TOUT/cheloniens_groupe2/src/renderer/src/Components/Header.vue) pour importer et utiliser `<LoginBox />` au sein d'une transition animée, allégeant la taille du Header et améliorant la modularité du code.
* **Nettoyage et Résolution des conflits git (`Components/Header.vue`) :**
  * Suppression des balises de conflits de fusion git (`<<<<<<< Updated upstream` ... `=======` ... `>>>>>>> Stashed changes`).
  * Suppression/mise en commentaire des fonctions et références inutilisées (`openDrawer`, `closeDrawer`, `openedDrawerIndex`). En mode strict, ces variables déclarées mais jamais lues bloquaient l'étape de vérification de type `typecheck:web` lors du build.
* **Neutralité de la plateforme (`App.vue`) :**
  * Ajout de la constante `isDesktop` détectant la présence d'Electron via `'electron' in window`.
  * Encapsulation sécurisée de la requête IPC de test : `window.electron.ipcRenderer.send('ping')` ne s'exécute désormais que sur ordinateur, évitant ainsi un crash de l'application lors de son exécution sous Android/iOS.
* **Intégration GPS & Hors-ligne (`Views/SawTurtle.vue`) :**
  * Remplacement du centrage par défaut de la carte (Metz, France) par un ciblage dynamique basé sur la géolocalisation de l'utilisateur (avec repli par défaut sur la Martinique).
  * Création d'une fonction hybride utilisant le plugin `@capacitor/geolocation` sur mobile et l'API standard `navigator.geolocation` sur PC.
  * Ajout d'un marqueur (pin) déplaçable (draggable) et gestionnaire de clics sur la carte pour renseigner dynamiquement et en temps réel les coordonnées de latitude/longitude dans le formulaire (champs en lecture seule).
  * Mise en place d'une file d'attente d'observations hors-ligne : si le plugin `@capacitor/network` détecte que l'utilisateur est déconnecté, la soumission du formulaire stocke temporairement les données dans le `localStorage` sous la clé `pending_observations` au lieu de tenter un envoi HTTP échoué.

### C. Configuration Native Android (`android/`)
* **Résolution du chemin de SDK (`android/local.properties` [NOUVEAU]) :** Création du fichier définissant la variable `sdk.dir=C:/Users/59669/AppData/Local/Android/Sdk`. Cela permet à Gradle de localiser le SDK Android local et d'exécuter la commande `npx cap run android` avec succès.
* **Configuration Capacitor (`capacitor.config.ts` [NOUVEAU]) :** Création du fichier de configuration pointant vers le répertoire de build web `out/renderer` avec l'identifiant de paquet unique `com.ifremer.cheloniens`.

### D. Intégration de la Base de Données MariaDB / MySQL (Backend) [NOUVEAU]
* **Configuration du pool de connexions (`backend/src/db_connect.ts` [NOUVEAU]) :** Mise en place d'un pool d'accès à la base de données `cheloniens` hébergée localement.
* **Script d'initialisation (`backend/src/initDb.ts` [NOUVEAU]) :** Création d'une fonction permettant d'assurer la présence de la base de données et de la table `cheloniensmartinique` en environnement local de développement.
* **Script SQL de structure (`backend/src/cheloniens.sql` [NOUVEAU]) :** Ajout du script de modélisation SQL contenant la structure de la base de données.
* **Modification de la route Express (`backend/src/server.ts`) :**
  * Suppression de la route de test `/api/hello`.
  * Ajout de la route `POST /api/observations` qui récupère les données de signalement envoyées par le client, effectue une validation minimale, et insère les informations (localisation, date, météo, nombre de tortues, profondeur, commentaires, photos) dans la table `cheloniensmartinique` de la base MariaDB via le pool de connexions asynchrone.

### E. Refonte Visuelle & Responsivité (Interface Utilisateur) [NOUVEAU]
* **Page d'Accueil Premium (`src/renderer/src/Views/Home.vue`) :**
  * Ajout d'une superposition sombre (`rgba(0, 0, 0, 0.45)`) garantissant un excellent contraste (accessibilité WCAG AA) pour la lisibilité du titre blanc.
  * Affichage de la photo de tortue `image1.jpg` dans la page d'accueil.
  * Correction de la casse d'import de `MainLayout` (majuscule `L`) pour éviter tout échec de compilation portable.
* **Menu de Navigation Mobile (`src/renderer/src/Components/Header.vue`) :**
  * Remplacement des liens horizontaux par un menu hamburger déroulant (`☰`) réactif s'activant sous les 768px de largeur d'écran.
  * Logique de détection des clics en dehors du menu déroulant pour le refermer automatiquement.
  * Effet de transition CSS fluide (`slide-fade`) pour l'apparition et disparition du menu.
* **Sécurisation de la Politique de Contenu (CSP) & Viewport (`src/renderer/index.html`) :**
  * Intégration de la balise meta `viewport` pour assurer le redimensionnement automatique sur écran mobile.
  * Autorisation de charger les tuiles de cartes OpenStreetMap (`img-src https://*.tile.openstreetmap.org`) pour corriger le blocage des cartes sur PC (Electron) et mobiles (Capacitor).
