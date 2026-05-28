# Troubleshooting Guide: NexusReflect Web Application

## Common Issue: Application Displays as Plain Text Instead of Styled UI

### Symptoms
- Application loads but shows only unstyled text (no colors, layouts, or visual components)
- Browser inspector shows Tailwind utility classes like `bg-background`, `text-foreground` present in HTML
- However, computed styles show these properties as invalid (e.g., `background-color: hsl(#09090b)` instead of valid HSL/RGB values)
- Page source shows CSS variables defined as hex values (e.g., `--background: #09090b`)
- Console may show no errors, but styles don't apply

### Root Cause
This issue occurs when CSS custom properties (variables) in `globals.css` are defined using **hex color format** but Tailwind CSS (via `tailwind.config.ts`) references them using the `hsl()` function.

Example of problematic configuration:
```css
/* globals.css - PROBLEMATIC */
:root {
  --background: #ffffff; /* HEX VALUE */
  --foreground: #0a0a0b; /* HEX VALUE */
}
```

```css
/* Generated CSS - INVALID */
.bg-background {
  background-color: hsl(var(--background)); /* Becomes hsl(#ffffff) - INVALID */
}
```

The `hsl()` function expects numerical values (e.g., `hsl(0 0% 100%)`), not hex values.

### Solution
Convert all CSS custom properties from hex format to HSL format in `apps/web/src/app/globals.css`:

#### Correct Format (HSL):
```css
/* globals.css - CORRECT */
:root {
  --radius: 0.75rem;
  --background: 0 0% 100%;      /* HSL equivalent of #ffffff */
  --foreground: 240 6% 4%;      /* HSL equivalent of #0a0a0b */
  --card: 0 0% 100%;
  --card-foreground: 240 6% 4%;
  --popover: 0 0% 100%;
  --popover-foreground: 240 6% 4%;
  --primary: 265 84% 58%;       /* HSL equivalent of #7c3aed */
  --primary-foreground: 0 0% 100%;
  --secondary: 220 14% 96%;     /* HSL equivalent of #f3f4f6 */
  --secondary-foreground: 215 28% 17%;
  --muted: 220 14% 96%;
  --muted-foreground: 220 9% 46%;
  --accent: 220 14% 96%;
  --accent-foreground: 215 28% 17%;
  --destructive: 0 84% 60%;     /* HSL equivalent of #ef4444 */
  --destructive-foreground: 0 0% 100%;
  --border: 220 13% 91%;        /* HSL equivalent of #e5e7eb */
  --input: 220 13% 91%;
  --ring: 265 84% 58%;
}

.dark {
  --background: 240 6% 4%;      /* HSL equivalent of #09090b */
  --foreground: 0 0% 98%;       /* HSL equivalent of #fafafa */
  --card: 240 5% 7%;
  --card-foreground: 0 0% 98%;
  --popover: 240 5% 7%;
  --popover-foreground: 0 0% 98%;
  --primary: 255 92% 76%;       /* HSL equivalent of #a78bfa */
  --primary-foreground: 240 6% 4%;
  --secondary: 240 5% 12%;
  --secondary-foreground: 240 6% 84%;
  --muted: 240 5% 12%;
  --muted-foreground: 240 4% 62%;
  --accent: 240 5% 12%;
  --accent-foreground: 240 6% 84%;
  --destructive: 0 84% 60%;
  --destructive-foreground: 0 0% 100%;
  --border: 240 4% 16%;
  --input: 240 4% 16%;
  --ring: 255 92% 76%;
}
```

### Additional Configuration Checks

#### 1. Enable Tailwind CSS Plugins
Ensure `apps/web/tailwind.config.ts` has the animate plugin enabled:
```typescript
plugins: [require("tailwindcss-animate")],
```
*(Not commented out)*

#### 2. Use Correct PostCSS Config Format
**Important:** Next.js 14.0.4 requires CommonJS format for PostCSS configuration.
- Use `apps/web/postcss.config.js` (NOT `.mjs`)
- Content should be:
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### Verification Steps
After applying fixes:
1. Clear Next.js cache: `rm -rf .next`
2. Restart dev server: `npm run dev`
3. Verify compiled CSS size increases significantly (from ~6KB to ~40KB+)
4. Check that utility classes resolve to actual color values:
   ```bash
   curl -s http://localhost:3000/_next/static/css/app/layout.css | grep "background-color:" | head -3
   ```
   Should show values like: `background-color: hsl(0 0% 100%);`

### Prevention
To prevent this issue from recurring:
1. Always define CSS custom properties in HSL format when using with Tailwind's `hsl()` function
2. When copying color values from design tools, convert hex to HSL:
   - Use online converters like https://www.w3schools.com/colors/colors_converter.asp
   - Or use: `hsl(hue, saturation%, lightness%)` where:
     - Hue: 0-360 (from color wheel)
     - Saturation: 0-100%
     - Lightness: 0-100%
3. Commit both `globals.css` and `tailwind.config.ts` changes together
4. If using postcss.config.mjs, rename to postcss.config.js for Next.js compatibility

### Quick Reference: Common Color Conversions
| Hex       | HSL                   |
|-----------|-----------------------|
| #ffffff   | 0 0% 100%             |
| #000000   | 0 0% 0%               |
| #09090b   | 240 6% 4%             |
| #fafafa   | 0 0% 98%              |
| #7c3aed   | 265 84% 58%           |
| #a78bfa   | 255 92% 76%           |
| #ef4444   | 0 84% 60%             |
| #f3f4f6   | 220 14% 96%           |
| #e5e7eb   | 220 13% 91%           |

### Related Files
- `apps/web/src/app/globals.css` - CSS variable definitions
- `apps/web/tailwind.config.ts` - Tailwind configuration
- `apps/web/postcss.config.js` - PostCSS configuration (must be .js, not .mjs)
- `apps/web/src/app/layout.ts` - Root layout applying theme

### Note on the npm ENOWORKSPACES Warning
The `npm error code ENOWORKSPACES` messages during `npm run dev` are harmless and related to Turborepo workspace handling in postinstall scripts. They do not affect the application functionality or styling.