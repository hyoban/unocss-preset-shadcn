import { defineConfig, presetIcons, presetUno, UserConfig } from "unocss"
import presetAnimations from "unocss-preset-animations"
import { builtinColors, presetShadcn } from "unocss-preset-shadcn"

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      scale: 1.2,
    }),
    presetAnimations(),
    presetShadcn(builtinColors.map((c) => ({ color: c }))),
  ],
})
