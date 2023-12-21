import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { camelize, getCurrentInstance, toHandlerKey } from "vue"

import type { ClassValue } from "clsx"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
