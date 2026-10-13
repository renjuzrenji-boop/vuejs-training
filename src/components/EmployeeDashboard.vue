<template>
  <section class="space-y-6" aria-labelledby="employee-dashboard-title">
    <header class="flex flex-wrap items-end justify-between gap-4 border-b border-[#dce2d9] pb-5">
      <div>
        <p class="mb-2 text-[10px] font-bold tracking-[1.1px] text-[#61776a]">EMPLOYEE DASHBOARD</p>
        <h1 id="employee-dashboard-title" class="font-serif text-3xl font-normal text-[#25342c]">
          {{ employee.name }}
        </h1>
        <p class="mt-2 text-sm text-[#707b73]">{{ employee.designation }} · {{ employee.department }}</p>
      </div>
      <span class="rounded border border-[#dce2d9] px-3 py-2 text-xs font-medium text-[#536158]">
        {{ employee.status }}
      </span>
    </header>

    <div class="overflow-x-auto border-b border-[#dce2d9]">
      <div class="flex min-w-max gap-1" role="tablist" aria-label="Employee dashboard sections">
        <button
          v-for="tab in tabs"
          :id="`employee-tab-${tab.id}`"
          :key="tab.id"
          type="button"
          role="tab"
          class="border-b-2 px-4 py-3 text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#c36a4c]"
          :class="activeTab === tab.id
            ? 'border-[#32634f] text-[#32634f]'
            : 'border-transparent text-[#68736b] hover:text-[#25342c]'"
          :aria-selected="activeTab === tab.id"
          :aria-controls="'employee-dashboard-panel'"
          :tabindex="activeTab === tab.id ? 0 : -1"
          @click="activeTab = tab.id"
          @keydown="handleTabKeydown($event, tab.id)"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>

    <KeepAlive :max="5">
      <component
        :is="activeComponent"
        :key="activeTab"
        id="employee-dashboard-panel"
        role="tabpanel"
        :aria-labelledby="`employee-tab-${activeTab}`"
        :employee="employee"
      />
    </KeepAlive>
  </section>
</template>

<script setup>
import { computed, nextTick, ref } from "vue";
import EmployeeProfile from "./EmployeeProfile.vue";
import EmployeeProjectsTab from "./EmployeeProjectsTab.vue";
import EmployeeSkillsTab from "./EmployeeSkillsTab.vue";
import EmployeeTrainingTab from "./EmployeeTrainingTab.vue";
import EmployeePerformanceTab from "./EmployeePerformanceTab.vue";

defineProps({
  employee: {
    type: Object,
    required: true
  }
});

const tabs = [
  { id: "overview", label: "Overview", component: EmployeeProfile },
  { id: "projects", label: "Projects", component: EmployeeProjectsTab },
  { id: "skills", label: "Skills", component: EmployeeSkillsTab },
  { id: "training", label: "Training", component: EmployeeTrainingTab },
  { id: "performance", label: "Performance", component: EmployeePerformanceTab }
];

const activeTab = ref("overview");
const activeComponent = computed(() => tabs.find((tab) => tab.id === activeTab.value)?.component);

function handleTabKeydown(event, currentTab) {
  const direction = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
  if (!direction) {
    return;
  }

  event.preventDefault();
  const currentIndex = tabs.findIndex((tab) => tab.id === currentTab);
  const nextIndex = (currentIndex + direction + tabs.length) % tabs.length;
  activeTab.value = tabs[nextIndex].id;
  nextTick(() => document.getElementById(`employee-tab-${activeTab.value}`)?.focus());
}
</script>