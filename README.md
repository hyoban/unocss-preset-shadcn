# unocss-preset-shadcn

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

use shadcn ui with unocss

1. Based on [fisand/unocss-preset-shadcn](https://github.com/fisand/unocss-preset-shadcn)
1. Theme can be easily customized

## Usage

```bash
ni -D unocss-preset-shadcn
```

```ts
// unocss.config.ts
import { defineConfig, presetUno } from "unocss"
import { presetShadcn } from "unocss-preset-shadcn"

export default defineConfig({
  presets: [
    presetUno(),
    presetShadcn({
      color: "red",
    }),
  ],
})
```

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/unocss-preset-shadcn?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/unocss-preset-shadcn
[npm-downloads-src]: https://img.shields.io/npm/dm/unocss-preset-shadcn?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/unocss-preset-shadcn
[bundle-src]: https://img.shields.io/bundlephobia/minzip/unocss-preset-shadcn?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=unocss-preset-shadcn
[license-src]: https://img.shields.io/github/license/antfu/unocss-preset-shadcn.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/antfu/unocss-preset-shadcn/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/unocss-preset-shadcn
