<template>
  <section class="skills-section" aria-labelledby="skills-title">
    <h3 id="skills-title">Skills</h3>
    <ul class="skill-list">
      <li v-for="skill in skills" :key="skill" class="skill-tag">
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

<style scoped>
.skills-section h3 {
  margin: 0 0 15px;
  color: #29342d;
  font-size: 14px;
  font-weight: 650;
}

.skill-list {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.skill-tag {
  padding: 7px 11px;
  border: 1px solid #e2e9e2;
  border-radius: 5px;
  color: #456050;
  background: #f6f8f5;
  font-size: 12px;
  font-weight: 550;
}
</style>