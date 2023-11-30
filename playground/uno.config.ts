import { defineConfig, presetUno } from 'unocss'
import { presetShadcn } from 'unocss-preset-shadcn'

export default defineConfig({
  presets: [
    presetUno(),
    presetShadcn({
      color: 'red',
    }),
  ],
})
