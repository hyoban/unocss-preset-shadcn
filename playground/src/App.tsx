import { AppearanceSwitch } from "@/components/appearance-switch"
import { ThemeSwitch } from "@/components/theme-switch"

export default function ButtonDemo() {
  return (
    <div className="h-full flex flex-col justify-center items-center gap-8">
      <ThemeSwitch />
      <AppearanceSwitch />
    </div>
  )
}
