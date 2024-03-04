// unocss.config.ts
import { defineConfig, presetUno, transformerVariantGroup } from "unocss"
import presetAnimations from "unocss-preset-animations"
import { presetShadcn } from "unocss-preset-shadcn"

export default defineConfig({
  transformers: [transformerVariantGroup()],
  presets: [
    presetUno(),
    presetAnimations(),
    presetShadcn({
      color: "red",
    }),
  ],
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
})
