<template>
  <section class="space-y-5" aria-labelledby="employee-training-title">
    <header class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 id="employee-training-title" class="font-serif text-2xl font-normal text-[#25342c]">Training</h2>
        <p class="mt-1 text-sm text-[#707b73]">Learning plan for {{ employee.name }}.</p>
      </div>
      <label class="flex items-center gap-2 text-xs text-[#536158]">
        <input v-model="showCompleted" type="checkbox" class="h-4 w-4 accent-[#32634f]" />
        Include completed
      </label>
    </header>

    <ul class="m-0 list-none divide-y divide-[#e5e9e3] border-y border-[#dce2d9] p-0">
      <li v-for="course in visibleCourses" :key="course.title" class="flex flex-wrap items-center justify-between gap-3 py-4">
        <div>
          <h3 class="m-0 text-sm font-semibold text-[#29342d]">{{ course.title }}</h3>
          <p class="mb-0 mt-1 text-xs text-[#78827a]">{{ course.duration }} · {{ course.category }}</p>
        </div>
        <span class="text-xs font-medium" :class="course.complete ? 'text-[#32634f]' : 'text-[#a35b3c]'">
          {{ course.complete ? "Completed" : "In progress" }}
        </span>
      </li>
    </ul>
    <p class="text-xs text-[#78827a]">{{ completedCount }} of {{ courses.length }} courses completed</p>
  </section>
</template>

<script setup>
import { computed, ref } from "vue";

defineProps({
  employee: {
    type: Object,
    required: true
  }
});

const showCompleted = ref(true);
const courses = ref([
  { title: "Security essentials", duration: "45 min", category: "Compliance", complete: true },
  { title: "Communication at work", duration: "2 hours", category: "Professional skills", complete: true },
  { title: "Building with Vue", duration: "3 hours", category: "Technical", complete: false }
]);
const completedCount = computed(() => courses.value.filter((course) => course.complete).length);
const visibleCourses = computed(() => showCompleted.value
  ? courses.value
  : courses.value.filter((course) => !course.complete));
</script>