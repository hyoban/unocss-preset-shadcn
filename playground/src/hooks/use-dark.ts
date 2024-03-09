import { useLocalStorage } from 'foxact/use-local-storage'
import { useEffect, useMemo, useSyncExternalStore } from 'react'

const query = '(prefers-color-scheme: dark)'

function getSnapshot() {
  return window.matchMedia(query).matches
}

function getServerSnapshot(): undefined {
  return undefined
}

function subscribe(callback: () => void) {
  const matcher = window.matchMedia(query)
  matcher.addEventListener('change', callback)
  return () => {
    matcher.removeEventListener('change', callback)
  }
}

function useSystemDark() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

/**
 * credit: https://github.com/pacocoursey/next-themes/blob/cd67bfa20ef6ea78a814d65625c530baae4075ef/packages/next-themes/src/index.tsx#L285
 */
function disableAnimation(disableTransitionExclude: string[] = []) {
  const css = document.createElement('style')
  css.append(
    document.createTextNode(
      `
*${disableTransitionExclude.map(s => `:not(${s})`).join('')} {
  -webkit-transition: none !important;
  -moz-transition: none !important;
  -o-transition: none !important;
  -ms-transition: none !important;
  transition: none !important;
}
      `,
    ),
  )
  document.head.append(css)

  return () => {
    // Force restyle
    ;(() => window.getComputedStyle(document.body))()

    // Wait for next tick before removing
    setTimeout(() => {
      css.remove()
    }, 1)
  }
}

export type Options = {
  /**
   * @default "use-dark"
   */
  storageKey?: string

  /**
   * @default false
   */
  disableTransition?: boolean

  /**
   * @default []
   */
  disableTransitionExclude?: string[]

  /**
   * @default isDark => document.documentElement.classList.toggle("dark", isDark)
   */
  applyDarkMode?: (isDark: boolean) => void
}

const themeOptions = ['system', 'light', 'dark'] as const
type Theme = (typeof themeOptions)[number]

function isDarkMode(setting?: Theme | null, isSystemDark?: boolean | null) {
  return setting === 'dark' || (!!isSystemDark && setting !== 'light')
}

export function useDark(options?: Options) {
  const {
    storageKey = 'use-dark',
    disableTransition = false,
    disableTransitionExclude = [],
    applyDarkMode = (isDark: boolean) => {
      document.documentElement.classList.toggle('dark', isDark)
    },
  } = options ?? {}

  const [theme, setTheme] = useLocalStorage<Theme>(storageKey, 'system')
  const isSystemDark = useSystemDark()

  const isDark = useMemo(
    () => isDarkMode(theme, isSystemDark),
    [isSystemDark, theme],
  )

  const toggleDark = () => {
    const enable = disableTransition
      ? disableAnimation(disableTransitionExclude)
      : null

    if (theme === 'system')
      setTheme(isSystemDark ? 'light' : 'dark')
    else
      setTheme('system')

    enable?.()
  }

  useEffect(() => {
    const isDark = isDarkMode(theme, isSystemDark)
    applyDarkMode(isDark)

    if (
      (theme === 'dark' && isSystemDark)
      || (theme === 'light' && !isSystemDark)
    )
      setTheme('system')
  }, [theme, isSystemDark, setTheme])

  return { isDark, toggleDark }
}
