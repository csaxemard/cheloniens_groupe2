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

## 3. Stockage et Persistance des Données (Approche 100% JavaScript)

Comme l'application n'utilise pas de base de données relationnelle (telle que MariaDB/MySQL), la sauvegarde des informations s'effectue directement en JavaScript de deux manières complémentaires :

### A. Côté Frontend (Persistance Locale / Client)
Pour conserver l'état de connexion de l'utilisateur (éviter qu'il ne doive se reconnecter à chaque lancement) :
* **LocalStorage :** L'API native du navigateur `window.localStorage` permet de sauvegarder des paires clé/valeur persistantes sous forme de texte (ex: un jeton de session ou le profil utilisateur).
  * *Exemple d'écriture :* `localStorage.setItem('userSession', JSON.stringify(userData))`
  * *Exemple de lecture :* `const user = JSON.parse(localStorage.getItem('userSession'))`
* **Electron safeStorage (Alternative sécurisée) :** Pour chiffrer les données sensibles (comme les mots de passe ou tokens d'authentification) avant de les écrire sur le disque de l'utilisateur.

### B. Côté Backend (Persistance Fichier / Serveur)
Pour sauvegarder les comptes d'utilisateurs et les signalements de tortues envoyés :
* **Fichiers JSON locaux :** Les données reçues par l'API Express sont stockées dans des fichiers texte au format JSON (ex: `users.json` et `observations.json`).
* **Module Node.js `fs` (File System) :** Le backend utilise le module de gestion de fichiers pour lire et écrire de façon asynchrone :
  ```typescript
  import fs from 'fs/promises';

  // Exemple de sauvegarde
  async function saveObservation(newObs) {
      const data = await fs.readFile('observations.json', 'utf-8');
      const observations = JSON.parse(data);
      observations.push(newObs);
      await fs.writeFile('observations.json', JSON.stringify(observations, null, 2));
  }
  ```

---

## 4. Structure des Répertoires et Fichiers

Voici une cartographie simplifiée du code source du projet :

```text
cheloniens_groupe2/
├── backend/                        # Serveur API
│   ├── src/
│   │   └── server.ts               # Serveur Express & définition des routes API
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
│           ├── appState.ts         # Gestion de l'état global et des thèmes
│           ├── router.ts           # Configuration des routes de navigation
│           ├── Components/         # Composants réutilisables (Header, Footer, SvgSprites)
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

### B. Le Formulaire de Connexion & Inscription (`Header.vue`)
Le composant [Header.vue](file:///c:/xampp/htdocs/TOUT/cheloniens_groupe2/src/renderer/src/Components/Header.vue) intègre une boîte de dialogue modale (`loginBox`) gérée par des variables réactives (`isLoginBoxShown`, `loginBoxTab`). 
* L'inscription et la connexion s'effectuent sur le même composant en basculant d'onglet.
* Les données saisies sont liées en temps réel grâce au `v-model` de Vue 3 (`formSignin` et `formLogin`).
* Le formulaire appelle la fonction `submitProfileForm` qui effectue une requête HTTP `POST` vers le serveur backend.

### C. La Structure Globale (`MainLayout.vue`)
Le composant [MainLayout.vue](file:///c:/xampp/htdocs/TOUT/cheloniens_groupe2/src/renderer/src/Layouts/MainLayout.vue) sert de gabarit commun pour toutes les pages. Il inclut de manière systématique l'en-tête (Header), le pied de page (Footer), et la feuille de sprites SVG utiles pour les icônes de l'application.

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

Voici le récapitulatif détaillé des modifications concrètes qui ont été apportées au code source pour résoudre les bugs d'environnement et préparer l'application pour le mobile :

### A. Configuration Générale & Scripts (`package.json`)
* **Résolution des crashs npm (`postinstall`) :** Suppression du script `"postinstall": "electron-builder install-app-deps"`. Ce script compilait inutilement des dépendances C++ natives inexistantes dans le projet et bloquait l'installation à cause d'incompatibilités ESM sous Node v21.4.0.
* **Correction de compatibilité Vite/Vue (`@vitejs/plugin-vue`) :** Rétrogradation de `@vitejs/plugin-vue` en version `5.2.1` (via `--legacy-peer-deps`). La version 6 utilisait `crypto.hash` qui requiert Node.js >= 22, provoquant une erreur de compilation sur votre machine (Node v21.4.0).
* **Ajout de scripts pour le mobile :** Ajout des raccourcis `"dev:android": "npx cap run android"` et `"dev:ios": "npx cap run ios"`.
* **Ajout des dépendances Capacitor :** Intégration de `@capacitor/core@6`, `@capacitor/cli@6`, `@capacitor/android@6` et `@capacitor/ios@6` pour supporter le build mobile.
* **Ajout des dépendances Cartographiques & Off-line :** Ajout de `leaflet` et ses types `@types/leaflet`, ainsi que `@capacitor/geolocation` et `@capacitor/network` pour la gestion du GPS et de la connectivité réseau.

### B. Interface Utilisateur & Stabilité TypeScript (`src/renderer/src/`)
* **Nettoyage et Résolution des conflits git (`Components/Header.vue`) :**
  * Suppression des balises de conflits de fusion git (`<<<<<<< Updated upstream` ... `=======` ... `>>>>>>> Stashed changes`).
  * Suppression/mise en commentaire des fonctions et références inutilisées (`openDrawer`, `closeDrawer`, `openedDrawerIndex`). En mode strict, ces variables déclarées mais jamais lues bloquaient l'étape de vérification de type `typecheck:web` lors du build.
* **Neutralité de la plateforme (`App.vue`) :**
  * Ajout de la constante `isDesktop` détectant la présence d'Electron via `'electron' in window`.
  * Encapsulation sécurisée de la requête IPC de test : `window.electron.ipcRenderer.send('ping')` ne s'exécute désormais que sur ordinateur, évitant ainsi un crash de l'application lors de son exécution sous Android/iOS.
* **Intégration GPS & Hors-ligne (`Views/SawTurtle.vue`) :**
  * Remplacement du centrage par défaut de la carte (Metz, France) par un ciblage dynamique basé sur la géolocalisation de l'utilisateur (avec repli par défaut sur la Martinique).
  * Création d'une fonction hybride utilisant le plugin `@capacitor/geolocation` sur mobile et l'API standard `navigator.geolocation` sur PC.
  * Ajout d'un marqueur (pin) déplaçable (draggable) mettant à jour en temps réel des champs de saisie en lecture seule pour la latitude et la longitude.
  * Mise en place d'une file d'attente d'observations hors-ligne : si le plugin `@capacitor/network` détecte que l'utilisateur est déconnecté, la soumission du formulaire stocke temporairement les données dans le `localStorage` sous la clé `pending_observations` au lieu de tenter un envoi HTTP échoué.

### C. Configuration Native Android (`android/`)
* **Résolution du chemin de SDK (`android/local.properties` [NOUVEAU]) :** Création du fichier définissant la variable `sdk.dir=C:/Users/59669/AppData/Local/Android/Sdk`. Cela permet à Gradle de localiser le SDK Android local et d'exécuter la commande `npx cap run android` avec succès.
* **Configuration Capacitor (`capacitor.config.ts` [NOUVEAU]) :** Création du fichier de configuration pointant vers le répertoire de build web `out/renderer` avec l'identifiant de paquet unique `com.ifremer.cheloniens`.


