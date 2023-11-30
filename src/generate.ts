import { themes } from './themes'
import type { Theme as ShadcnTheme } from './themes'
import type { ShadcnThemeColor, ShadcnThemeRadius } from './types'

function generateLightVars(
  theme: 'light' | 'dark',
  color: ShadcnTheme['cssVars']['light'] | ShadcnTheme['cssVars']['dark'],
  radius: ShadcnThemeRadius,
) {
  return Object.entries(color).map(([key, value]) => {
    if (key === 'radius')
      return ''
    return `  --${key}: ${value};`
  })
    .filter(Boolean)
    .concat(
      theme === 'light'
        ? [
      `  --radius: ${radius}rem;`,
          ]
        : [],
    )
    .join('\n')
}

export function generateCSSVars(color: ShadcnThemeColor, radius: ShadcnThemeRadius) {
  const theme = themes.find(t => t.name === color)
  if (!theme)
    throw new Error(`Unknown color: ${color}`)
  const { cssVars } = theme
  const { light, dark } = cssVars
  const lightVars = generateLightVars('light', light, radius)
  const darkVars = generateLightVars('dark', dark, radius)

  return `:root {
${lightVars}
}

.dark {
${darkVars}
}`
}
