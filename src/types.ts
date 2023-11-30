import type { Theme as ShadcnTheme } from "./themes"

export type ShadcnThemeColor = ShadcnTheme["name"]
export type ShadcnThemeRadius = 0 | 0.3 | 0.5 | 0.75 | 1
export interface PresetShadcnOptions {
  /**
   * @default 'zinc'
   */
  color?: ShadcnThemeColor
  /**
   * @default 0.5
   */
  radius?: ShadcnThemeRadius
}
