# UI Fidelity & Visual QA Guide

## Why the UI Previously Felt "Cartoony"

### Issues Fixed:

1. **Fonts/Line Heights** - RN defaults differ from design tools
   - ✅ Fixed with `type` tokens in `src/theme/tokens.ts`
2. **Radii/Spacing** - Values were guessed
   - ✅ Fixed with standardized `radii` and `space` tokens
3. **Colors/Gradients** - Not exact matches to Figma
   - ✅ Fixed with precise `colors` and `gradient` tokens
4. **Icons** - Generic glyphs instead of branded assets
   - ✅ Fixed by using exported PNG/SVG from Figma
   - ⚠️ Never tint the semicolon icon (keep purple)

## Development Tools

### 1. Figma Prototype Viewer

Access the live Figma prototype in-app for quick comparison:

```tsx
// Navigate to /prototype route
// Update URI in app/prototype.tsx with your Figma proto ID
```

### 2. Visual Regression Testing (Optional)

#### Install dependencies:

```bash
npm install --save-dev react-native-view-shot pixelmatch pngjs
```

#### Snapshot script example:

```js
// scripts/visual-diff.js
const pixelmatch = require('pixelmatch');
const fs = require('fs');
const PNG = require('pngjs').PNG;

function compareScreens(baseline, current) {
  const img1 = PNG.sync.read(fs.readFileSync(baseline));
  const img2 = PNG.sync.read(fs.readFileSync(current));
  const diff = new PNG({ width: img1.width, height: img1.height });

  const numDiffPixels = pixelmatch(img1.data, img2.data, diff.data, img1.width, img1.height, {
    threshold: 0.1,
  });

  const diffPercentage = (numDiffPixels / (img1.width * img1.height)) * 100;

  if (diffPercentage > 2) {
    // 2% threshold
    console.error(`Visual diff failed: ${diffPercentage.toFixed(2)}% different`);
    process.exit(1);
  }
}
```

## Maintaining Fidelity

### Do's:

- ✅ Always use theme tokens for colors, spacing, radii
- ✅ Export assets at @2x and @3x from Figma
- ✅ Use exact gradient stops from design
- ✅ Match typography exactly (weight, size, line-height)

### Don'ts:

- ❌ Guess spacing values
- ❌ Use inline styles for common patterns
- ❌ Tint branded icons (especially semicolon)
- ❌ Use system fonts without checking design

## Quick Checks:

1. Compare to `/prototype` route
2. Check shadow values match Figma
3. Verify border radii are consistent
4. Ensure padding/margins use token values
