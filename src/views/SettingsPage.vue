<template>
  <section class="max-w-2xl">
    <header class="mb-6 border-b border-[#dce2d9] pb-5">
      <p class="mb-2 text-[10px] font-bold tracking-[1.1px] text-[#61776a]">PREFERENCES</p>
      <h1 class="font-serif text-3xl font-normal text-[#25342c]">Settings</h1>
      <p class="mt-2 text-sm text-[#707b73]">Manage your portal preferences.</p>
    </header>

    <form class="space-y-6" @submit.prevent="saveSettings">
      <label class="flex items-start justify-between gap-5 border-b border-[#e5e9e3] pb-5">
        <span>
          <strong class="block text-sm font-semibold text-[#29342d]">Email notifications</strong>
          <span class="mt-1 block text-xs text-[#78827a]">Receive updates about changes to your team.</span>
        </span>
        <input v-model="emailNotifications" type="checkbox" class="mt-1 h-4 w-4 accent-[#32634f]" />
      </label>

      <label class="grid max-w-xs gap-2">
        <span class="text-sm font-semibold text-[#29342d]">Language</span>
        <select v-model="language" class="h-10 rounded border border-[#dce3dc] bg-white px-3 text-sm text-[#29342d]">
          <option value="en">English</option>
          <option value="fr">French</option>
          <option value="es">Spanish</option>
        </select>
      </label>

      <div class="flex flex-wrap items-center gap-4">
        <button type="submit" class="rounded bg-[#32634f] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#295440]">
          Save settings
        </button>
        <p v-if="saved" class="m-0 text-sm text-[#32634f]" role="status">Preferences saved for this session.</p>
      </div>
    </form>
  </section>
</template>

<script setup>
import { ref } from "vue";

const emailNotifications = ref(true);
const language = ref("en");
const saved = ref(false);

function saveSettings() {
  saved.value = true;
}
</script>