import type { Theme as ShadcnTheme, ThemeCSSVarsVariant } from "./themes"
import type { DeepPartial } from "unocss"

export type ShadcnThemeColor = ShadcnTheme["name"]

export type ColorOptions =
  | ShadcnThemeColor
  | ThemeCSSVarsVariant
  | {
      base: ShadcnThemeColor
      color: DeepPartial<ThemeCSSVarsVariant>
    }

export type PresetShadcnOptions = {
  /**
   * @default 'zinc'
   */
  color?: ColorOptions
  /**
   * @default 0.5
   */
  radius?: number
}
