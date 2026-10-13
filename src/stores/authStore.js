import { defineStore } from "pinia";

export const ROLES = Object.freeze({
  ADMIN: "ADMIN",
  HR: "HR",
  EMPLOYEE: "EMPLOYEE"
});

const storageKey = "employee-portal-auth";
const demoAccounts = {
  [ROLES.ADMIN]: { name: "Renjith", employeeId: 1 },
  [ROLES.HR]: { name: "Abeesh", employeeId: 2 },
  [ROLES.EMPLOYEE]: { name: "Aneesh", employeeId: 3 }
};

function readPersistedAuth() {
  try {
    const savedState = JSON.parse(localStorage.getItem(storageKey));
    if (
      savedState?.token &&
      savedState?.user &&
      Object.values(ROLES).includes(savedState.role)
    ) {
      return savedState;
    }
  } catch {
    localStorage.removeItem(storageKey);
  }

  return { user: null, token: null, role: null };
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    ...readPersistedAuth(),
    hasFetchedUser: false,
    isLoading: false,
    error: ""
  }),

  getters: {
    isAuthenticated: (state) => Boolean(state.token && state.user),
    isAdmin: (state) => state.role === ROLES.ADMIN
  },

  actions: {
    persist() {
      if (!this.token || !this.user || !this.role) {
        localStorage.removeItem(storageKey);
        return;
      }

      localStorage.setItem(storageKey, JSON.stringify({
        user: this.user,
        token: this.token,
        role: this.role
      }));
    },

    async login(role) {
      const account = demoAccounts[role];
      if (!account) {
        throw new Error("Choose a valid portal role.");
      }

      this.isLoading = true;
      this.error = "";
      this.role = role;
      this.token = `demo-${role.toLowerCase()}-${Date.now()}`;
      this.user = { ...account, role };
      this.hasFetchedUser = false;
      this.persist();

      try {
        await this.fetchUser();
        return this.user;
      } catch (error) {
        this.error = error instanceof Error ? error.message : "Unable to sign in.";
        this.logout();
        this.error = error instanceof Error ? error.message : "Unable to sign in.";
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    async fetchUser() {
      if (!this.token || !this.user?.employeeId) {
        this.hasFetchedUser = true;
        return null;
      }

      this.isLoading = true;
      this.error = "";

      try {
        const response = await fetch(`/api/employees/${this.user.employeeId}`, {
          headers: { Authorization: `Bearer ${this.token}` }
        });
        if (!response.ok) {
          throw new Error(`Unable to fetch your profile (${response.status}).`);
        }

        const employee = await response.json();
        this.user = {
          ...employee,
          employeeId: Number(employee.id),
          role: this.role
        };
        this.hasFetchedUser = true;
        this.persist();
        return this.user;
      } catch (error) {
        this.error = error instanceof Error ? error.message : "Unable to fetch your profile.";
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    logout() {
      this.user = null;
      this.token = null;
      this.role = null;
      this.hasFetchedUser = false;
      this.error = "";
      localStorage.removeItem(storageKey);
    }
  }
});