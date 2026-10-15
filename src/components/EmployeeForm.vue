<template>
  <form
    id="employee-registration"
    ref="formElement"
    class="grid grid-cols-1 gap-4 sm:grid-cols-2"
    aria-label="Employee registration form"
    novalidate
    @submit.prevent="submitForm"
  >
    <label class="grid gap-1.5 text-xs font-medium text-[#68736b]">
      <span>Name</span>
      <input :value="modelValue.name" name="name" class="h-10 rounded border border-[#dce3dc] px-3 text-sm text-[#29342d]" required @input="updateField('name', $event.target.value)" />
    </label>
    <label class="grid gap-1.5 text-xs font-medium text-[#68736b]">
      <span>Email</span>
      <input :value="modelValue.email" name="email" type="email" class="h-10 rounded border border-[#dce3dc] px-3 text-sm text-[#29342d]" required @input="updateField('email', $event.target.value)" />
    </label>
    <label class="grid gap-1.5 text-xs font-medium text-[#68736b]">
      <span>Phone</span>
      <input :value="modelValue.phone" name="phone" type="tel" class="h-10 rounded border border-[#dce3dc] px-3 text-sm text-[#29342d]" required @input="updateField('phone', $event.target.value)" />
    </label>
    <label class="grid gap-1.5 text-xs font-medium text-[#68736b]">
      <span>Gender</span>
      <select :value="modelValue.gender" name="gender" class="h-10 rounded border border-[#dce3dc] px-3 text-sm text-[#29342d]" required @change="updateField('gender', $event.target.value)">
        <option disabled value="">Choose a gender</option>
        <option v-for="gender in genderOptions" :key="gender" :value="gender">{{ gender }}</option>
      </select>
    </label>
    <label class="grid gap-1.5 text-xs font-medium text-[#68736b]">
      <span>Department</span>
      <input :value="modelValue.department" name="department" class="h-10 rounded border border-[#dce3dc] px-3 text-sm text-[#29342d]" required @input="updateField('department', $event.target.value)" />
    </label>
    <label class="grid gap-1.5 text-xs font-medium text-[#68736b]">
      <span>Designation</span>
      <input :value="modelValue.designation" name="designation" class="h-10 rounded border border-[#dce3dc] px-3 text-sm text-[#29342d]" required @input="updateField('designation', $event.target.value)" />
    </label>
    <fieldset class="grid gap-2 border-0 p-0 sm:col-span-2">
      <legend class="mb-1.5 text-xs font-medium text-[#68736b]">Skills</legend>
      <div class="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <label
          v-for="skill in skillOptions"
          :key="skill"
          class="flex items-center gap-2 text-sm text-[#29342d]"
        >
          <input
            type="checkbox"
            :value="skill"
            :checked="modelValue.skills.includes(skill)"
            class="h-4 w-4 accent-[#32634f]"
            @change="toggleSkill(skill, $event.target.checked)"
          />
          {{ skill }}
        </label>
      </div>
    </fieldset>
    <label class="grid gap-1.5 text-xs font-medium text-[#68736b]">
      <span>Experience (years)</span>
      <input :value="modelValue.experience" name="experience" type="number" min="0" step="0.5" class="h-10 rounded border border-[#dce3dc] px-3 text-sm text-[#29342d]" required @input="updateField('experience', $event.target.value === '' ? '' : Number($event.target.value))" />
    </label>
    <label class="grid gap-1.5 text-xs font-medium text-[#68736b]">
      <span>Joining date</span>
      <input :value="modelValue.joiningDate" name="joiningDate" type="date" class="h-10 rounded border border-[#dce3dc] px-3 text-sm text-[#29342d]" required @input="updateField('joiningDate', $event.target.value)" />
    </label>
    <label class="grid gap-1.5 text-xs font-medium text-[#68736b]">
      <span>Status</span>
      <select :value="modelValue.status" name="status" class="h-10 rounded border border-[#dce3dc] px-3 text-sm text-[#29342d]" @change="updateField('status', $event.target.value)">
        <option>Active</option>
        <option>Inactive</option>
      </select>
    </label>
  </form>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  },
  genderOptions: {
    type: Array,
    required: true
  },
  skillOptions: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(["update:modelValue", "submit"]);
const formElement = ref(null);

function updateField(field, value) {
  emit("update:modelValue", { ...props.modelValue, [field]: value });
}

function toggleSkill(skill, checked) {
  const skills = new Set(props.modelValue.skills);
  if (checked) {
    skills.add(skill);
  } else {
    skills.delete(skill);
  }
  updateField("skills", [...skills]);
}

function validate() {
  return formElement.value?.reportValidity() ?? false;
}

function submitForm() {
  if (validate()) {
    emit("submit", { ...props.modelValue, skills: [...props.modelValue.skills] });
  }
}

defineExpose({ validate });
</script>