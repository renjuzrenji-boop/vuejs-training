<template>
  <div class="employee-grid grid grid-cols-1 gap-4 sm:grid-cols-2">
    <EmployeeCard
      v-for="employee in employees"
      :key="employee.id"
      :employee="employee"
    />
  </div>
</template>

<script>
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
    }
  }
};
</script>