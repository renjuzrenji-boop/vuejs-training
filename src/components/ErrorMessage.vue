<template>
  <p class="my-3 rounded border border-[#efd6ce] bg-[#fff5f1] px-3 py-2.5 text-sm text-[#a54734]" role="alert">
    {{ message }}
  </p>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    required: true
  }
});
</script>