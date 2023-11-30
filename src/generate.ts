import { themeCSSVarKeys, themes } from "./themes"

import type {
  ThemeCSSVarKey,
  ThemeCSSVars,
  ThemeCSSVarsVariant,
} from "./themes"
import type { ShadcnThemeColor } from "./types"

function generateLightVars(
  theme: "light" | "dark",
  color: ThemeCSSVars,
  radius: number,
) {
  return [
    ...Object.entries(color)
      .map(([key, value]) => {
        if (!themeCSSVarKeys.includes(key as ThemeCSSVarKey)) return ""
        return `  --${key}: ${value};`
      })
      .filter(Boolean),
    ...(theme === "light" ? [`  --radius: ${radius}rem;`] : []),
  ].join("\n")
}

export function generateCSSVars(
  color: ShadcnThemeColor | ThemeCSSVarsVariant,
  radius: number,
) {
  let light: ThemeCSSVars
  let dark: ThemeCSSVars

  if (typeof color === "string") {
    const theme = themes.find((t) => t.name === color)
    if (!theme) throw new Error(`Unknown color: ${color}`)
    const { cssVars } = theme
    light = cssVars.light
    dark = cssVars.dark
  } else {
    light = color.light
    dark = color.dark
  }
  const lightVars = generateLightVars("light", light, radius)
  const darkVars = generateLightVars("dark", dark, radius)

  return `:root {
${lightVars}
}

.dark {
${darkVars}
}`
}
