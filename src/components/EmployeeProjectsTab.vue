<template>
  <section class="space-y-5" aria-labelledby="employee-projects-title">
    <header class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h2 id="employee-projects-title" class="font-serif text-2xl font-normal text-[#25342c]">Projects</h2>
        <p class="mt-1 text-sm text-[#707b73]">Current assignments for {{ employee.name }}.</p>
      </div>
      <label class="grid gap-1 text-xs text-[#68736b]">
        <span>Project status</span>
        <select v-model="statusFilter" class="h-9 rounded border border-[#dce2d9] bg-white px-2.5 text-sm text-[#29342d]">
          <option>All</option>
          <option>In progress</option>
          <option>Complete</option>
        </select>
      </label>
    </header>

    <ul class="m-0 divide-y divide-[#e5e9e3] border-y border-[#dce2d9] p-0">
      <li v-for="project in visibleProjects" :key="project.name" class="flex flex-wrap items-center justify-between gap-3 py-4">
        <div>
          <h3 class="m-0 text-sm font-semibold text-[#29342d]">{{ project.name }}</h3>
          <p class="mb-0 mt-1 text-xs text-[#78827a]">{{ project.team }} · Lead: {{ employee.name }}</p>
        </div>
        <span class="rounded border border-[#dce2d9] px-2.5 py-1.5 text-xs text-[#536158]">{{ project.status }}</span>
      </li>
      <li v-if="visibleProjects.length === 0" class="py-5 text-sm text-[#78827a]">No projects match this status.</li>
    </ul>
  </section>
</template>

<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  employee: {
    type: Object,
    required: true
  }
});

const statusFilter = ref("All");
const projects = computed(() => [
  {
    name: props.employee.department === "IT" ? "People Portal" : "Team Experience Refresh",
    team: props.employee.department,
    status: "In progress"
  },
  {
    name: "Quarterly Planning",
    team: "Operations",
    status: "Complete"
  }
]);
const visibleProjects = computed(() => statusFilter.value === "All"
  ? projects.value
  : projects.value.filter((project) => project.status === statusFilter.value));
</script>