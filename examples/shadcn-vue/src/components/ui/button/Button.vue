<script setup lang="ts">
import { cn } from "@/lib/utils"
import { Primitive } from "radix-vue"

import { buttonVariants } from "."

import type { PrimitiveProps } from "radix-vue"

interface Props extends PrimitiveProps {
  variant?: NonNullable<Parameters<typeof buttonVariants>[0]>["variant"]
  size?: NonNullable<Parameters<typeof buttonVariants>[0]>["size"]
  as?: string
}

withDefaults(defineProps<Props>(), {
  as: "button",
})
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size }), $attrs.class ?? '')"
  >
    <slot />
  </Primitive>
</template>
