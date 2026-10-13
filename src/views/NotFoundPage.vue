<template>
  <section class="mx-auto max-w-xl py-10">
    <p class="mb-2 text-[10px] font-bold tracking-[1.1px] text-[#a35b3c]">404 · NOT FOUND</p>
    <h1 class="font-serif text-3xl font-normal text-[#25342c]">That page doesn’t exist.</h1>
    <p class="mt-3 text-sm leading-6 text-[#707b73]">The address {{ route.fullPath }} does not match a portal route.</p>
    <RouterLink :to="{ name: authStore.isAuthenticated ? 'dashboard' : 'login' }" class="mt-6 inline-flex rounded bg-[#32634f] px-4 py-2.5 text-sm font-semibold text-white no-underline hover:bg-[#295440]">
      {{ authStore.isAuthenticated ? "Return to dashboard" : "Go to sign in" }}
    </RouterLink>
  </section>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useAuthStore } from "../stores/authStore.js";

const route = useRoute();
const authStore = useAuthStore();
</script>