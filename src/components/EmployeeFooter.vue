<template>
  <footer class="employee-footer">
    <EmployeeSkills :skills="employee.skills" />
  </footer>
</template>

<script>
import EmployeeSkills from "./EmployeeSkills.vue";

export default {
  name: "EmployeeFooter",

  components: {
    EmployeeSkills
  },

  props: {
    employee: {
      type: Object,
      required: true
    }
  }
};
</script>