import { ref } from "vue";

export const ROLES = Object.freeze({
  ADMIN: "ADMIN",
  HR: "HR",
  EMPLOYEE: "EMPLOYEE"
});

const storageKey = "employee-portal-session";
const demoAccounts = {
  [ROLES.ADMIN]: { name: "Renjith", employeeId: 1 },
  [ROLES.HR]: { name: "Abeesh", employeeId: 2 },
  [ROLES.EMPLOYEE]: { name: "Aneesh", employeeId: 3 }
};

function readSession() {
  try {
    const storedSession = JSON.parse(localStorage.getItem(storageKey));
    if (storedSession && demoAccounts[storedSession.role]) {
      return { ...demoAccounts[storedSession.role], role: storedSession.role };
    }
  } catch {
    localStorage.removeItem(storageKey);
  }

  return null;
}

export const currentUser = ref(readSession());

export function signInAs(role) {
  const account = demoAccounts[role];
  if (!account) {
    return false;
  }

  currentUser.value = { ...account, role };
  localStorage.setItem(storageKey, JSON.stringify({ role }));
  return true;
}

export function signOut() {
  currentUser.value = null;
  localStorage.removeItem(storageKey);
}