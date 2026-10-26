# Aurenov — Trois concepts de site (guide technique)

Ce dépôt contient **trois propositions de design complètes** pour le site
d'Aurenov, plus une **page de comparaison** type présentation d'agence.

> Le cahier des charges complet se trouve dans [`README.md`](README.md).
> Ce document explique comment lancer, naviguer, et faire évoluer le projet.

---

## 1. Lancer le projet

```bash
npm install     # déjà fait si les drapeaux sont installés
npm run dev     # serveur de développement
```

Ouvrir **http://localhost:5173**

| Route         | Contenu                                        |
| ------------- | ---------------------------------------------- |
| `/`           | Page de comparaison des trois directions       |
| `/concept-1`  | **Luxe architectural** — éditorial, calme      |
| `/concept-2`  | **Technique premium** — moderne, affirmé       |
| `/concept-3`  | **Artisanat local premium** — chaleureux       |

Build de production :

```bash
npm run build     # génère dist/
npm run preview   # sert le build sur http://localhost:4173
```

Toutes les routes fonctionnent en accès direct et au rafraîchissement
(fallback SPA).

## 2. Les trois directions créatives

| | Concept 01 | Concept 02 | Concept 03 |
|---|---|---|---|
| **Positionnement** | Studio d'architecture haut de gamme | Marque technique premium | Artisan local haut de gamme |
| **Typographies** | Cormorant Garamond + Jost | Space Grotesk + Inter | Fraunces + Figtree |
| **Palette** | Ivoire, bleu nuit, or retenu | Navy profond, bleu électrique, jaune | Pétrole, sable, blanc chaud, or doux |
| **Hero** | Compo éditoriale asymétrique image/texte | Split-screen navy avec cadre technique | Grande image arrondie + carte en surimpression |
| **Services** | Sections éditoriales alternées, filets, numéros serif | Modules techniques codés (C·01), grilles spec | Cartes arrondies chaleureuses, chips |
| **Angles** | 0 px (net, architectural) | 2 px (précis, technique) | 14–22 px (doux, accueillant) |

Chaque concept a **son propre système de design** (`src/styles/conceptN.css`)
avec ses tokens, échelles typographiques `clamp()`, boutons, formulaires,
états de focus et animations. Le partage se limite à la logique
(`src/components/shared/`) : accordéon accessible, hook de formulaire,
révélations au scroll, métadonnées par page.

## 3. Contenu et informations entreprise

- **Sources fiables utilisées** (lues sur le logo fourni) :
  téléphone `06 11 67 33 00`, e-mail `aurelien.perret09@gmail.com`,
  baseline « Neuf et rénovation », services « Électricité · Plomberie · Climatisation ».
- **Placeholders à compléter** (rechercher `[` dans `src/data/content.ts`) :
  adresse, zone d'intervention, horaires, SIRET, informations légales.
- **Photos** : banque d'images Unsplash (usage libre), stockées localement
  en WebP optimisé (`public/assets/images/`). Elles sont **illustratives** —
  la galerie le précise explicitement. Aucune statistique, certification,
  avis client ou année d'expérience n'a été inventé.

## 4. Brancher le formulaire sur un vrai envoi

Le formulaire est un **prototype front-end** : la validation est réelle,
l'envoi est simulé (`useQuoteForm.submit`). Aucune donnée ne quitte le
navigateur, et l'écran de succès le dit explicitement.

Pour le connecter en production, dans
`src/components/shared/useQuoteForm.ts`, remplacez la simulation par un
appel réel :

```ts
// Exemple avec un endpoint POST JSON
const res = await fetch('/api/quote', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(state.values),
})
if (!res.ok) throw new Error("Échec de l'envoi")
```

Options courantes : endpoint maison (Vercel/Netlify functions + Resend,
Postmark…), service de formulaires (Formspree, Tally), ou n8n via webhook.
Pensez alors à : consentement RGPD déjà présent ✓, protection anti-spam
(honeypot/captcha), et limitation de débit côté serveur.

## 5. Tests réalisés (navigateur réel, Chrome)

Vérifications programmatiques sur les 4 routes :

- **Responsive** : 1440, 1280, 1024, 768, 390, 320 px — **aucun
  débordement horizontal** sur les 24 combinaisons route×viewport.
- **Zéro erreur console** (charges fraîches, capture d'erreurs JS injectée
  avant le chargement de la page).
- **Images** : chargement vérifié (y compris lazy-load au scroll),
  alternatives textuelles sur 100 % des images.
- **Hiérarchie de titres** : exactement 1 `h1` par page, cascade h2/h3 sans
  saut, sur les 4 routes.
- **Navigation** : liens d'ancre (avec `scroll-margin-top` sous header
  sticky), liens inter-concepts, retour à la comparaison, rafraîchissement
  direct de chaque route (dev + preview).
- **Menus mobiles** : ouverture/fermeture, `aria-expanded`, verrouillage du
  scroll, fermeture par lien et touche Échap.
- **Accordéons** : `aria-expanded`/`aria-controls`/`role="region"`,
  navigation clavier (flèches, Home/End), ouverture exclusive, animation
  fluide vérifiée.
- **Formulaires** : messages d'erreur français sur champs vides/e-mail
  invalide/téléphone invalide, focus automatique sur le premier champ en
  erreur, état de chargement, écran de succès avec mention « prototype »,
  reset. Testé sur les trois concepts.
- **Typographie** : polices variables locales vérifiées chargées et
  appliquées (font-display swap, sous-ensembles latin/latin-ext).

Des captures d'écran de référence sont dans `screenshots/`.

## 6. Limitations connues

- Prototype front-end : pas de backend, formulaires non connectés (cf. §4).
- Liens « Mentions légales » / « Confidentialité » : ancres vers l'accueil
  (pages à créer avec les infos réelles).
- Le logo détaillé est affiché sur pastille claire dans les footers sombres
  pour rester lisible (règle projet : fond approprié, logo non retouché).
- Aucune donnée SEO locale inventée (pas de LocalBusiness schema, pas
  d'adresse fictive) : à ajouter quand les informations réelles seront
  disponibles.

## 7. Structure

```
src/
  components/
    shared/        # logique partagée (accordéon, form, reveal, meta)
    concept1..3/   # (prévu pour composants spécifiques si besoin)
  pages/           # ComparisonPage + Concept1..3Page
  styles/          # global.css + concept1..3.css + comparison.css
  data/content.ts  # contenu FR centralisé + placeholders
public/assets/
  logo/            # logo fourni (détouré, proportions d'origine)
  images/          # photographies WebP optimisées
  fonts/           # polices variables locales (latin + latin-ext)
```
