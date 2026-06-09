# Spécification : Quiz Chéloniens — Identification des Tortues Marines

**Date** : 2026-06-09
**Statut** : Implémenté ✅

---

## 1. But

Offrir aux utilisateurs de l'application « Chelonians App » un quiz interactif de type **Vrai/Faux avec swipe card** pour tester et enrichir leurs connaissances sur les 5 espèces de tortues marines observables en Martinique.

## 2. Fonctionnalités

### A. Quiz Interactif (Style Swipe Card)

- **15 questions Vrai/Faux** mélangées aléatoirement à chaque session
- **Interface swipe card** : glisser la carte à droite = VRAI, à gauche = FAUX
- **Boutons alternatifs** : deux boutons VRAI (✓ vert) et FAUX (✕ rouge) pour les utilisateurs préférant cliquer
- **Support tactile et souris** : gestes swipe natifs sur mobile + drag & drop sur desktop

### B. Système de Scoring

- Bonne réponse : **+100 points**
- Mauvaise réponse : **0 point** + animation de shake
- Score affiché en temps réel dans la barre de progression
- Score final avec message contextuel :
  - 0-500 pts : « Apprenti Observateur 🐣 »
  - 600-1000 pts : « Observateur Confirmé 🐢 »
  - 1100-1500 pts : « Expert Chélonien 🏆 »

### C. Fiches d'Information (5 espèces)

Chaque question est liée à une espèce. Après chaque réponse, l'utilisateur peut consulter la fiche détaillée de l'espèce avec :

- Nom commun et nom scientifique
- Taille et poids moyens
- Régime alimentaire
- Statut de conservation UICN (avec code couleur)
- Habitat en Martinique
- Anecdote « Le saviez-vous ? »

### D. Espèces couvertes

1. **Tortue Verte** (_Chelonia mydas_) — En danger
2. **Tortue Imbriquée** (_Eretmochelys imbricata_) — En danger critique
3. **Tortue Luth** (_Dermochelys coriacea_) — Vulnérable
4. **Tortue Olivâtre** (_Lepidochelys olivacea_) — Vulnérable
5. **Tortue Caouanne** (_Caretta caretta_) — Vulnérable

## 3. Design

Le quiz respecte intégralement le thème existant de l'application :

- Variables CSS de `appState.ts` (`--bg`, `--text`, `--emph`, `--bgTop1`, etc.)
- Bouton CTA identique à `Home.vue` (vert #2e7d32, border-radius: 50px)
- Animations cohérentes (fadeIn, bounce, shakeX)
- Composant intégré dans `MainLayout` (Header + Footer)

## 4. Architecture Technique

| Fichier                                  | Rôle                                         |
| ---------------------------------------- | -------------------------------------------- |
| `src/renderer/src/data/quizData.ts`      | Banque de données : 5 espèces + 15 questions |
| `src/renderer/src/Views/Quiz.vue`        | Composant principal du quiz                  |
| `src/renderer/src/assets/quiz/*.png`     | Images des 5 espèces de tortues              |
| `src/renderer/src/router.ts`             | Route `/quiz` ajoutée                        |
| `src/renderer/src/Components/Header.vue` | Lien « Quiz 🐢 » dans la navigation          |
