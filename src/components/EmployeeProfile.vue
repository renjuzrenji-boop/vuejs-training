<template>
  <article class="employee-card">
    <header class="profile-header">
      <div class="identity">
        <div class="avatar" aria-hidden="true">{{ initials }}</div>
        <div class="identity-copy">
          <p class="identity-label">EMPLOYEE</p>
          <h2>{{ employee.name }}</h2>
          <p class="role">{{ employee.designation }}</p>
        </div>
      </div>
      <span
        class="status"
        :class="employee.status === 'Active' ? 'is-active' : 'is-inactive'"
        role="status"
      >
        <span class="status-dot"></span>{{ employee.status }}
      </span>
    </header>

    <div class="card-divider"></div>

    <section class="details-section" aria-labelledby="details-title">
      <dl class="details-grid">
        <div class="detail-item">
          <dt>Designation</dt>
          <dd>{{ employee.designation }}</dd>
        </div>
        <div class="detail-item">
          <dt>Department</dt>
          <dd>{{ employee.department }}</dd>
        </div>
        <div class="detail-item">
          <dt>Experience</dt>
          <dd>{{ employee.experience }} years</dd>
        </div>
      </dl>
    </section>

    <div class="card-divider"></div>

    <EmployeeSkills :skills="employee.skills" />
  </article>
</template>

<script>
import EmployeeSkills from "./EmployeeSkills.vue";

export default {
  name: "EmployeeProfile",

  components: {
    EmployeeSkills
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
  },

  data() {
    return {
      employee: {
        name: "Renjith",
        designation: "Project Manager",
        department: "IT",
        experience: 5,
        skills: ["Vue.js", "Angular", "Node.js", "AWS"],
        status: "Active"
      }
    };
  }
};
</script>

<style scoped>
.employee-card {
  max-width: 900px;
  margin: 0 auto;
  padding: 30px 34px 32px;
  border: 1px solid #e4e9e2;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 12px 32px rgb(29 48 36 / 5%);
}

.profile-header,
.identity {
  display: flex;
  align-items: center;
}

.profile-header {
  justify-content: space-between;
  gap: 20px;
}

.identity {
  gap: 18px;
  min-width: 0;
}

.avatar {
  width: 64px;
  height: 64px;
  flex: 0 0 64px;
  display: grid;
  place-items: center;
  border: 1px solid #d8e5db;
  border-radius: 50%;
  color: #32634f;
  background: #edf4ee;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 23px;
}

.identity-label {
  margin: 0 0 5px;
  color: #879088;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 1.1px;
}

h2 {
  margin: 0;
  color: #202923;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 25px;
  font-weight: 400;
}

.role {
  margin: 5px 0 0;
  color: #68736b;
  font-size: 13px;
}

.role span {
  padding: 0 4px;
  color: #c4694f;
}

.status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 7px 10px;
  border: 1px solid;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
}

.is-active {
  border-color: #cfe2d3;
  color: #32634f;
  background: #f1f7f2;
}

.is-inactive {
  border-color: #efd6ce;
  color: #a54734;
  background: #fff5f1;
}

.status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: currentColor;
}

.card-divider {
  height: 1px;
  margin: 26px 0 23px;
  background: #edf0ec;
}

.details-section h3 {
  margin: 0 0 18px;
  color: #29342d;
  font-size: 14px;
  font-weight: 650;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  margin: 0;
}

.detail-item dt {
  margin-bottom: 7px;
  color: #828c84;
  font-size: 12px;
}

.detail-item dd {
  margin: 0;
  color: #29342d;
  font-size: 14px;
  font-weight: 600;
}

@media (max-width: 520px) {
  .employee-card {
    padding: 23px 20px 25px;
  }

  .profile-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .avatar {
    width: 56px;
    height: 56px;
    flex-basis: 56px;
  }

  .details-grid {
    grid-template-columns: 1fr 1fr;
    row-gap: 18px;
  }
}
</style>