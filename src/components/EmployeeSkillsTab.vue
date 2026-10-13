<template>
  <section class="space-y-5" aria-labelledby="employee-skills-title">
    <header>
      <h2 id="employee-skills-title" class="font-serif text-2xl font-normal text-[#25342c]">Skills</h2>
      <p class="mt-1 text-sm text-[#707b73]">Capabilities on {{ employee.name }}’s profile.</p>
    </header>

    <EmployeeSkills :skills="employee.skills" />

    <button
      type="button"
      class="text-sm font-medium text-[#32634f] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c36a4c]"
      :aria-expanded="showLevels"
      @click="showLevels = !showLevels"
    >
      {{ showLevels ? "Hide proficiency" : "Show proficiency" }}
    </button>

    <ul v-if="showLevels" class="m-0 grid list-none gap-4 border-y border-[#dce2d9] py-4 p-0 sm:grid-cols-2">
      <li v-for="(skill, index) in employee.skills" :key="skill" class="grid gap-2">
        <div class="flex justify-between gap-3 text-xs text-[#536158]">
          <span>{{ skill }}</span>
          <span>{{ proficiency(index) }}%</span>
        </div>
        <div class="h-1.5 overflow-hidden rounded bg-[#e7ebe5]" role="meter" :aria-label="`${skill} proficiency`" aria-valuemin="0" aria-valuemax="100" :aria-valuenow="proficiency(index)">
          <div class="h-full rounded bg-[#32634f]" :style="{ width: `${proficiency(index)}%` }"></div>
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { ref } from "vue";
import EmployeeSkills from "./EmployeeSkills.vue";

defineProps({
  employee: {
    type: Object,
    required: true
  }
});

const showLevels = ref(false);

function proficiency(index) {
  return Math.max(58, 94 - index * 9);
}
</script>