# Codeword Design System — README

> One source of truth for our React-Native UI so the app stays **pixel-faithful** to Figma.

---

## 1) Files & entry points

```
src/
  theme/
    tokens.ts          # colors, gradient, spacing, radii, type
    README.md          # ← this file
  components/
    BrandHeader.tsx    # rounded purple header w/ wordmark
    GradientScreen.tsx # global background gradient wrapper
    InputBar.tsx       # chat input that never overlaps content
    SemicolonIcon.tsx  # always-purple center tab icon
    BrandTabBar.tsx    # (optional) custom bottom tab bar
```

> Keep **all numbers** (sizes, radii, colors, spacing) in `tokens.ts`. Screens and components must read from tokens only.

---

## 2) Tokens (edit in `src/theme/tokens.ts`)

These are seeded values; update to **exact numbers** from Figma → _Inspect_ panel.

### Colors

- `colors.brand.purple` `#5A2AA7` – primary
- `colors.brand.purpleDeep` `#4B2490` – chat bubble
- `colors.text.primary` `#1D1235`
- `colors.text.secondary` `#3A2F57`
- `colors.text.onPurple` `#FFFFFF`
- `colors.ui.white` `#FFFFFF`
- `colors.ui.bgSoft` `#F7F3FB`
- `colors.ui.divider` `rgba(0,0,0,0.06)`

### Gradient

- `gradient.stops = ["#B49BE0", "#9DD6D1"]`
- `gradient.locations = [0, 1]`
- Direction: start `{x:0,y:0}` → end `{x:1,y:1}`

### Spacing

Scale (px): `0, 4, 6, 8, 10, 12, 14, 16, 20, 24, 28, 32`
Use names: `space[16]` etc. **No hardcoded margins/padding in screens.**

### Radii

- `radii.xl: 24` (headers, big containers)
- `radii.lg: 20` (cards, bubbles, input)
- `radii.md: 16`, `radii.sm: 12`, `radii.pill: 999`

### Typography

- `type.h1`: 28/34 700
- `type.h2`: 22/28 700
- `type.body`: 16/24 400
- `type.chat`: 17/24 500
- `type.label`: 14/18 600

> iOS uses SF system font; if we add a custom family later, swap it **only** in tokens.

---

## 3) Core components

### `<BrandHeader />`

- Rounded purple header with **Codeword** wordmark (PNG from Figma).
- Sizing: center logo at ~156×28; header corners `radii.xl`.
- Never place screen titles here; the wordmark is the title.

### `<GradientScreen />`

- Provides the global background gradient and a full-bleed container.
- Wrap _every_ tab screen with this to match Figma background.

### `<InputBar />`

- Props: `value`, `onChangeText`, `onSend`.
- Auto-pads for safe area + tab bar (`useBottomTabBarHeight`) so content never scrolls under the input.
- Button is always brand purple; arrow icon ≈ 18–20 pt.

### `<SemicolonIcon />`

- Uses `app/assets/icons/SemicolonIconPurple.png`.
- **Always purple**, never tinted or dimmed.
- Default size: `36` (center tab). Increase per Figma if needed.

### _(Optional)_ `<BrandTabBar />`

- Custom tab bar with exported icons (Home, Library, Semicolon, Coach, Profile).
- Active color: brand purple; inactive: `#C7BCD9` (or Figma exact).
- Top border: subtle shadow or divider `colors.ui.divider`.

---

## 4) Screen conventions

- **Header**: `BrandHeader` at top of each tab screen (rounded bottom).
- **Background**: always `GradientScreen`.
- **Chat**:
  - Coach bubble: `colors.ui.white` text `colors.text.primary`
  - User bubble: `colors.brand.purpleDeep` text `colors.text.onPurple`
  - Bubble max width: `86%`
  - Spacing between bubbles: `space[12]`
  - Shadows: `shadowOpacity 0.08`, `shadowRadius 8`, `offset {0,2}`

- **Library**:
  - Use carded accordions with `radii.lg`, inner padding `space[16]`.
  - Bullet lists use round bullets with `colors.brand.purple`.

- **Footer**:
  - Center semicolon tab larger than others; never changes color.
  - Avoid FAB if center tab is present (Figma rule).

---

## 5) Assets

Place under `app/assets/` (already present):

- `icons/CodewordLogo.png` (wordmark for header)
- `icons/SemicolonIconPurple.png` (center tab icon)
- All nav & feature icons exported at **2× and 3×**.
  Example sizes:
  - Tab icons: 26×26 (@1×) → provide @2×/@3×
  - Wordmark: ~156×28 (@1×) → provide @2×/@3×

> **Do not** use tint on PNG/SVG unless the icon is a monochrome glyph designed for tinting.

---

## 6) Accessibility & motion

- Text contrast ≥ 4.5:1 for body text, 3:1 for large text.
- Hit targets ≥ 44×44.
- Respect `reduceMotion`: avoid animated gradients; keep transitions instantaneous if enabled.

---

## 7) Figma parity workflow

- Read exact values from Figma ▶︎ **Inspect** and update `tokens.ts`.
- Optional **Prototype route** (`/prototype`) using WebView to compare flows.
- Optional **visual diff** in CI with `react-native-view-shot` + `pixelmatch`.

**Parity checklist per screen**

1. Header corner radius & height match.
2. Bubble max width, radius, shadow match.
3. Input bar height & paddings match.
4. Tab bar icon sizes/positions match.
5. Gradient stops/angle match.

---

## 8) Do / Don't

**Do**

- Use tokens for every spacing, color, radius, font size.
- Export icons from Figma, place in `app/assets/icons`, require them by path.
- Keep the semicolon tab centered, bigger, always purple.

**Don't**

- Hardcode pixel values in screens.
- Tint multi-color icons.
- Introduce new colors or font sizes outside tokens.

---

## 9) Example usage

```tsx
// app/(tabs)/chat.tsx
export default function Chat() {
  const [text, setText] = useState('');
  return (
    <GradientScreen>
      <BrandHeader />
      <ChatList /> {/* uses Bubble with tokens */}
      <InputBar value={text} onChangeText={setText} onSend={() => send(text)} />
    </GradientScreen>
  );
}
```

---

## 10) Contributing

1. Update `tokens.ts` from Figma (commit with message `chore(tokens): sync with figma mm-dd`).
2. If a component needs a new size/color, add it to tokens first.
3. Screens can only import from:
   - `src/theme/tokens`
   - `src/components/*`

---

## 11) Open items to finalize from Figma

- Exact gradient stop hex values + positions
- Exact tab icon sizes for each state (active/inactive)
- Wordmark export @2×/@3× with safe padding

Once those are copied into `tokens.ts`, the app will visually align with the prototype across screens.

---
