<template>
  <section class="space-y-5" aria-labelledby="employee-performance-title">
    <header class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 id="employee-performance-title" class="font-serif text-2xl font-normal text-[#25342c]">Performance</h2>
        <p class="mt-1 text-sm text-[#707b73]">Sample indicators for {{ employee.name }}.</p>
      </div>
      <div class="inline-flex rounded border border-[#dce2d9] p-1" role="group" aria-label="Performance period">
        <button
          v-for="option in periods"
          :key="option"
          type="button"
          class="rounded px-3 py-1.5 text-xs font-medium"
          :class="period === option ? 'bg-[#32634f] text-white' : 'text-[#536158] hover:bg-[#f3f5f0]'"
          :aria-pressed="period === option"
          @click="period = option"
        >
          {{ option }}
        </button>
      </div>
    </header>

    <div class="grid gap-4 sm:grid-cols-3">
      <article class="border-y border-[#dce2d9] py-4">
        <p class="text-xs text-[#78827a]">Goals completed</p>
        <strong class="mt-2 block font-serif text-3xl font-normal text-[#32634f]">{{ goalScore }}%</strong>
      </article>
      <article class="border-y border-[#dce2d9] py-4">
        <p class="text-xs text-[#78827a]">Learning progress</p>
        <strong class="mt-2 block font-serif text-3xl font-normal text-[#a35b3c]">{{ learningScore }}%</strong>
      </article>
      <article class="border-y border-[#dce2d9] py-4">
        <p class="text-xs text-[#78827a]">Team status</p>
        <strong class="mt-2 block font-serif text-3xl font-normal text-[#25342c]">{{ employee.status }}</strong>
      </article>
    </div>

    <div class="space-y-4 border-y border-[#dce2d9] py-5">
      <div v-for="metric in metrics" :key="metric.label" class="grid gap-2">
        <div class="flex justify-between gap-3 text-xs text-[#536158]">
          <span>{{ metric.label }}</span>
          <span>{{ metric.value }}%</span>
        </div>
        <div class="h-2 overflow-hidden rounded bg-[#e7ebe5]" role="meter" :aria-label="metric.label" aria-valuemin="0" aria-valuemax="100" :aria-valuenow="metric.value">
          <div class="h-full rounded bg-[#32634f]" :style="{ width: `${metric.value}%` }"></div>
        </div>
      </div>
    </div>
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

const periods = ["Quarter", "Year"];
const period = ref("Quarter");
const goalScore = computed(() => Math.min(98, 72 + props.employee.experience * 3 + (period.value === "Year" ? 5 : 0)));
const learningScore = computed(() => Math.min(100, 35 + props.employee.skills.length * 13 + (period.value === "Year" ? 8 : 0)));
const metrics = computed(() => [
  { label: "Goals", value: goalScore.value },
  { label: "Learning", value: learningScore.value }
]);
</script>