<template>
  <div class="min-h-screen bg-[#f3f5f0] text-[#202923]">
    <header class="border-b border-[#e7ebe5] bg-white">
      <div class="mx-auto flex w-[min(100%-32px,1120px)] flex-wrap items-center justify-between gap-4 py-4 sm:h-[68px] sm:flex-nowrap sm:py-0">
        <RouterLink class="inline-flex items-center gap-3 text-sm font-bold text-[#202923] no-underline" :to="{ name: 'dashboard' }">
          <span class="grid h-[30px] w-[30px] place-items-center rounded-lg bg-[#32634f] font-serif text-[17px] text-white">E</span>
          <span>People<span class="font-normal text-[#7a847d]"> / Portal</span></span>
        </RouterLink>

        <div v-if="currentUser" class="flex w-full items-center gap-3 sm:w-auto">
          <nav class="flex min-w-0 flex-1 gap-1 overflow-x-auto sm:flex-initial" aria-label="Main navigation">
            <RouterLink
              v-for="item in visibleNavigation"
              :key="item.name"
              class="portal-link"
              :to="{ name: item.name }"
            >
              {{ item.label }}
            </RouterLink>
          </nav>
          <span class="hidden whitespace-nowrap text-xs text-[#78827a] md:inline">
            {{ currentUser.name }} · {{ currentUser.role }}
          </span>
          <button type="button" class="portal-sign-out" @click="leavePortal">Sign out</button>
        </div>
      </div>
    </header>

    <main class="mx-auto w-[min(100%-32px,1000px)] py-8 sm:py-12">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { currentUser, signOut, ROLES } from "./auth/session.js";

const router = useRouter();
const navigation = [
  { name: "dashboard", label: "Dashboard", roles: [ROLES.ADMIN, ROLES.HR, ROLES.EMPLOYEE] },
  { name: "employees", label: "Employees", roles: [ROLES.ADMIN, ROLES.HR] },
  { name: "profile", label: "Profile", roles: [ROLES.ADMIN, ROLES.HR, ROLES.EMPLOYEE] },
  { name: "settings", label: "Settings", roles: [ROLES.ADMIN] },
  { name: "workspace", label: "Workspace", roles: [ROLES.ADMIN] }
];

const visibleNavigation = computed(() => navigation.filter((item) => item.roles.includes(currentUser.value?.role)));

function leavePortal() {
  signOut();
  router.replace({ name: "login" });
}
</script>

<style scoped>
.portal-link {
  flex: 0 0 auto;
  padding: 9px 12px;
  border-radius: 4px;
  color: #68736b;
  font-size: 12px;
  font-weight: 500;
  text-decoration: none;
}

.portal-link:hover,
.portal-link.router-link-active {
  color: #25342c;
  background: #f3f5f0;
}

.portal-link:focus-visible {
  outline: 2px solid #c36a4c;
  outline-offset: 2px;
}

.portal-sign-out {
  flex: 0 0 auto;
  padding: 8px 10px;
  border: 1px solid #dce2d9;
  border-radius: 4px;
  color: #536158;
  background: #fff;
  font: inherit;
  font-size: 12px;
  cursor: pointer;
}

.portal-sign-out:hover {
  background: #f3f5f0;
}
</style>