// @ts-check
import { defineConfig } from 'eslint-config-hyoban'

export default defineConfig(
  {
    ignores: [
      'test/snapshot/**/*',
    ],
    unocss: false,
  },
)
