import { AppearanceSwitch } from '@/components/appearance-switch'
import { ThemeSwitch } from '@/components/theme-switch'

export default function ButtonDemo() {
  return (
    <div className="h-full flex flex-col justify-center items-center gap-8">
      <ThemeSwitch />
      <div className="flex gap-4">
        <AppearanceSwitch />
        <a
          className="i-lucide-github"
          href="https://github.com/hyoban/unocss-preset-shadcn"
          target="_blank"
          rel="noreferrer"
        />
      </div>
    </div>
  )
}
