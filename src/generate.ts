import { mergeDeep } from "unocss"

import { themeCSSVarKeys, themes } from "./themes"

import type { ThemeCSSVarKey, ThemeCSSVars } from "./themes"
import type { ColorOptions } from "./types"

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

function getBuiltInTheme(name: string) {
  const theme = themes.find((t) => t.name === name)
  if (!theme) throw new Error(`Unknown color: ${name}`)
  return theme.cssVars
}

function getColorTheme(color: ColorOptions) {
  let light: ThemeCSSVars
  let dark: ThemeCSSVars

  if (typeof color === "string") {
    ;({ light, dark } = getBuiltInTheme(color))
  } else if ("base" in color) {
    ;({ light, dark } = mergeDeep(getBuiltInTheme(color.base), color.color))
  } else {
    ;({ light, dark } = color)
  }
  return { light, dark }
}

export function generateCSSVars(color: ColorOptions, radius: number) {
  let { light, dark } = getColorTheme(color)
  const lightVars = generateLightVars("light", light, radius)
  const darkVars = generateLightVars("dark", dark, radius)

  return `:root {
${lightVars}
}

.dark {
${darkVars}
}`
}
