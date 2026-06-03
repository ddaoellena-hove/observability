# Guidelines typographiques — Hove Design System

## Polices

| Police | Usage | Import |
|---|---|---|
| **Uxum Grotesque** | Titres de page principaux | Fichiers `.otf` locaux |
| **Inter** | Corps, labels, navigation, UI générale | Google Fonts |
| **Spline Sans Mono** | Tags techniques, colonnes de données (LATITUDE, LONGITUDE…) | Google Fonts |

---

## Hiérarchie typographique

### Titre de page principal
Utilisé pour le nom de la section active (ex. "IV Multicritère", "Scénario de mobilité").

```css
font-family: "Uxum Grotesque", sans-serif;
font-size: 28px;
font-weight: 500;
color: #002830;
line-height: 1.2;
```

### Breadcrumb
Navigation contextuelle au-dessus du titre de page.

```css
font-family: "Inter", sans-serif;
font-size: 12px;
font-weight: 400;
color: #888;              /* items parents */
color: #555;              /* item courant */
```

### NavigationDropdown (dans le breadcrumb)
```css
font-family: "Inter", sans-serif;
font-size: 14px;
padding: 5px 12px;
```

### Titres de section (formulaire)
Titres des blocs numérotés (1. Définissez le titre…).

```css
font-family: "Inter", sans-serif;
font-size: 13px;
font-weight: 600;
color: #1a1a2e;
text-transform: uppercase;
```

### Labels de champ
```css
font-family: "Inter", sans-serif;
font-size: 12px;
font-weight: 500;
color: #374151;
```

### Corps / textes secondaires
```css
font-family: "Inter", sans-serif;
font-size: 12px;
font-weight: 400;
color: #888;
line-height: 1.5;
```

### Tags techniques
Utilisés pour les noms de colonnes de fichiers (LATITUDE, LONGITUDE, NAMES).

```css
font-family: "Spline Sans Mono", monospace;
font-size: 11px;
font-weight: 700;
letter-spacing: 0.05em;
```

---

## Règles d'application par contexte

### Pages principales (ex. ScenariosMobilite)
- Tout le contenu de la page → **Inter**
- Exception : titre principal → **Uxum Grotesque**

### Formulaires (ex. CreateScenarioForm)
- Tout le formulaire → **Inter**
- Titres de section → Inter uppercase 600
- Le titre de page au-dessus du formulaire → **Uxum Grotesque** (même règle que les pages principales)

### Composants du design system
Les composants (Sidebar, Tab, Toggle, Button…) héritent de la police de leur contexte. Ne pas surcharger la font-family à l'intérieur des composants sauf besoin explicite.

---

## Couleurs typographiques

| Usage | Valeur |
|---|---|
| Titre principal | `#002830` |
| Texte principal | `#1a1a2e` |
| Texte secondaire | `#555` |
| Placeholder / hint | `#888` |
| Breadcrumb parent | `#888` |
| Breadcrumb courant | `#555` |
| Séparateur breadcrumb | `#ccc` |

---

## Import Google Fonts

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Spline+Sans+Mono:wght@400;600;700&display=swap" rel="stylesheet" />
```

## Déclaration Uxum Grotesque

```css
@font-face {
  font-family: "Uxum Grotesque";
  src: url("/fonts/UxumGrotesque-Regular.otf") format("opentype");
  font-weight: 400;
}

@font-face {
  font-family: "Uxum Grotesque";
  src: url("/fonts/UxumGrotesque-Medium.otf") format("opentype");
  font-weight: 500;
}

@font-face {
  font-family: "Uxum Grotesque";
  src: url("/fonts/UxumGrotesque-Bold.otf") format("opentype");
  font-weight: 700;
}
```
