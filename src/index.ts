import { generateCSSVars } from "./generate"
import { themes } from "./themes"

import type { PresetShadcnOptions } from "./types"
import type { Preset } from "unocss"
import type { Theme } from "unocss/preset-mini"

export const builtinColors = themes.map((theme) => theme.name)
export const builtinRadiuses = [0, 0.3, 0.5, 0.75, 1] as const

export function presetShadcn(options: PresetShadcnOptions = {}): Preset<Theme> {
  return {
    name: "unocss-preset-shadcn",
    preflights: [
      {
        getCSS: () => `
          @keyframes shadcn-down { from{ height: 0 } to { height: var(--radix-accordion-content-height)} }
          @keyframes shadcn-up { from{ height: var(--radix-accordion-content-height)} to { height: 0 } }
          @keyframes shadcn-enter { from{ opacity: var(--un-enter-opacity, 1); transform: translate3d(var(--un-enter-translate-x, 0), var(--un-enter-translate-y, 0), 0) scale3d(var(--un-enter-scale, 1), var(--un-enter-scale, 1), var(--un-enter-scale, 1)) rotate(var(--un-enter-rotate, 0)) } }
          @keyframes shadcn-exit { to{ opacity: var(--un-exit-opacity, 1); transform: translate3d(var(--un-exit-translate-x, 0), var(--un-exit-translate-y, 0), 0) scale3d(var(--un-exit-scale, 1), var(--un-exit-scale, 1), var(--un-exit-scale, 1)) rotate(var(--un-exit-rotate, 0)) } }

          ${generateCSSVars(options)}

          * {
            border-color: hsl(var(--border));
          }

          body {
            color: hsl(var(--foreground));
            background: hsl(var(--background));
          }
        `,
      },
    ],
    rules: [
      [
        "animate-accordion-down",
        {
          animation: "shadcn-down 0.2s ease-out",
        },
      ],
      [
        "animate-accordion-up",
        {
          animation: "shadcn-up 0.2s ease-out",
        },
      ],
    ],
    theme: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
    },
  }
}

export default presetShadcn
