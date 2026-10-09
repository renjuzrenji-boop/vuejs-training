<template>
  <section class="mx-auto max-w-xl py-10">
    <p class="mb-2 text-[10px] font-bold tracking-[1.1px] text-[#a35b3c]">403 · ACCESS DENIED</p>
    <h1 class="font-serif text-3xl font-normal text-[#25342c]">This page isn’t available to your role.</h1>
    <p class="mt-3 text-sm leading-6 text-[#707b73]">
      Your current role is {{ currentUser?.role }}. Choose another page or sign out to change roles.
    </p>
    <RouterLink :to="{ name: 'dashboard' }" class="mt-6 inline-flex rounded bg-[#32634f] px-4 py-2.5 text-sm font-semibold text-white no-underline hover:bg-[#295440]">
      Return to dashboard
    </RouterLink>
  </section>
</template>

<script setup>
import { currentUser } from "../auth/session.js";
</script>