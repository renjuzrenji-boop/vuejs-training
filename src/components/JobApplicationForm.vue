<template>
  <section
    id="job-application"
    class="application-page"
    aria-labelledby="application-title"
  >
    <header class="application-heading">
      <div>
        <p class="eyebrow">JOIN THE TEAM</p>
        <h1 id="application-title">Job application</h1>
        <p class="page-description">Tell us a little about yourself and your experience.</p>
      </div>
    </header>

    <form class="application-form" novalidate @submit.prevent="submitApplication">
      <div class="application-fields">
        <label class="application-field">
          <span>Name</span>
          <input
            v-model.trim="applicationForm.name"
            type="text"
            autocomplete="name"
            :aria-invalid="Boolean(applicationErrors.name)"
            aria-describedby="application-name-error"
            @input="clearApplicationError('name')"
          />
          <small v-if="applicationErrors.name" id="application-name-error" class="application-error">{{ applicationErrors.name }}</small>
        </label>

        <label class="application-field">
          <span>Email</span>
          <input
            v-model.trim="applicationForm.email"
            type="email"
            autocomplete="email"
            :aria-invalid="Boolean(applicationErrors.email)"
            aria-describedby="application-email-error"
            @input="clearApplicationError('email')"
          />
          <small v-if="applicationErrors.email" id="application-email-error" class="application-error">{{ applicationErrors.email }}</small>
        </label>

        <label class="application-field">
          <span>Phone</span>
          <input
            v-model.trim="applicationForm.phone"
            type="tel"
            autocomplete="tel"
            :aria-invalid="Boolean(applicationErrors.phone)"
            aria-describedby="application-phone-error"
            @input="clearApplicationError('phone')"
          />
          <small v-if="applicationErrors.phone" id="application-phone-error" class="application-error">{{ applicationErrors.phone }}</small>
        </label>

        <label class="application-field">
          <span>Experience (years, minimum 1)</span>
          <input
            v-model="applicationForm.experience"
            type="number"
            min="1"
            step="0.5"
            :aria-invalid="Boolean(applicationErrors.experience)"
            aria-describedby="application-experience-error"
            @input="clearApplicationError('experience')"
          />
          <small v-if="applicationErrors.experience" id="application-experience-error" class="application-error">{{ applicationErrors.experience }}</small>
        </label>

        <label class="application-field">
          <span>Expected salary</span>
          <input
            v-model="applicationForm.expectedSalary"
            type="number"
            min="0.01"
            step="0.01"
            :aria-invalid="Boolean(applicationErrors.expectedSalary)"
            aria-describedby="application-salary-error"
            @input="clearApplicationError('expectedSalary')"
          />
          <small v-if="applicationErrors.expectedSalary" id="application-salary-error" class="application-error">{{ applicationErrors.expectedSalary }}</small>
        </label>

        <label class="application-field">
          <span>Resume</span>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            :aria-invalid="Boolean(applicationErrors.resume)"
            aria-describedby="application-resume-error"
            @change="setApplicationResume"
          />
          <small v-if="applicationErrors.resume" id="application-resume-error" class="application-error">{{ applicationErrors.resume }}</small>
        </label>

        <fieldset
          class="application-skills"
          :aria-invalid="Boolean(applicationErrors.skills)"
          aria-describedby="application-skills-error"
        >
          <legend>Skills (select at least 2)</legend>
          <div class="application-skill-options">
            <label v-for="skill in applicationSkillOptions" :key="skill">
              <input
                v-model="applicationForm.skills"
                type="checkbox"
                :value="skill"
                @change="clearApplicationError('skills')"
              />
              {{ skill }}
            </label>
          </div>
          <small
            v-if="applicationErrors.skills"
            id="application-skills-error"
            class="application-error"
            role="alert"
          >{{ applicationErrors.skills }}</small>
        </fieldset>
      </div>

      <div class="application-actions">
        <button type="submit" class="application-submit">Submit application</button>
        <p v-if="applicationMessage" class="application-success" role="status">{{ applicationMessage }}</p>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  name: "JobApplicationForm",

  data() {
    return {
      applicationForm: {
        name: "",
        email: "",
        phone: "",
        experience: "",
        expectedSalary: "",
        resume: null,
        skills: []
      },
      applicationErrors: {},
      applicationMessage: "",
      applicationSkillOptions: ["JavaScript", "Vue.js", "React", "Node.js", "SQL", "Communication"]
    };
  },

  methods: {
    clearApplicationError(field) {
      if (this.applicationErrors[field]) {
        this.applicationErrors = { ...this.applicationErrors, [field]: "" };
      }
      this.applicationMessage = "";
    },

    setApplicationResume(event) {
      this.applicationForm.resume = event.target.files[0] || null;
      this.clearApplicationError("resume");
    },

    submitApplication() {
      const phoneDigits = this.applicationForm.phone.replace(/\D/g, "");
      const experience = Number(this.applicationForm.experience);
      const expectedSalary = Number(this.applicationForm.expectedSalary);
      const errors = {
        name: this.applicationForm.name ? "" : "Name is required.",
        email: !this.applicationForm.email
          ? "Email is required."
          : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.applicationForm.email) ? "" : "Enter a valid email address.",
        phone: !this.applicationForm.phone
          ? "Phone is required."
          : /^\+?[\d\s().-]+$/.test(this.applicationForm.phone) && phoneDigits.length >= 7 && phoneDigits.length <= 15
            ? ""
            : "Enter a valid phone number with 7 to 15 digits.",
        experience: this.applicationForm.experience === ""
          ? "Experience is required."
          : Number.isFinite(experience) && experience >= 1 ? "" : "Minimum experience is 1 year.",
        expectedSalary: this.applicationForm.expectedSalary === ""
          ? "Expected salary is required."
          : Number.isFinite(expectedSalary) && expectedSalary > 0 ? "" : "Expected salary must be greater than 0.",
        resume: this.applicationForm.resume ? "" : "Please attach your resume.",
        skills: this.applicationForm.skills.length >= 2 ? "" : "Select at least 2 skills."
      };

      this.applicationErrors = errors;
      this.applicationMessage = "";

      if (Object.values(errors).some(Boolean)) {
        return;
      }

      this.applicationMessage = "Application submitted successfully.";
    }
  }
};
</script>

<style scoped>
.application-page {
  max-width: 760px;
  margin: 0 auto;
}

.application-heading {
  margin-bottom: 24px;
}

.application-heading h1 {
  color: #25342c;
}

.application-form {
  padding: 28px;
  border: 1px solid #dce2d9;
  border-radius: 6px;
  background: #fff;
}

.application-fields {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px 24px;
}

.application-field {
  display: grid;
  align-content: start;
  gap: 7px;
  color: #536158;
  font-size: 12px;
  font-weight: 600;
}

.application-field input {
  width: 100%;
  min-height: 42px;
  padding: 9px 11px;
  border: 1px solid #dce3dc;
  border-radius: 5px;
  color: #29342d;
  background: #fff;
  font: inherit;
  font-size: 14px;
}

.application-field input[type="file"] {
  padding: 8px;
}

.application-field input:focus-visible,
.application-skills input:focus-visible {
  outline: 2px solid #c36a4c;
  outline-offset: 2px;
}

.application-field input[aria-invalid="true"] {
  border-color: #b94b42;
}

.application-error {
  color: #a63832;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.4;
}

.application-skills {
  grid-column: 1 / -1;
  display: grid;
  gap: 12px;
  margin: 0;
  padding: 0;
  border: 0;
  color: #536158;
  font-size: 12px;
  font-weight: 600;
}

.application-skill-options {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.application-skill-options label {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #29342d;
  font-size: 13px;
  font-weight: 400;
}

.application-skill-options input {
  width: 16px;
  height: 16px;
  accent-color: #32634f;
}

.application-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 26px;
}

.application-submit {
  min-height: 42px;
  padding: 0 18px;
  border: 0;
  border-radius: 5px;
  color: #fff;
  background: #32634f;
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}

.application-submit:hover {
  background: #295440;
}

.application-success {
  margin: 0;
  color: #32634f;
  font-size: 13px;
}

@media (max-width: 600px) {
  .application-form {
    padding: 20px;
  }

  .application-fields {
    grid-template-columns: 1fr;
    gap: 18px;
  }

  .application-skills {
    grid-column: auto;
  }

  .application-skill-options {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>