<template>
  <section class="mx-auto max-w-lg py-8">
    <p class="mb-2 text-[10px] font-bold tracking-[1.1px] text-[#61776a]">EMPLOYEE PORTAL</p>
    <h1 class="font-serif text-3xl font-normal text-[#25342c]">Choose a demo role</h1>
    <p class="mt-2 text-sm leading-6 text-[#707b73]">
      Sign in as one of the sample roles to explore the routes and access rules.
    </p>

    <form class="mt-7 space-y-5" @submit.prevent="enterPortal">
      <label class="grid gap-2">
        <span class="text-sm font-semibold text-[#29342d]">Role</span>
        <select v-model="selectedRole" class="h-11 rounded border border-[#dce3dc] bg-white px-3 text-sm text-[#29342d]">
          <option :value="ROLES.ADMIN">ADMIN</option>
          <option :value="ROLES.HR">HR</option>
          <option :value="ROLES.EMPLOYEE">EMPLOYEE</option>
        </select>
      </label>

      <p class="border-l-2 border-[#c4694f] pl-3 text-xs leading-5 text-[#707b73]">
        {{ roleDescription }}
      </p>

      <p v-if="loginError" class="text-sm text-[#a54734]" role="alert">{{ loginError }}</p>

      <button
        type="submit"
        class="rounded bg-[#32634f] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#295440] disabled:cursor-wait disabled:opacity-60"
        :disabled="authStore.isLoading"
      >
        {{ authStore.isLoading ? "Signing in..." : `Continue as ${selectedRole} →` }}
      </button>
    </form>
  </section>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ROLES, useAuthStore } from "../stores/authStore.js";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const selectedRole = ref(ROLES.EMPLOYEE);
const loginError = ref("");
const roleDescription = computed(() => ({
  [ROLES.ADMIN]: "Full portal access, including employee management and settings.",
  [ROLES.HR]: "Access to the dashboard, employee directory, employee details, and profile.",
  [ROLES.EMPLOYEE]: "Access to the dashboard and your own employee profile."
}[selectedRole.value]));

async function enterPortal() {
  loginError.value = "";
  const requestedPath = route.query.redirect;
  const redirect = typeof requestedPath === "string" && requestedPath.startsWith("/") && !requestedPath.startsWith("//")
    ? requestedPath
    : "/dashboard";

  try {
    await authStore.login(selectedRole.value);
    await router.replace(redirect);
  } catch (error) {
    loginError.value = error instanceof Error ? error.message : "Unable to sign in. Please try again.";
  }
}
</script>