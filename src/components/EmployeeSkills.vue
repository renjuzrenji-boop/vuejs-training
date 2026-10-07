<template>
  <section aria-label="Skills">
    <h3 class="mb-[15px] text-sm font-semibold text-[#29342d]">Skills</h3>
    <ul class="m-0 flex list-none flex-wrap gap-[9px] p-0">
      <li
        v-for="skill in skills"
        :key="skill"
        class="rounded-[5px] border border-[#e2e9e2] bg-[#f6f8f5] px-[11px] py-[7px] text-xs font-medium text-[#456050]"
      >
        {{ skill }}
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: "EmployeeSkills",
  props: {
    skills: {
      type: Array,
      required: true
    }
  }
};
</script>

