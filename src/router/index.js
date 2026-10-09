import { createRouter, createWebHistory } from "vue-router";
import { currentUser, ROLES } from "../auth/session.js";

const allRoles = [ROLES.ADMIN, ROLES.HR, ROLES.EMPLOYEE];
const managementRoles = [ROLES.ADMIN, ROLES.HR];

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/dashboard" },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginPage.vue"),
      meta: { guestOnly: true }
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../views/DashboardPage.vue"),
      meta: { requiresAuth: true, roles: allRoles }
    },
    {
      path: "/employees",
      component: () => import("../views/EmployeesLayout.vue"),
      meta: { requiresAuth: true, roles: managementRoles },
      children: [
        {
          path: "",
          name: "employees",
          component: () => import("../views/EmployeeListPage.vue")
        },
        {
          path: ":id(\\d+)",
          name: "employee-detail",
          component: () => import("../views/EmployeeDetailPage.vue"),
          props: true,
          meta: { roles: allRoles, ownerOnly: true }
        }
      ]
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("../views/ProfilePage.vue"),
      meta: { requiresAuth: true, roles: allRoles }
    },
    {
      path: "/settings",
      name: "settings",
      component: () => import("../views/SettingsPage.vue"),
      meta: { requiresAuth: true, roles: [ROLES.ADMIN] }
    },
    {
      path: "/workspace",
      name: "workspace",
      component: () => import("../../App.vue"),
      meta: { requiresAuth: true, roles: [ROLES.ADMIN] }
    },
    {
      path: "/forbidden",
      name: "forbidden",
      component: () => import("../views/ForbiddenPage.vue")
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("../views/NotFoundPage.vue")
    }
  ]
});

router.beforeEach((to) => {
  if (to.meta.guestOnly && currentUser.value) {
    return { name: "dashboard" };
  }

  if (to.meta.requiresAuth && !currentUser.value) {
    return {
      name: "login",
      query: { redirect: to.fullPath }
    };
  }

  if (to.meta.roles && !to.meta.roles.includes(currentUser.value?.role)) {
    return { name: "forbidden" };
  }

  if (
    to.meta.ownerOnly &&
    currentUser.value?.role === ROLES.EMPLOYEE &&
    String(currentUser.value.employeeId) !== String(to.params.id)
  ) {
    return { name: "forbidden" };
  }

  return true;
});

export default router;