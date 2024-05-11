# unocss-preset-shadcn

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

Use [shadcn/ui](https://ui.shadcn.com) or [shadcn-vue](https://shadcn-vue.com) or [shadcn-svelte](https://www.shadcn-svelte.com) with [UnoCSS](https://unocss.dev)

1. Based on [fisand/unocss-preset-shadcn](https://github.com/fisand/unocss-preset-shadcn)
1. Theme can be easily customized

## Starter

You can easily start a new project without manually setting up the project.

- [shadcn-vue-unocss-starter](https://github.com/hyoban-template/shadcn-vue-unocss-starter)
- [shadcn-svelte-unocss-starter](https://github.com/hyoban-template/shadcn-svelte-unocss-starter)

## Usage

Follow the official guide to set up [shadcn/ui](https://ui.shadcn.com/docs/installation/vite), [shadcn-vue](https://www.shadcn-vue.com/docs/installation/vite.html), or [shadcn-svelte](https://www.shadcn-svelte.com/docs/installation). Replace the step to set up Tailwind CSS with [UnoCSS](https://unocss.dev/integrations/vite).

Then install `unocss-preset-shadcn` and `unocss-preset-animations`, and update your `unocss.config.ts`:

```bash
ni -D unocss-preset-animations unocss-preset-shadcn
```

```ts
// unocss.config.ts
import { defineConfig, presetUno } from "unocss";
import presetAnimations from "unocss-preset-animations";
import { presetShadcn } from "unocss-preset-shadcn";

export default defineConfig({
  presets: [
    presetUno(),
    presetAnimations(),
    presetShadcn({
      color: "red",
    }),
  ],
  // By default, `.ts` and `.js` files are NOT extracted.
  // If you want to extract them, use the following configuration.
  // It's necessary to add the following configuration if you use shadcn-vue or shadcn-svelte.
  content: {
    pipeline: {
      include: [
        // the default
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
        // include js/ts files
        "src/**/*.{js,ts}",
      ],
    },
  },
});
```

> [!IMPORTANT]
> Do not run `npx shadcn-ui@latest init` or `npx shadcn-vue@latest init` or `npx shadcn-svelte@latest init` to initialize your project.

1. `ni lucide-react class-variance-authority clsx tailwind-merge`
   - `ni lucide-vue-next radix-vue class-variance-authority clsx tailwind-merge` for shadcn-vue.
   - `ni lucide-svelte tailwind-variants clsx tailwind-merge` for shadcn-svelte.
1. copy `utils.ts` into your project at `src/lib`
1. create `components.json` in your project root and modify as needed
1. `npx shadcn-ui@latest add button`
   - `npx shadcn-vue@latest add button` for shadcn-vue.
   - `npx shadcn-svelte@latest add button` for shadcn-svelte.

> [!WARNING]
> If you encounter problems adjusting animation property, this may be because [tailwind-animate](https://github.com/jamiebuilds/tailwindcss-animate) has [duplicate rules about animation and transition](https://github.com/jamiebuilds/tailwindcss-animate/pull/46). You can refer to [Migration Guide from Animations Preset for UnoCSS](https://unocss-preset-animations.aelita.me/guide/migration.html) to solve this problem.

## Code to copy

```ts
import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

React + shadcn-ui

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "styles/global.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "rsc": false,
  "tsx": true,
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui"
  }
}
```

Vue + shadcn-vue

```json
{
  "style": "default",
  "typescript": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/assets/index.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "framework": "vite",
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

Svelte + shadcn-svelte

```json
{
  "$schema": "https://shadcn-svelte.com/schema.json",
  "style": "default",
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/app.pcss",
    "baseColor": "neutral"
  },
  "aliases": {
    "components": "$lib/components",
    "utils": "$lib/utils"
  }
}
```

## Dynamic Theme

Preview the [demo](https://unocss-preset-shadcn.vercel.app).

If you want to use a dynamic theme, you can pass an array of theme objects to `presetShadcn`:

```ts
import { defineConfig, presetUno, UserConfig } from "unocss";
import presetAnimations from "unocss-preset-animations";
import { builtinColors, presetShadcn } from "unocss-preset-shadcn";

export default defineConfig({
  presets: [
    presetUno(),
    presetAnimations(),
    presetShadcn(builtinColors.map((c) => ({ color: c }))),
  ],
});
```

Add a theme sync script to your [index.html](./playground/index.html).
To dynamically change the theme, you can create a [theme switch component](./playground/src/components/theme-switch.tsx).

## See also

- [fisand/unocss-preset-shadcn](https://github.com/fisand/unocss-preset-shadcn)
- [tobiasfoerg/tailwindcss-shadcn-ui](https://github.com/tobiasfoerg/tailwindcss-shadcn-ui)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/unocss-preset-shadcn?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/unocss-preset-shadcn
[npm-downloads-src]: https://img.shields.io/npm/dm/unocss-preset-shadcn?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/unocss-preset-shadcn
[bundle-src]: https://img.shields.io/bundlephobia/minzip/unocss-preset-shadcn?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=unocss-preset-shadcn
[license-src]: https://img.shields.io/github/license/hyoban/unocss-preset-shadcn.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/hyoban/unocss-preset-shadcn/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/unocss-preset-shadcn
