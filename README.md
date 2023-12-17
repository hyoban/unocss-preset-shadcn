# unocss-preset-shadcn

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

Use [shadcn/ui](https://ui.shadcn.com/) with [UnoCSS](https://unocss.dev/)

1. Based on [fisand/unocss-preset-shadcn](https://github.com/fisand/unocss-preset-shadcn)
1. Theme can be easily customized

## Usage

Follow the [Install and configure Vite guide](https://ui.shadcn.com/docs/installation/vite) to setup shadcn/ui.

Replace the second step with the following operation after setup [UnoCSS](https://unocss.dev/integrations/vite):

```bash
ni -D unocss-preset-animations unocss-preset-shadcn
```

```ts
// unocss.config.ts
import { defineConfig, presetUno } from "unocss"
import presetAnimations from "unocss-preset-animations"
import { presetShadcn } from "unocss-preset-shadcn"

export default defineConfig({
  presets: [
    presetUno(),
    presetAnimations(),
    presetShadcn({
      color: "red",
    }),
  ],
})
```

> [!IMPORTANT]
> Do not run `shadcn-ui init` command.

1. `pnpm add lucide-react class-variance-authority clsx tailwind-merge`
1. copy `utils.ts` into your project at `src/lib`
1. create `components.json` in your project root and modify as needed
1. `pnpm dlx shadcn-ui@latest add button`

> [!WARNING]
> If you encounter problems adjusting animation property, this may be because [tailwind-animate](https://github.com/jamiebuilds/tailwindcss-animate) has [duplicate rules about animation and transition](https://github.com/jamiebuilds/tailwindcss-animate/pull/46). You can refer to [Migration Guide from Animations Preset for UnoCSS](https://unocss-preset-animations.aelita.me/guide/migration.html) to solve this problem.

## Code to copy

```ts
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import type { ClassValue } from "clsx"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

## Dynamic Theme

![Dynamic Theme Demo](https://s2.loli.net/2023/12/17/xYTqt3bVs6oe7jh.gif)

If you want to use dynamic theme, you can pass a array of theme objects to `presetShadcn`:

```ts
import { defineConfig, presetUno, UserConfig } from "unocss"
import presetAnimations from "unocss-preset-animations"
import { builtinColors, presetShadcn } from "unocss-preset-shadcn"

export default defineConfig({
  presets: [
    presetUno(),
    presetAnimations(),
    presetShadcn(builtinColors.map((c) => ({ color: c }))),
  ],
})
```

Add a script to your `index.html`:

```html
<!doctype html>
<html lang="en" class="h-full">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Change me</title>
    <script>
      !(function () {
        var e =
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches,
          t = localStorage.getItem("use-dark") || "system"
        ;('"dark"' === t || (e && '"light"' !== t)) &&
          document.documentElement.classList.toggle("dark", !0)
      })()
    </script>
    <style>
      html.dark {
        color-scheme: dark;
      }
    </style>
  </head>
  <body class="h-full">
    <div id="root" class="h-full"></div>
    <script>
      !(function () {
        var currentColor = localStorage.getItem("currentColor") || "neutral"
        var currentRadius = localStorage.getItem("currentRadius") || "0.5"
        document.body.classList.add(`theme-${currentColor.slice(1, -1)}`)
        document.body.style.setProperty("--radius", `${currentRadius}rem`)
      })()
    </script>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

To dynamically change the theme, you can create a theme switch component:

```ts
import { useLocalStorage } from "foxact/use-local-storage"

import { Button } from "~/components/ui/button"

const builtinColors = [
  "zinc",
  "slate",
  "stone",
  "gray",
  "neutral",
  "red",
  "rose",
  "orange",
  "green",
  "blue",
  "yellow",
  "violet",
] as const
const builtinRadiuses = [0, 0.3, 0.5, 0.75, 1] as const

export function ThemeSwitch() {
  const [currentColor, setCurrentColor] = useLocalStorage<
    (typeof builtinColors)[number]
  >("currentColor", "neutral")

  const [currentRadius, setCurrentRadius] = useLocalStorage<
    (typeof builtinRadiuses)[number]
  >("currentRadius", 0.5)

  return (
    <div className="space-y-4">
      <p>Color</p>
      <div className="grid grid-cols-6 gap-2">
        {builtinColors.map((color) => (
          <Button
            key={color}
            onClick={() => {
              document.body.classList.remove(`theme-${currentColor}`)
              document.body.classList.add(`theme-${color}`)
              setCurrentColor(color)
            }}
            variant={color === currentColor ? "default" : "secondary"}
          >
            {color}
          </Button>
        ))}
      </div>
      <p>Radius</p>
      <div className="flex gap-2">
        {builtinRadiuses.map((radius) => (
          <Button
            key={radius}
            onClick={() => {
              document.body.style.setProperty("--radius", `${radius}rem`)
              setCurrentRadius(radius)
            }}
            variant={radius === currentRadius ? "default" : "secondary"}
          >
            {radius}
          </Button>
        ))}
      </div>
    </div>
  )
}
```

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
