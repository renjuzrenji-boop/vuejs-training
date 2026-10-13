import { ref } from "vue";

export function useEmployee() {
  const employees = ref([]);
  const loading = ref(false);
  const error = ref("");

  async function request(url, options = {}) {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...(options.body ? { "Content-Type": "application/json" } : {}),
        ...options.headers
      }
    });

    if (!response.ok) {
      const responseBody = await response.json().catch(() => null);
      throw new Error(responseBody?.message || `Request failed (${response.status}).`);
    }

    return response.status === 204 ? null : response.json();
  }

  async function execute(action) {
    error.value = "";

    try {
      return await action();
    } catch (requestError) {
      error.value = requestError instanceof Error
        ? requestError.message
        : "The request failed. Please try again.";
      throw requestError;
    }
  }

  async function fetchEmployees() {
    loading.value = true;

    try {
      employees.value = await execute(() => request("/api/employees"));
      return employees.value;
    } finally {
      loading.value = false;
    }
  }

  function fetchEmployee(employeeId) {
    return execute(() => request(`/api/employees/${employeeId}`));
  }

  function addEmployee(employee) {
    return execute(async () => {
      const createdEmployee = await request("/api/employees", {
        method: "POST",
        body: JSON.stringify(employee)
      });
      employees.value = [...employees.value, createdEmployee];
      return createdEmployee;
    });
  }

  function updateEmployee(employeeId, employee) {
    return execute(async () => {
      const updatedEmployee = await request(`/api/employees/${employeeId}`, {
        method: "PUT",
        body: JSON.stringify(employee)
      });
      employees.value = employees.value.map((record) =>
        String(record.id) === String(employeeId) ? updatedEmployee : record
      );
      return updatedEmployee;
    });
  }

  function patchEmployee(employeeId, changes) {
    return execute(async () => {
      const updatedEmployee = await request(`/api/employees/${employeeId}`, {
        method: "PATCH",
        body: JSON.stringify(changes)
      });
      employees.value = employees.value.map((record) =>
        String(record.id) === String(employeeId) ? updatedEmployee : record
      );
      return updatedEmployee;
    });
  }

  function deleteEmployee(employeeId) {
    return execute(async () => {
      await request(`/api/employees/${employeeId}`, { method: "DELETE" });
      employees.value = employees.value.filter((record) =>
        String(record.id) !== String(employeeId)
      );
      return employeeId;
    });
  }

  return {
    employees,
    loading,
    error,
    fetchEmployees,
    fetchEmployee,
    addEmployee,
    updateEmployee,
    patchEmployee,
    deleteEmployee
  };
}