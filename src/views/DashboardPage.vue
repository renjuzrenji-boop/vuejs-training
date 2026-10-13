<template>
  <section class="space-y-8">
    <header class="flex flex-wrap items-end justify-between gap-5 border-b border-[#dce2d9] pb-6">
      <div>
        <p class="mb-2 text-[10px] font-bold tracking-[1.1px] text-[#61776a]">PEOPLE OPERATIONS</p>
        <h1 class="font-serif text-3xl font-normal text-[#25342c]">Dashboard</h1>
        <p class="mt-2 text-sm text-[#707b73]">A clear view of your people and teams.</p>
      </div>
      <button
        type="button"
        class="rounded bg-[#32634f] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#295440]"
        @click="goToEmployees"
      >
        Browse employees <span aria-hidden="true">→</span>
      </button>
    </header>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <article class="border-y border-[#dce2d9] py-4">
        <p class="text-xs text-[#78827a]">Team members</p>
        <strong class="mt-2 block font-serif text-3xl font-normal text-[#25342c]">{{ dashboardEmployees.length }}</strong>
      </article>
      <article class="border-y border-[#dce2d9] py-4">
        <p class="text-xs text-[#78827a]">Active employees</p>
        <strong class="mt-2 block font-serif text-3xl font-normal text-[#32634f]">{{ activeCount }}</strong>
      </article>
      <article class="border-y border-[#dce2d9] py-4">
        <p class="text-xs text-[#78827a]">Departments</p>
        <strong class="mt-2 block font-serif text-3xl font-normal text-[#a35b3c]">{{ departmentCount }}</strong>
      </article>
    </div>

    <section aria-labelledby="team-preview-title">
      <div class="mb-4 flex items-center justify-between gap-4">
        <h2 id="team-preview-title" class="font-serif text-2xl font-normal text-[#25342c]">Your team</h2>
        <RouterLink class="text-sm font-medium text-[#32634f] hover:underline" :to="{ name: 'employees' }">
          View all
        </RouterLink>
      </div>
      <EmployeeList :employees="teamPreview" />
    </section>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import EmployeeList from "../components/EmployeeList.vue";
import { employees } from "../data/employees.js";
import { ROLES, useAuthStore } from "../stores/authStore.js";

const router = useRouter();
const authStore = useAuthStore();
const dashboardEmployees = computed(() => authStore.role === ROLES.EMPLOYEE
  ? employees.value.filter((employee) => employee.id === authStore.user?.employeeId)
  : employees.value);
const activeCount = computed(() => dashboardEmployees.value.filter((employee) => employee.status === "Active").length);
const departmentCount = computed(() => new Set(dashboardEmployees.value.map((employee) => employee.department)).size);
const teamPreview = computed(() => dashboardEmployees.value.slice(0, 2));

function goToEmployees() {
  router.push({ name: "employees" });
}
</script>