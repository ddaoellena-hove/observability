# Observability

Application React de visualisation et de configuration de scénarios de mobilité pour Navitia Insights.

## Structure du monorepo

```
observability/
  apps/
    frontend/          # Application React (Vite + TypeScript)
  packages/
    hove-cadence-ui/   # Design system interne Hove
  package.json         # Workspaces npm
  vercel.json          # Configuration de déploiement Vercel
```

## Prérequis

- Node.js >= 18
- npm >= 9

## Installation

Cloner le repo et installer les dépendances depuis la racine :

```bash
git clone https://github.com/ddaoellena-hove/observability.git
cd observability
npm install
```

## Développement

Lancer l'application en local :

```bash
npm run dev
```

L'app est accessible sur [http://localhost:5173](http://localhost:5173) (ou le port suivant disponible).

## Build

Compiler le design system puis l'application :

```bash
npm run build:ui   # compile hove-cadence-ui → packages/hove-cadence-ui/dist/
npm run build      # compile le frontend     → apps/frontend/dist/
```

## Design system

Les composants UI proviennent de `hove-cadence-ui`, le design system interne Hove.

Composants utilisés dans ce projet :

| Composant | Usage |
|---|---|
| `Sidebar` | Navigation latérale (thème `insights`) |
| `Tab` | Onglets EN COURS / À VENIR / PASSÉES / BROUILLON |
| `Toggle` | Affichage cartographique |
| `PrimaryButton` | Actions principales |
| `SecondaryButton` | Actions secondaires |
| `TextInput` | Champs de formulaire |
| `DatePicker` | Sélection de dates avec heure |

Pour explorer tous les composants disponibles, lancer le Storybook depuis `packages/hove-cadence-ui` :

```bash
cd packages/hove-cadence-ui
npm install
npm run storybook
```

## Déploiement

Le projet est déployé automatiquement sur **Vercel** à chaque push sur `main`.

La configuration dans `vercel.json` :
- Build : `npm run build:ui && npm run build`
- Output : `apps/frontend/dist`

Pour déployer manuellement :

```bash
npm install -g vercel
vercel
```
