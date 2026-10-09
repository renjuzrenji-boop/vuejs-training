<template>
  <section>
    <header class="mb-6 border-b border-[#dce2d9] pb-5">
      <p class="mb-2 text-[10px] font-bold tracking-[1.1px] text-[#61776a]">ACCOUNT</p>
      <h1 class="font-serif text-3xl font-normal text-[#25342c]">My profile</h1>
      <p class="mt-2 text-sm text-[#707b73]">Your employee details and current skills.</p>
    </header>
    <EmployeeProfile v-if="currentEmployee" :employee="currentEmployee" />
  </section>
</template>

<script setup>
import { computed } from "vue";
import EmployeeProfile from "../components/EmployeeProfile.vue";
import { employees } from "../data/employees.js";
import { currentUser } from "../auth/session.js";

const currentEmployee = computed(() =>
  employees.value.find((employee) => employee.id === currentUser.value?.employeeId)
);
</script>