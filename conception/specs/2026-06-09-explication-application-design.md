# Document d'Explication de l'Application Chelonians App

Ce document présente le fonctionnement global, l'architecture technique, et les préconisations d'évolution de l'application **Chelonians App** (Groupe 2), développée pour l'IFREMER afin de suivre l'observation des chéloniens (tortues) en Martinique.

---

## 1. Présentation Générale

L'application est conçue pour fonctionner comme une application de bureau multiplateforme. Elle permet à l'utilisateur de :
1. Consulter des informations sur l'accueil.
2. Signaler l'observation d'une tortue à l'aide d'un formulaire dédié (et d'une future carte interactive).
3. Se connecter et s'inscrire via une interface de profil intégrée au bandeau de navigation.

---

## 2. Architecture Technique

L'application utilise une architecture moderne basée sur un **monorépo** regroupant deux parties principales :

### A. Le Frontend (Electron + Vue 3 + Vite)
Situé dans les dossiers racine et `src/`, le frontend utilise :
* **Electron :** Permet d'encapsuler l'application web dans une fenêtre de bureau native.
* **Vue 3 :** Framework Javascript réactif structuré avec la `Composition API` (syntaxe `<script setup>`).
* **Vite :** Outil de build rapide et serveur de développement.
* **Vue Router :** Gère la navigation entre les vues (Accueil, Formulaire de signalement, Erreur 404).

### B. Le Backend (Express + TypeScript)
Situé dans le dossier `backend/`, il s'agit d'un serveur d'API ultra-léger utilisant :
* **Express :** Framework web minimaliste pour Node.js.
* **TypeScript :** Version typée de Javascript compilée en Javascript moderne.
* **tsx (TypeScript Execute) :** Utilisé pour exécuter à la volée et surveiller les fichiers TypeScript sans étape de compilation manuelle en développement.

---

## 3. Stockage et Persistance des Données (Base de données relationnelle & LocalStorage)

L'application a évolué pour utiliser une base de données relationnelle **MariaDB/MySQL** côté serveur, tout en conservant une approche hybride côté client pour gérer le mode hors-ligne.

### A. Côté Frontend (Persistance Locale / Client & Mode Hors-ligne)
Pour conserver l'état de connexion de l'utilisateur et assurer la résilience hors-ligne :
* **LocalStorage pour la Session :** Permet de sauvegarder des paires clé/valeur persistantes (ex: session de l'utilisateur ou thème actif).
* **LocalStorage pour les Observations Hors-ligne :** Si le plugin `@capacitor/network` détecte que l'utilisateur est hors-ligne, les signalements de tortues saisis sont temporairement stockés dans une file d'attente sous la clé `pending_observations` au format JSON, avant d'être synchronisés une fois la connexion rétablie.
* **Electron safeStorage (Bureau) :** Pour chiffrer les données sensibles (comme les identifiants) sur ordinateur.

### B. Côté Backend (Persistance Relationnelle / Serveur)
Pour sauvegarder de manière structurée et pérenne les signalements de tortues envoyés :
* **Base de données MariaDB / MySQL :** Les données reçues par l'API Express sont insérées dans la base `cheloniens`, dans la table dédiée `cheloniensmartinique`.
* **Pool de connexions (`mariadb`) :** Le serveur utilise un pool de connexions géré par le package `mariadb` (défini dans `backend/src/db_connect.ts`) pour communiquer efficacement avec la base de données.
* **Initialisation de la Base (`backend/src/initDb.ts`) :** Script qui permet de créer automatiquement la base de données et les tables nécessaires lors du démarrage de l'environnement de développement.

Exemple de connexion au pool dans `db_connect.ts` :
```typescript
import * as mariadb from 'mariadb';

const pool = mariadb.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'cheloniens',
    connectionLimit: 5,
    namedPlaceholders: true
});

export default pool;
```


---

## 4. Structure des Répertoires et Fichiers

Voici une cartographie simplifiée du code source du projet :

```text
cheloniens_groupe2/
├── backend/                        # Serveur API
│   ├── src/
│   │   ├── server.ts               # Serveur Express & définition des routes API
│   │   ├── db_connect.ts           # [NOUVEAU] Gestion du pool de connexions MariaDB
│   │   ├── initDb.ts               # [NOUVEAU] Initialisation automatique de la base
│   │   └── cheloniens.sql          # [NOUVEAU] Structure SQL de la base de données
│   ├── package.json                # Dépendances & scripts du serveur backend
│   └── tsconfig.json               # Config TypeScript du backend
├── src/                            # Code source du conteneur Electron et Frontend
│   ├── main/
│   │   └── index.ts                # Processus principal Electron (cycle de vie de la fenêtre)
│   ├── preload/
│   │   └── index.ts                # Pont de communication sécurisé (IPC)
│   └── renderer/                   # Interface utilisateur (Vue 3 / Vite)
│       ├── index.html              # Point d'entrée HTML
│       └── src/
│           ├── App.vue             # Composant racine
│           ├── appState.ts         # Gestion de l'état global, des thèmes et de la session utilisateur
│           ├── router.ts           # Configuration des routes de navigation
│           ├── Components/         # Composants réutilisables (Header, Footer, SvgSprites, LoginBox [NOUVEAU])
│           ├── Layouts/            # Structures de page (MainLayout)
│           └── Views/              # Vues principales (Home, SawTurtle, Error404)
├── package.json                    # Configuration générale du monorépo (workspaces)
└── electron.vite.config.ts         # Configuration de build Electron-Vite
```

---

## 5. Fonctionnement des Composants Clés

### A. Le Thème Dynamique (`appState.ts`)
Le fichier [appState.ts](file:///c:/xampp/htdocs/TOUT/cheloniens_groupe2/src/renderer/src/appState.ts) contient un objet global réactif définissant toutes les variables de couleurs pour les modes **clair** et **sombre** (ex: `--bg`, `--text`, `--btnBgHover`). 
Au montage de l'application, la fonction `initCssThemeVariables()` génère dynamiquement une balise `<style>` injectée dans le `<head>` pour appliquer ces variables CSS selon le thème actif.

### B. Le Formulaire de Connexion & Inscription et Menu Mobile (`LoginBox.vue` et `Header.vue`)
Le formulaire de connexion et d'inscription a été extrait dans un composant autonome [LoginBox.vue](file:///c:/xampp/htdocs/TOUT/cheloniens_groupe2/src/renderer/src/Components/LoginBox.vue) afin de découpler la logique d'authentification du bandeau de navigation [Header.vue](file:///c:/xampp/htdocs/TOUT/cheloniens_groupe2/src/renderer/src/Components/Header.vue).
* **Header.vue** se charge de l'affichage/masquage de la modale d'authentification via un effet de transition CSS `slideOut` et écoute les clics en dehors pour fermer le panneau.
* **LoginBox.vue** gère les deux formulaires (connexion et inscription) grâce à des onglets dynamiques. Les données sont liées via `v-model` avec les objets réactifs `formSignin` et `formLogin`, et envoyées au backend via la fonction `submitProfileForm`.
* **Menu Hamburger Responsif :** Sur mobile et tablette (largeur < 768px), le bandeau de navigation escamote les liens textuels standards pour afficher un bouton de menu `☰`. Celui-ci déclenche l'apparition d'un menu déroulant interactif (`mobile-dropdown`) avec des animations de transition fluides, se fermant automatiquement lors d'un clic en dehors.

### C. La Carte Interactive et Signalement des Observations (`SawTurtle.vue`)
La vue [SawTurtle.vue](file:///c:/xampp/htdocs/TOUT/cheloniens_groupe2/src/renderer/src/Views/SawTurtle.vue) permet de saisir une observation de tortue en l'associant à une position géographique précise :
* **Carte Leaflet :** Intègre une carte interactive basée sur OpenStreetMap. L'utilisateur peut cliquer sur la carte ou glisser un marqueur (pin) pour renseigner automatiquement la latitude et la longitude dans les champs du formulaire.
* **Localisation GPS Hybride :** Au chargement, la fonction `getGPSLocation` détermine les coordonnées de l'utilisateur. Elle utilise le plugin natif `@capacitor/geolocation` sur mobile, et l'API `navigator.geolocation` standard sur ordinateur.
* **Sauvegarde hors-ligne :** Lors de la soumission, si le plugin `@capacitor/network` détecte une absence de réseau, l'observation est mise en attente dans le `localStorage` sous la clé `pending_observations` pour éviter toute perte de données.

### D. La Structure Globale (`MainLayout.vue`)
Le composant [MainLayout.vue](file:///c:/xampp/htdocs/TOUT/cheloniens_groupe2/src/renderer/src/Layouts/MainLayout.vue) sert de gabarit commun pour toutes les pages. Il inclut de manière systématique l'en-tête (Header), le pied de page (Footer), et la feuille de sprites SVG utiles pour les icônes de l'application.

### E. L'Interface de la Page d'Accueil (`Home.vue`)
La vue [Home.vue](file:///c:/xampp/htdocs/TOUT/cheloniens_groupe2/src/renderer/src/Views/Home.vue) accueille l'utilisateur avec un design immersif :
* **Background Plein Écran :** Utilisation d'un Hero Layout où l'image représentative s'étire sur 100% de la largeur et de la hauteur de la zone de contenu grâce à `object-fit: cover`.
* **Masque d'Ombrage de Contraste :** Une superposition sombre à opacité contrôlée (`rgba(0, 0, 0, 0.45)`) est positionnée au-dessus de l'image de fond pour assurer un parfait respect des contrastes d'accessibilité (WCAG AA), rendant la typographie blanche lisible.
* **Appel à l'Action (CTA) :** Un bouton d'action principal invite directement le visiteur à entamer le signalement d'une tortue observée.

---

## 6. Recommandations de Correction Directes

Pour que l'application fonctionne parfaitement sur toutes les machines en mode développement :

1. **Résolution du lancement `tsx` (Windows) :**
   Modifier la ligne 7 du fichier `backend/package.json` pour ajouter `npx` :
   ```json
   "dev": "npx tsx watch src/server.ts"
   ```
2. **Correction de la casse de l'import (Build portable) :**
   Dans le fichier `src/renderer/src/Views/Home.vue`, corriger le chemin d'import du layout (Ligne 2) en remplaçant le `l` minuscule par un `L` majuscule :
   ```typescript
   import MainLayout from "@/Layouts/MainLayout.vue";
   ```
3. **Amélioration de l'Accessibilité (Conformité WCAG AA) :**
   * Ajouter un attribut `aria-label="Afficher le profil et le formulaire de connexion"` sur la balise `<button class="profile" ...>` dans le fichier `Header.vue`.
   * Ajouter l'attribut `aria-hidden="true"` sur le `<svg>` imbriqué dans ce bouton de profil pour éviter que les lecteurs d'écran ne lisent des caractères vides.

---

## 7. Historique des Modifications Réalisées dans l'Application

Voici le récapitulatif détaillé des modifications concrètes qui ont été apportées au code source pour résoudre les bugs d'environnement, intégrer la base de données relationnelle et préparer l'application pour le mobile :

### A. Configuration Générale & Scripts (`package.json`)
* **Résolution des crashs npm (`postinstall`) :** Suppression du script `"postinstall": "electron-builder install-app-deps"`. Ce script compilait inutilement des dépendances C++ natives inexistantes dans le projet et bloquait l'installation à cause d'incompatibilités ESM sous Node v21.4.0.
* **Correction de compatibilité Vite/Vue (`@vitejs/plugin-vue`) :** Rétrogradation de `@vitejs/plugin-vue` en version `5.2.1` (via `--legacy-peer-deps`). La version 6 utilisait `crypto.hash` qui requiert Node.js >= 22, provoquant une erreur de compilation sur votre machine (Node v21.4.0).
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
* **Configuration du pool de connexions (`backend/src/db_connect.ts` [NOUVEAU]) :** Mise en place d'un pool d'accès à la base de données `cheloniens` hébergée localement (avec connexion de secours réutilisable pour les routes Express).
* **Script d'initialisation (`backend/src/initDb.ts` [NOUVEAU]) :** Création d'une fonction permettant d'assurer la présence de la base de données et de la table `turtles` en environnement local de développement.
* **Script SQL de structure (`backend/src/cheloniens.sql` [NOUVEAU]) :** Ajout du script de modélisation SQL contenant la structure de la base de données.
* **Modification de la route Express (`backend/src/server.ts`) :**
  * Suppression de la route de test `/api/hello`.
  * Ajout de la route `POST /api/observations` qui récupère les données de signalement envoyées par le client, effectue une validation minimale, et insère les informations (localisation, date, météo, nombre de tortues, profondeur, commentaires, photos) dans la table `cheloniensmartinique` de la base MariaDB via le pool de connexions asynchrone.

### E. Refonte Visuelle & Responsivité (Interface Utilisateur) [NOUVEAU]
* **Page d'Accueil Premium (`src/renderer/src/Views/Home.vue`) :**
  * Passage à un Hero Layout immersif plein écran où l'image de la tortue couvre 100% de la hauteur et largeur de la page sous l'en-tête.
  * Ajout d'une superposition sombre (`rgba(0, 0, 0, 0.45)`) garantissant un excellent contraste (accessibilité WCAG AA) pour la lisibilité du titre blanc en texte ombré (`text-shadow`).
  * Animation dynamique sur l'emoji tortue (effet de rebond CSS).
  * Intégration d'un bouton d'action principal (CTA) incitant à "Signaler une observation".
  * Correction de la casse d'import de `MainLayout` (majuscule `L`) pour éviter tout échec de compilation portable.
* **Menu de Navigation Mobile (`src/renderer/src/Components/Header.vue`) :**
  * Remplacement des liens horizontaux par un menu hamburger déroulant (`☰`) réactif s'activant sous les 768px de largeur d'écran.
  * Logique de détection des clics en dehors du menu déroulant pour le refermer automatiquement.
  * Effet de transition CSS fluide (`slide-fade`) pour l'apparition et disparition du menu.
* **Sécurisation de la Politique de Contenu (CSP) & Viewport (`src/renderer/index.html`) :**
  * Intégration de la balise meta `viewport` pour assurer le redimensionnement automatique sur écran mobile.
  * Autorisation de charger les tuiles de cartes OpenStreetMap (`img-src https://*.tile.openstreetmap.org`) pour corriger le blocage des cartes sur PC (Electron) et mobiles (Capacitor).



