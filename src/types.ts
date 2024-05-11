import type { DeepPartial } from 'unocss'

import type { Theme as ShadcnTheme, ThemeCSSVarsVariant } from './themes'

export type ShadcnThemeColor = ShadcnTheme['name']

type ArrayOrSingle<T> = T | T[]

export type ColorOptions =
  | ShadcnThemeColor
  | ThemeCSSVarsVariant
  | {
    base: ShadcnThemeColor
    color: DeepPartial<ThemeCSSVarsVariant>
  }

export type ThemeOptions = {
  /**
   * @default 'zinc'
   */
  color?: ColorOptions | false
  /**
   * @default 0.5
   */
  radius?: number | false
}

export type PresetShadcnOptions = ArrayOrSingle<ThemeOptions>
