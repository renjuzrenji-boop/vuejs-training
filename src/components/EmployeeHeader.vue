<template>
  <header class="flex items-center justify-between gap-5 max-[520px]:items-start max-[520px]:flex-col">
    <div class="flex min-w-0 items-center gap-[18px]">
      <div class="grid h-16 w-16 flex-shrink-0 place-items-center rounded-full border border-[#d8e5db] bg-[#edf4ee] font-serif text-[23px] text-[#32634f] max-[520px]:h-14 max-[520px]:w-14 max-[520px]:basis-14" aria-hidden="true">
        {{ initials }}
      </div>
      <div class="min-w-0">
        <p class="mb-[5px] text-[9px] font-bold tracking-[1.1px] text-[#879088]">EMPLOYEE</p>
        <h2 class="m-0 font-serif text-[25px] font-normal text-[#202923]">{{ employee.name }}</h2>
        <p class="mt-[5px] text-[13px] text-[#68736b]">{{ employee.designation }}</p>
      </div>
    </div>
    <span
      v-if="employee.status === 'Active'"
      class="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-[#cfe2d3] bg-[#f1f7f2] px-[10px] py-[7px] text-xs font-semibold text-[#32634f]"
      role="status"
    >
      <span class="h-[7px] w-[7px] rounded-full bg-current"></span>{{ employee.status }}
    </span>
    <span
      v-else
      class="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-[#efd6ce] bg-[#fff5f1] px-[10px] py-[7px] text-xs font-semibold text-[#a54734]"
      role="status"
    >
      <span class="h-[7px] w-[7px] rounded-full bg-current"></span>{{ employee.status }}
    </span>
  </header>
</template>

<script>
export default {
  name: "EmployeeHeader",

  props: {
    employee: {
      type: Object,
      required: true
    }
  },

  computed: {
    initials() {
      return this.employee.name
        .split(" ")
        .map((part) => part.charAt(0))
        .slice(0, 2)
        .join("")
        .toUpperCase();
    }
  }
};
</script>

