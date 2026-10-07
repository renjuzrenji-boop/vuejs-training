<template>
  <section aria-label="Employee details">
    <dl class="m-0 grid grid-cols-2 gap-x-5 gap-y-[18px] sm:grid-cols-3 sm:gap-5">
      <div>
        <dt class="mb-[7px] text-xs text-[#828c84]">Designation</dt>
        <dd class="m-0 text-sm font-semibold text-[#29342d]">{{ employee.designation }}</dd>
      </div>
      <div>
        <dt class="mb-[7px] text-xs text-[#828c84]">Department</dt>
        <dd class="m-0 text-sm font-semibold text-[#29342d]">{{ employee.department }}</dd>
      </div>
      <div>
        <dt class="mb-[7px] text-xs text-[#828c84]">Experience</dt>
        <dd class="m-0 text-sm font-semibold text-[#29342d]">{{ employee.experience }} years</dd>
      </div>
    </dl>
  </section>
</template>

<script>
export default {
  name: "EmployeeDetails",

  props: {
    employee: {
      type: Object,
      required: true
    }
  }
};
</script>

