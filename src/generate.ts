import { mergeDeep } from "unocss"

import { themeCSSVarKeys, themes } from "./themes"

import type { ThemeCSSVarKey, ThemeCSSVars } from "./themes"
import type { ColorOptions, PresetShadcnOptions } from "./types"

function generateColorCSSVars(color: ThemeCSSVars) {
  return Object.entries(color)
    .map(([key, value]) => {
      if (!themeCSSVarKeys.includes(key as ThemeCSSVarKey)) return ""
      return `  --${key}: ${value};`
    })
    .filter(Boolean)
    .join("\n")
}

function generateRadiusCSSVars(radius: number) {
  return `  --radius: ${radius}rem;`
}

function getBuiltInTheme(name: string) {
  const theme = themes.find((t) => t.name === name)
  if (!theme) throw new Error(`Unknown color: ${name}`)
  return {
    name,
    ...theme.cssVars,
  }
}

function getColorTheme(color: ColorOptions) {
  let light: ThemeCSSVars
  let dark: ThemeCSSVars
  let name: string

  if (typeof color === "string") {
    name = color
    ;({ light, dark } = getBuiltInTheme(color))
  } else if ("base" in color) {
    name = color.base
    ;({ light, dark } = mergeDeep(getBuiltInTheme(color.base), color.color))
  } else {
    name = color.name
    ;({ light, dark } = color)
  }
  return { light, dark, name }
}

export function generateCSSVars(
  theme: PresetShadcnOptions,
  onlyOne = true,
): string {
  if (Array.isArray(theme)) {
    return theme.map((t) => generateCSSVars(t, false)).join("\n")
  }

  const { color, radius } = theme
  const { light, dark, name } = getColorTheme(color)
  const lightVars = generateColorCSSVars(light)
  const darkVars = generateColorCSSVars(dark)

  if (!onlyOne) {
    return `.theme-${name} {
${lightVars}
${generateRadiusCSSVars(radius)}
}

.dark .theme-${name} {
${darkVars}
}`
  }

  return `:root {
${lightVars}
${generateRadiusCSSVars(radius)}
}

.dark {
${darkVars}
}`
}
