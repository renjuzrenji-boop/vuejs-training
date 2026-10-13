<template>
  <section class="api-employees" aria-labelledby="api-employees-title">
    <header class="api-heading">
      <div>
        <p class="eyebrow">JSON SERVER · REST API</p>
        <h1 id="api-employees-title">Employee API</h1>
        <p class="page-description">Create, inspect, update, and remove employee records.</p>
      </div>
      <button type="button" class="api-refresh" :disabled="loading" @click="loadEmployees">
        {{ loading ? "Refreshing..." : "Refresh list" }}
      </button>
    </header>

    <p v-if="successMessage" class="api-success" role="status">{{ successMessage }}</p>
    <p v-if="error" class="api-error" role="alert">{{ error }}</p>

    <div class="api-layout">
      <section class="api-list-panel" aria-labelledby="api-list-title">
        <div class="api-section-heading">
          <h2 id="api-list-title">Employees</h2>
          <span>{{ employees.length }} records</span>
        </div>

        <p v-if="loading" class="api-empty" role="status">Loading employees...</p>
        <div v-else class="api-table-wrap">
          <DataTable
            :columns="columns"
            :data="employees"
            empty-message="No API employee records yet. Add one to get started."
            @row-click="loadEmployeeDetails"
            @edit="editEmployee"
            @delete="requestDelete"
          />
        </div>

        <div v-if="pendingDelete" class="api-delete-confirm" role="group" aria-label="Confirm employee deletion">
          <p>Delete <strong>{{ pendingDelete.name }}</strong>? This cannot be undone.</p>
          <div class="api-actions">
            <button type="button" class="api-secondary" @click="pendingDelete = null">Cancel</button>
            <button type="button" class="api-danger" :disabled="isDeleting" @click="deleteEmployee">
              {{ isDeleting ? "Deleting..." : "Delete" }}
            </button>
          </div>
        </div>

        <article v-if="selectedEmployee" class="api-detail" aria-labelledby="api-detail-title">
          <div class="api-section-heading">
            <h2 id="api-detail-title">Record detail</h2>
            <span v-if="isLoadingDetail">Loading...</span>
          </div>
          <dl>
            <div><dt>Name</dt><dd>{{ selectedEmployee.name }}</dd></div>
            <div><dt>Email</dt><dd>{{ selectedEmployee.email }}</dd></div>
            <div><dt>Department</dt><dd>{{ selectedEmployee.department }}</dd></div>
            <div><dt>Experience</dt><dd>{{ selectedEmployee.experience }} years</dd></div>
            <div><dt>Status</dt><dd>{{ selectedEmployee.status }}</dd></div>
          </dl>
          <button
            type="button"
            class="api-secondary"
            :disabled="isPatching || isLoadingDetail"
            @click="toggleEmployeeStatus"
          >
            {{ isPatching ? "Updating..." : `PATCH status to ${selectedEmployee.status === 'Active' ? 'Inactive' : 'Active'}` }}
          </button>
        </article>
      </section>

      <form class="api-form" @submit.prevent="saveEmployee">
        <h2>{{ formMode === "create" ? "Add employee" : "Edit employee" }}</h2>
        <label>
          <span>Name</span>
          <input v-model.trim="form.name" type="text" required maxlength="80" />
        </label>
        <label>
          <span>Email</span>
          <input v-model.trim="form.email" type="email" required />
        </label>
        <label>
          <span>Phone</span>
          <input v-model.trim="form.phone" type="tel" required />
        </label>
        <div class="api-form-row">
          <label>
            <span>Department</span>
            <input v-model.trim="form.department" type="text" required />
          </label>
          <label>
            <span>Designation</span>
            <input v-model.trim="form.designation" type="text" required />
          </label>
        </div>
        <div class="api-form-row">
          <label>
            <span>Experience (years)</span>
            <input v-model.number="form.experience" type="number" min="0" step="0.5" required />
          </label>
          <label>
            <span>Status</span>
            <select v-model="form.status" required>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </label>
        </div>
        <label>
          <span>Skills (comma-separated)</span>
          <input v-model.trim="form.skills" type="text" placeholder="Vue.js, REST APIs" />
        </label>
        <div class="api-actions">
          <button type="submit" class="api-submit" :disabled="isSaving">
            {{ isSaving ? "Saving..." : formMode === "create" ? "Add" : "Update" }}
          </button>
          <button v-if="formMode === 'edit'" type="button" class="api-secondary" :disabled="isSaving" @click="resetForm">
            Cancel edit
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import DataTable from "./DataTable.vue";
import { useEmployee } from "../composables/useEmployee.js";

const {
  employees,
  loading,
  error,
  fetchEmployees,
  fetchEmployee,
  addEmployee,
  updateEmployee,
  patchEmployee,
  deleteEmployee: removeEmployee
} = useEmployee();
const selectedEmployee = ref(null);
const pendingDelete = ref(null);
const isLoadingDetail = ref(false);
const isSaving = ref(false);
const isDeleting = ref(false);
const isPatching = ref(false);
const requestError = ref("");
const successMessage = ref("");
const formMode = ref("create");

const columns = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "department", label: "Department" },
  { key: "status", label: "Status" }
];

const emptyForm = () => ({
  name: "",
  email: "",
  phone: "",
  department: "",
  designation: "",
  experience: 0,
  status: "Active",
  skills: ""
});

const form = reactive(emptyForm());

async function loadEmployees() {
  try {
    await fetchEmployees();
  } catch {
    successMessage.value = "";
  }
}

async function loadEmployeeDetails(employee) {
  isLoadingDetail.value = true;

  try {
    selectedEmployee.value = await fetchEmployee(employee.id);
  } catch {
    successMessage.value = "";
  } finally {
    isLoadingDetail.value = false;
  }
}

async function editEmployee(employee) {
  await loadEmployeeDetails(employee);
  if (!selectedEmployee.value) {
    return;
  }

  Object.assign(form, {
    ...selectedEmployee.value,
    skills: (selectedEmployee.value.skills || []).join(", ")
  });
  formMode.value = "edit";
  successMessage.value = "";
}

function resetForm() {
  Object.assign(form, emptyForm());
  formMode.value = "create";
}

function requestDelete(employee) {
  pendingDelete.value = employee;
  requestError.value = "";
  successMessage.value = "";
}

function createPayload() {
  return {
    name: form.name,
    email: form.email,
    phone: form.phone,
    department: form.department,
    designation: form.designation,
    experience: Number(form.experience),
    status: form.status,
    skills: form.skills.split(",").map((skill) => skill.trim()).filter(Boolean)
  };
}

async function saveEmployee() {
  isSaving.value = true;
  successMessage.value = "";

  try {
    if (formMode.value === "create") {
      await addEmployee(createPayload());
      successMessage.value = "Employee created.";
    } else {
      const updatedEmployee = await updateEmployee(form.id, createPayload());
      if (String(selectedEmployee.value?.id) === String(updatedEmployee.id)) {
        selectedEmployee.value = updatedEmployee;
      }
      successMessage.value = "Employee updated.";
    }

    resetForm();
  } catch {
    successMessage.value = "";
  } finally {
    isSaving.value = false;
  }
}

async function toggleEmployeeStatus() {
  if (!selectedEmployee.value) {
    return;
  }

  isPatching.value = true;

  try {
    selectedEmployee.value = await patchEmployee(selectedEmployee.value.id, {
      status: selectedEmployee.value.status === "Active" ? "Inactive" : "Active"
    });
    successMessage.value = "Employee status updated.";
  } catch {
    successMessage.value = "";
  } finally {
    isPatching.value = false;
  }
}

async function deleteEmployee() {
  if (!pendingDelete.value) {
    return;
  }

  isDeleting.value = true;

  try {
    await removeEmployee(pendingDelete.value.id);
    if (String(selectedEmployee.value?.id) === String(pendingDelete.value.id)) {
      selectedEmployee.value = null;
    }
    successMessage.value = "Employee deleted.";
    pendingDelete.value = null;
  } catch {
    successMessage.value = "";
  } finally {
    isDeleting.value = false;
  }
}

onMounted(loadEmployees);
</script>

<style scoped>
.api-employees {
  display: grid;
  gap: 22px;
}

.api-heading,
.api-section-heading,
.api-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.api-heading {
  align-items: end;
}

.api-heading h1 {
  color: #25342c;
}

.api-refresh,
.api-submit,
.api-secondary,
.api-danger {
  min-height: 38px;
  padding: 0 12px;
  border: 1px solid #dce2d9;
  border-radius: 4px;
  color: #536158;
  background: #fff;
  font: inherit;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
}

.api-refresh:disabled,
.api-secondary:disabled,
.api-danger:disabled,
.api-submit:disabled {
  opacity: 0.6;
  cursor: wait;
}

.api-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(280px, 0.8fr);
  align-items: start;
  gap: 18px;
}

.api-list-panel,
.api-form {
  min-width: 0;
  padding: 20px;
  border: 1px solid #e1e5de;
  border-radius: 6px;
  background: #fff;
}

.api-section-heading {
  margin-bottom: 14px;
}

.api-section-heading h2,
.api-form h2 {
  margin: 0;
  color: #25342c;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 21px;
  font-weight: 400;
}

.api-section-heading span {
  color: #78827a;
  font-size: 11px;
}

.api-table-wrap {
  overflow-x: auto;
}

.api-empty {
  margin: 0;
  padding: 18px 0;
  color: #78827a;
  font-size: 12px;
}

.api-form {
  display: grid;
  gap: 13px;
}

.api-form label {
  display: grid;
  min-width: 0;
  gap: 6px;
  color: #707b73;
  font-size: 11px;
}

.api-form input,
.api-form select {
  width: 100%;
  min-width: 0;
  height: 38px;
  padding: 0 10px;
  border: 1px solid #dce3dc;
  border-radius: 4px;
  color: #29342d;
  background: #fff;
  font: inherit;
  font-size: 12px;
}

.api-form input:focus-visible,
.api-form select:focus-visible,
.api-refresh:focus-visible,
.api-secondary:focus-visible,
.api-danger:focus-visible,
.api-submit:focus-visible {
  outline: 2px solid #c36a4c;
  outline-offset: 2px;
}

.api-form-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.api-actions {
  justify-content: flex-start;
  flex-wrap: wrap;
}

.api-submit {
  border-color: #32634f;
  color: #fff;
  background: #32634f;
}

.api-submit:hover {
  background: #295440;
}

.api-danger {
  border-color: #a54734;
  color: #fff;
  background: #a54734;
}

.api-delete-confirm {
  margin-top: 16px;
  padding: 14px;
  border: 1px solid #efd6ce;
  border-radius: 4px;
  background: #fff8f5;
}

.api-delete-confirm p {
  margin: 0 0 12px;
  color: #536158;
  font-size: 12px;
}

.api-detail {
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid #e5e9e3;
}

.api-detail dl {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin: 0 0 16px;
}

.api-detail dt {
  margin-bottom: 4px;
  color: #78827a;
  font-size: 10px;
}

.api-detail dd {
  margin: 0;
  overflow-wrap: anywhere;
  color: #29342d;
  font-size: 12px;
}

.api-success,
.api-error {
  margin: 0;
  padding: 10px 12px;
  border-radius: 4px;
  font-size: 12px;
}

.api-success {
  color: #32634f;
  background: #eef5ef;
}

.api-error {
  color: #a54734;
  background: #fff1ec;
}

@media (max-width: 760px) {
  .api-layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 520px) {
  .api-heading {
    align-items: start;
    flex-direction: column;
  }

  .api-list-panel,
  .api-form {
    padding: 15px;
  }
}
</style>