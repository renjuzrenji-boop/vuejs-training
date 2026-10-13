<template>
  <div class="flex items-center gap-1 rounded border border-[#dce2d9] bg-[#f3f5f0] p-1" role="group" aria-label="Color theme">
    <button
      v-for="option in themes"
      :key="option.value"
      type="button"
      class="rounded px-2 py-1.5 text-[11px] font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#c36a4c] sm:px-2.5"
      :class="theme === option.value ? 'bg-[#32634f] text-white' : 'text-[#536158] hover:bg-white'"
      :aria-pressed="theme === option.value"
      @click="setTheme(option.value)"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<script setup>
import { useTheme } from "../composables/useTheme.js";

const { theme, themes, setTheme } = useTheme();
</script>