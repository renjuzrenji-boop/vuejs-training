<template>
  <section aria-label="Employee directory">
    <label class="mb-5 block max-w-sm">
      <span class="mb-1.5 block text-xs font-medium text-[#68736b]">Search employees</span>
      <input
        v-model="searchTerm"
        type="search"
        placeholder="Search by name or department"
        class="h-10 w-full rounded border border-[#dce3dc] bg-white px-3 text-sm text-[#29342d] outline-none focus:border-[#32634f]"
      />
    </label>
    <EmployeeList v-if="filteredEmployees.length" :employees="filteredEmployees" />
    <p v-else class="py-6 text-sm text-[#78827a]">No employees match this search.</p>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import EmployeeList from "../components/EmployeeList.vue";
import { employees } from "../data/employees.js";

const route = useRoute();
const router = useRouter();

const searchTerm = computed({
  get: () => typeof route.query.search === "string" ? route.query.search : "",
  set: (search) => {
    const query = { ...route.query };
    if (search.trim()) {
      query.search = search.trim();
    } else {
      delete query.search;
    }
    router.replace({ name: "employees", query });
  }
});

const filteredEmployees = computed(() => {
  const search = searchTerm.value.toLowerCase();
  return employees.value.filter((employee) =>
    `${employee.name} ${employee.department} ${employee.designation}`.toLowerCase().includes(search)
  );
});
</script>