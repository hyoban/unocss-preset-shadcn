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
  // By default, `.ts` and `.js` files are NOT extracted.
  // If you want to extract them, you can use the following configuration.
  // It's necessary to add following configuration if you are using shadcn-vue.
  content: {
    pipeline: {
      include: [
        /\.(vue|svelte|[jt]s|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
      ],
    },
  },
})
