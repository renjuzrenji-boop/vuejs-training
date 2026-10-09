<template>
  <section>
    <RouterLink :to="backRoute" class="mb-5 inline-flex text-sm font-medium text-[#32634f] hover:underline">
      <span aria-hidden="true">←</span>&nbsp;{{ backLabel }}
    </RouterLink>
    <EmployeeProfile v-if="employee" :employee="employee" />
    <div v-else class="border-y border-[#dce2d9] py-8">
      <h2 class="font-serif text-2xl font-normal text-[#25342c]">Employee not found</h2>
      <p class="mt-2 text-sm text-[#707b73]">There is no employee with ID {{ id }}.</p>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import EmployeeProfile from "../components/EmployeeProfile.vue";
import { employees } from "../data/employees.js";
import { currentUser, ROLES } from "../auth/session.js";

const props = defineProps({
  id: {
    type: String,
    required: true
  }
});

const employee = computed(() => employees.value.find((record) => String(record.id) === props.id));
const isEmployee = currentUser.value?.role === ROLES.EMPLOYEE;
const backRoute = isEmployee ? { name: "profile" } : { name: "employees" };
const backLabel = isEmployee ? "My profile" : "All employees";
</script>