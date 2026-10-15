<template>
  <div class="flex items-center gap-2 py-4 text-sm text-[#68736b]" role="status" aria-live="polite">
    <span class="h-4 w-4 animate-spin rounded-full border-2 border-[#dce2d9] border-t-[#32634f]" aria-hidden="true"></span>
    <span>{{ message }}</span>
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    default: "Loading..."
  }
});
</script>