# Design System — Haltev Insurrance

**Version:** 0.1  
**Status:** Proposed  
**Related documents:** [PRD.md](./PRD.md), [ARCHITECTURE.md](./ARCHITECTURE.md)

## 1. Brand direction

Haltev Insurrance is a calm, approachable insurance brand. The website should feel clear, reassuring, and easy to navigate, with a clean, soft visual style based on the supplied reference.

- **Brand name:** Haltev Insurrance
- **Logo:** supplied Haltev blue and cyan emblem. Keep the artwork and proportions intact.
- **Visual direction:** light surfaces, generous whitespace, navy typography, cyan/blue actions, soft rounded cards, and professional photography.
- **Product scope:** insurance product catalog and application flow.
- **Interface language:** English.

The TrustNest wording and content shown in the visual reference are examples only. Do not use them as the product name or copy.

## 2. Logo

Use the supplied logo asset at `public/images/brand/haltev-logo.png`.

- Preserve the original aspect ratio and transparent background.
- Do not recolor, distort, crop, add effects, or place text inside the emblem.
- Prefer a light or white background so the blue and cyan artwork stays clear.
- Use the full emblem in the site header and footer. A smaller mark may be used where space is limited, as long as it remains recognizable.
- Keep clear space around the mark at least equal to one quarter of the logo width.
- Do not place the logo on a photo or a busy background.

## 3. Color tokens

Use semantic tokens in Tailwind theme configuration or shared CSS variables. The values below are initial design tokens and can be tuned against the supplied logo during implementation.

| Token | Value | Intended use |
|---|---|---|
| `brand-navy` | `#0B2456` | Main headings, navigation, footer, high emphasis text |
| `brand-blue` | `#087DE1` | Primary actions, links, selected controls |
| `brand-cyan` | `#12C7E9` | Small highlights, icons, progress states |
| `brand-blue-soft` | `#E8F7FC` | Soft section backgrounds, selected card surfaces |
| `surface` | `#FFFFFF` | Main cards, forms, and page content |
| `surface-muted` | `#F6F9FC` | Alternating page sections and quiet panels |
| `text-primary` | `#172B4D` | Body text and labels |
| `text-secondary` | `#64748B` | Supporting text and descriptions |
| `border` | `#E2E8F0` | Dividers, input borders, card outlines |
| `success` | `#168A62` | Successful validation and submission state |
| `warning` | `#B7791F` | Non-blocking notices |
| `danger` | `#C2414B` | Validation errors and destructive actions |

Keep cyan as a supporting accent; use navy or blue for important text and actions. Do not use the reference site's bright cyan for long text. Meet WCAG AA contrast for text and controls.

## 4. Typography

- **Font family:** Inter, with system sans-serif fallbacks.
- Use sentence case for headings, labels, and buttons.
- Use bold weights sparingly; reserve the heaviest weight for the main page heading or a key value.
- Keep paragraphs short and readable, with a comfortable line height.

| Style | Desktop | Mobile | Weight |
|---|---:|---:|---:|
| Page heading | 40–48 px | 32–36 px | 700 |
| Section heading | 28–32 px | 24–28 px | 650–700 |
| Card heading | 18–20 px | 18–20 px | 600 |
| Body | 16 px | 16 px | 400 |
| Supporting text | 14 px | 14 px | 400 |
| Form label | 14 px | 14 px | 500–600 |

## 5. Layout and spacing

- Use a 4 px base spacing scale: `4, 8, 12, 16, 24, 32, 40, 48, 64, 80`.
- Center page content in a responsive container with a maximum width around 1200 px.
- Use generous vertical spacing between major sections; keep related form controls close together.
- Use a responsive grid: one column on narrow screens, two columns for product cards when space permits, and wider layouts only when content benefits from comparison.
- Keep form content to a readable width; avoid stretching fields across very wide desktop screens.
- Use clear visual hierarchy between page background, cards, and interactive controls.

## 6. Shape, borders, and elevation

| Token | Value | Intended use |
|---|---:|---|
| `radius-control` | 8 px | Inputs, compact buttons |
| `radius-card` | 16 px | Product and content cards |
| `radius-feature` | 24 px | Hero panels and large feature sections |
| `border-width` | 1 px | Standard outlines and dividers |
| `shadow-card` | `0 6px 24px rgb(15 35 70 / 6%)` | Subtle card separation |

Prefer a quiet border or light background over a strong shadow. Avoid glossy gradients, heavy outlines, and excessive floating effects.

## 7. Components

### Buttons

- **Primary:** blue background, white text; use for the main action such as `Continue` or `Submit application`.
- **Secondary:** white or soft-blue background with navy/blue text and a light border.
- **Text:** no filled background; use for low-emphasis actions such as `Back`.
- Give interactive controls a visible hover, focus, pressed, and disabled state.
- Use action labels that describe what happens next.

### Product cards

- Use a white surface, soft border, rounded corners, and restrained shadow.
- Show product name, short plain-language summary, and one clear action.
- Use a consistent simple icon or professional image treatment across categories.
- Do not overload cards with policy exclusions or dense terms; link to product details instead.

### Forms

- Place a persistent label above each field; do not use placeholder text as the only label.
- Mark required fields consistently and explain the expected format when helpful.
- Show validation errors next to the related field, using text as well as color.
- Keep related fields together and use full-width controls on mobile.
- Use a step indicator for the application flow: Applicant, Insured Item, Coverage, Documents, Review.
- Provide Back and Continue actions, preserving the draft while moving between steps.

### Feedback states

- Use inline success and error messages with a concise explanation.
- After submission, show a clear confirmation and demo reference number.
- Label the result as submitted; do not imply approval or policy issuance.

## 8. Photography and imagery

- Use professional, natural-looking photos that communicate helpful guidance and peace of mind.
- Prefer authentic interactions and inclusive representation over staged handshake imagery.
- Crop images consistently with rounded corners; do not place essential text inside an image.
- Use descriptive alt text for meaningful images. Mark decorative images as decorative.
- Use simple, consistent line icons for product categories and form steps. Avoid mixing unrelated icon styles.

## 9. Responsive behavior and accessibility

- Design mobile-first and support narrow mobile, tablet, and desktop widths.
- Collapse multi-column layouts to one column on narrow screens; prevent horizontal scrolling.
- Keep primary actions easy to reach and large enough for touch input.
- Preserve a visible keyboard focus indicator and logical tab order.
- Use semantic headings, buttons, links, and form elements.
- Pair status colors with labels or icons; never communicate meaning through color alone.
- Respect reduced-motion preferences and use motion only to clarify state changes.

## 10. Motion and interaction

- Use short, subtle transitions for hover, focus, selection, and step changes.
- Keep animations optional and non-blocking; no auto-playing decorative motion.
- Provide immediate feedback after selecting a product or completing a form step.
- Avoid moving layout elements in ways that disrupt form input.

## 11. Content style

- Write interface content in clear, concise English.
- Use plain language and explain insurance terms where they appear.
- Keep button labels action-oriented: `View details`, `Continue`, `Review application`, `Submit application`.
- Distinguish demo behavior from real insurance decisions. Use labels such as `Demo submission` where needed.
- Use the brand name exactly as **Haltev Insurrance**.

## 12. Tailwind implementation guidance

- Map semantic design tokens to Tailwind theme colors rather than scattering raw color values across components.
- Reuse shared component variants for buttons, cards, form controls, and focus states.
- Keep responsive layout utilities close to presentation components.
- Avoid one-off arbitrary values when a spacing, color, radius, or typography token already covers the need.
