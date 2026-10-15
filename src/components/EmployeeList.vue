<template>
  <section aria-label="Employee results">
    <div class="employee-grid grid grid-cols-1 gap-4 sm:grid-cols-2">
    <RouterLink
      v-for="employee in visibleEmployees"
      :key="employee.id"
      class="block no-underline"
      :to="{ name: 'employee-detail', params: { id: employee.id } }"
    >
      <EmployeeCard :employee="employee" />
    </RouterLink>
    </div>

    <nav
      v-if="totalPages > 1"
      class="mt-5 flex items-center justify-between gap-3 border-t border-[#dce2d9] pt-4"
      aria-label="Employee result pages"
    >
      <p class="m-0 text-xs text-[#78827a]" aria-live="polite">
        Showing {{ firstVisibleIndex }}–{{ lastVisibleIndex }} of {{ employees.length }} employees
      </p>
      <div class="flex items-center gap-2">
        <button
          type="button"
          class="rounded border border-[#dce2d9] px-3 py-2 text-xs text-[#536158] disabled:cursor-not-allowed disabled:opacity-50"
          :disabled="safePage === 1"
          aria-label="Previous employee page"
          @click="changePage(-1)"
        >
          Previous
        </button>
        <span class="min-w-16 text-center text-xs text-[#536158]">Page {{ safePage }} of {{ totalPages }}</span>
        <button
          type="button"
          class="rounded border border-[#dce2d9] px-3 py-2 text-xs text-[#536158] disabled:cursor-not-allowed disabled:opacity-50"
          :disabled="safePage === totalPages"
          aria-label="Next employee page"
          @click="changePage(1)"
        >
          Next
        </button>
      </div>
    </nav>
  </section>
</template>

<script>
import { computed, ref } from "vue";
import EmployeeCard from "./EmployeeCard.vue";

export default {
  name: "EmployeeList",

  components: {
    EmployeeCard
  },

  props: {
    employees: {
      type: Array,
      required: true
    },
    pageSize: {
      type: Number,
      default: 12,
      validator: (value) => Number.isInteger(value) && value > 0
    }
    },

  setup(props) {
    const currentPage = ref(1);
    const totalPages = computed(() => Math.max(1, Math.ceil(props.employees.length / props.pageSize)));
    const safePage = computed(() => Math.min(currentPage.value, totalPages.value));
    const firstVisibleIndex = computed(() => props.employees.length === 0
      ? 0
      : (safePage.value - 1) * props.pageSize + 1);
    const lastVisibleIndex = computed(() => Math.min(safePage.value * props.pageSize, props.employees.length));
    const visibleEmployees = computed(() => props.employees.slice(
      firstVisibleIndex.value - 1,
      lastVisibleIndex.value
    ));

    function changePage(direction) {
      currentPage.value = Math.max(1, Math.min(totalPages.value, safePage.value + direction));
    }

    return {
      visibleEmployees,
      totalPages,
      safePage,
      firstVisibleIndex,
      lastVisibleIndex,
      changePage
    };
  },
};
</script>