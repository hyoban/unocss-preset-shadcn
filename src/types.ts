import type { Theme as ShadcnTheme, ThemeCSSVarsVariant } from "./themes"

export type ShadcnThemeColor = ShadcnTheme["name"]

export interface PresetShadcnOptions {
  /**
   * @default 'zinc'
   */
  color?: ShadcnThemeColor | ThemeCSSVarsVariant
  /**
   * @default 0.5
   */
  radius?: number
}
