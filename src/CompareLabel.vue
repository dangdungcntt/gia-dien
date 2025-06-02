<script setup lang="ts">
import {roundNumber} from "./utils";
import {computed} from "vue";

const props = defineProps<{
  value: number,
  base: number,
  increaseClass: string,
  decreaseClass: string
}>()
const changed = computed(() => {
  return roundNumber(((props.value / props.base) - 1) * 100, 100)
})
</script>

<template>
  <span :class="{[increaseClass]: changed > 0, [decreaseClass]: changed < 0}">
    {{ changed > 0 ? '↑' : '↓' }}{{ Math.abs(changed) }}%
  </span>
</template>
