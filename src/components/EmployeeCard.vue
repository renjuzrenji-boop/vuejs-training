<template>
  <article class="mx-auto max-w-[900px] rounded-lg border border-[#e4e9e2] bg-white p-6 shadow-sm sm:p-8">
    <EmployeeHeader :employee="employee" />
    <div class="my-6 h-px bg-[#edf0ec]"></div>
    <EmployeeDetails :employee="employee" />
    <div class="my-6 h-px bg-[#edf0ec]"></div>
    <EmployeeFooter :employee="employee" />
  </article>
</template>

<script>
import EmployeeDetails from "./EmployeeDetails.vue";
import EmployeeFooter from "./EmployeeFooter.vue";
import EmployeeHeader from "./EmployeeHeader.vue";

export default {
  name: "EmployeeCard",

  components: {
    EmployeeDetails,
    EmployeeFooter,
    EmployeeHeader
  },

  props: {
    employee: {
      type: Object,
      required: true
    }
  }
};
</script>

