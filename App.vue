<template>
  <div class="workspace">
    <header class="topbar">
      <a class="brand" href="#" aria-label="Everyday shop home">
        <span class="brand-mark">S</span>
        <span>Small Hours<span class="brand-divider"> / Shop</span></span>
      </a>
    </header>

    <main class="content shopping-page">
      <div class="view-switch" role="group" aria-label="Choose a section">
        <button
          type="button"
          :aria-pressed="activeTab === 'shop'"
          :class="{ 'is-current': activeTab === 'shop' }"
          @click="showTab('shop')"
        >
          Shopping Cart
        </button>
        <button
          type="button"
          :aria-pressed="activeTab === 'employees'"
          :class="{ 'is-current': activeTab === 'employees' }"
          @click="showTab('employees')"
        >
          Employees
        </button>
        <button
          type="button"
          :aria-pressed="activeTab === 'expenses'"
          :class="{ 'is-current': activeTab === 'expenses' }"
          @click="showTab('expenses')"
        >
          Expenses
        </button>
        <button
          type="button"
          :aria-pressed="activeTab === 'salary'"
          :class="{ 'is-current': activeTab === 'salary' }"
          @click="showTab('salary')"
        >
          Salary Calculator
        </button>
        <button
          type="button"
          :aria-pressed="activeTab === 'application'"
          :class="{ 'is-current': activeTab === 'application' }"
          @click="showTab('application')"
        >
          Job Application
        </button>
        <button
          type="button"
          :aria-pressed="activeTab === 'api-employees'"
          :class="{ 'is-current': activeTab === 'api-employees' }"
          @click="showTab('api-employees')"
        >
          API Employees
        </button>
        <button
          type="button"
          :aria-pressed="activeTab === 'pinia-cart'"
          :class="{ 'is-current': activeTab === 'pinia-cart' }"
          @click="showTab('pinia-cart')"
        >
          Pinia Cart
        </button>
        <button
          type="button"
          :aria-pressed="activeTab === 'task-manager'"
          :class="{ 'is-current': activeTab === 'task-manager' }"
          @click="showTab('task-manager')"
        >
          Task Manager
        </button>
      </div>

      <template v-if="activeTab === 'shop'">
      <section id="shop" class="page-heading shopping-heading" aria-labelledby="page-title">
        <div>
          <h2 id="employee-directory-title">THE EVERYDAY SHOP</h2>
        </div>
        <div class="store-summary" aria-live="polite">
          <span>IN YOUR CART</span>
          <strong>{{ getCartQuantity() }}</strong>
        </div>
      </section>

      <div class="shop-layout">
        <section class="product-section" aria-labelledby="catalog-title">
          <div class="section-heading">
            <div>
              <h2 id="catalog-title">The collection</h2>
              <p>{{ getVisibleProducts().length }} items</p>
            </div>
            <label class="product-search">
              <span class="visually-hidden">Search products</span>
              <input
                v-model.trim="searchQuery"
                type="search"
                placeholder="Search the collection"
                aria-label="Search products"
                @keyup.enter="addFirstSearchResult($event)"
                @keyup.esc="clearSearch"
              />
            </label>
          </div>

          <div v-if="getVisibleProducts().length" class="product-grid">
            <article v-for="product in getVisibleProducts()" :key="product.id" class="product-card">
              <img class="product-image" :src="product.image" :alt="product.name" loading="lazy" />
              <div class="product-info">
                <p class="product-category">{{ product.category }}</p>
                <h3>{{ product.name }}</h3>
                <p class="product-description">{{ product.description }}</p>
                <div class="product-action">
                  <strong>{{ formatPrice(product.price) }}</strong>
                  <button type="button" class="add-button" @click="addToCart(product)">
                    <span aria-hidden="true">+</span> Add
                  </button>
                </div>
              </div>
            </article>
          </div>
          <p v-else class="empty-products">No products match that search.</p>
        </section>

        <aside class="cart-panel" aria-labelledby="cart-title">
          <header class="cart-heading">
            <div>
              <p class="eyebrow">YOUR SELECTION</p>
              <h2 id="cart-title">Shopping cart</h2>
            </div>
            <span class="cart-count">{{ getCartQuantity() }}</span>
          </header>

          <p v-if="orderMessage" class="order-message" role="status">{{ orderMessage }}</p>
          <p v-if="cartItems.length === 0" class="empty-cart">Your cart is empty. Find something you love.</p>

          <ul v-else class="cart-list">
            <li v-for="item in cartItems" :key="item.id" class="cart-item">
              <div class="cart-item-heading">
                <div>
                  <h3>{{ item.name }}</h3>
                  <p>{{ formatPrice(item.price) }} each</p>
                </div>
                <button
                  type="button"
                  class="remove-button"
                  :aria-label="`Remove ${item.name} from cart`"
                  @click="removeFromCart(item.id)"
                >
                  Remove
                </button>
              </div>
              <div class="cart-item-bottom">
                <div class="quantity-control" :aria-label="`Quantity for ${item.name}`">
                  <button
                    type="button"
                    :aria-label="`Decrease ${item.name} quantity`"
                    :disabled="item.quantity === 1"
                    @click="changeQuantity(item.id, -1)"
                  >
                    <span aria-hidden="true">−</span>
                  </button>
                  <span aria-live="polite">{{ item.quantity }}</span>
                  <button
                    type="button"
                    :aria-label="`Increase ${item.name} quantity`"
                    @click="changeQuantity(item.id, 1)"
                  >
                    <span aria-hidden="true">+</span>
                  </button>
                </div>
                <strong>{{ formatPrice(item.price * item.quantity) }}</strong>
              </div>
            </li>
          </ul>

          <footer class="cart-footer">
            <div class="total-row">
              <span>Total</span>
              <strong>{{ formatPrice(getCartTotal()) }}</strong>
            </div>
            <form @submit.prevent="checkout">
              <button type="submit" class="checkout-button" :disabled="cartItems.length === 0">
                Place order <span aria-hidden="true">→</span>
              </button>
            </form>
            <p class="shipping-note">Shipping calculated at checkout</p>
          </footer>
        </aside>
      </div>
      </template>

      <section v-else-if="activeTab === 'employees'" id="employee-directory" class="employee-directory" aria-labelledby="employee-directory-title">
        <div class="directory-header">
          <div>
            <h2 id="employee-directory-title">Employee directory</h2>
            <p class="page-description">Search by name or filter by department.</p>
          </div>
          <div class="directory-tools">
            <label class="employee-search-input">
              <span class="visually-hidden">Search employees by name</span>
              <input
                v-model.trim="employeeSearchKeyword"
                type="search"
                placeholder="Search by name"
                aria-label="Search employees by name"
              />
            </label>
            <p class="record-label">{{ filteredEmployees.length }} EMPLOYEES</p>
            <label class="department-filter">
              <span>Department</span>
              <select v-model="departmentFilter" aria-label="Filter employees by department">
                <option value="all">All departments</option>
                <option v-for="department in departments" :key="department" :value="department">
                  {{ department }}
                </option>
              </select>
            </label>
          </div>
        </div>
        <EmployeeList
          v-if="filteredEmployees.length"
          :employees="filteredEmployees"
        />
        <p v-else class="employee-search-message">No employees match the current filters.</p>
      </section>

      <section v-else-if="activeTab === 'expenses'" id="expense-tracker" class="expense-tracker" aria-labelledby="expense-title">
        <header class="expense-heading">
          <div>
            <h1 id="expense-title">Expense tracker</h1>
          </div>
          <div class="expense-total">
            <span>Total expenses</span>
            <strong>{{ formatPrice(getTotalExpenses()) }}</strong>
          </div>
        </header>

        <div class="expense-layout">
          <section class="expense-history" aria-labelledby="expense-list-title">
            <div class="expense-section-heading">
              <h2 id="expense-list-title">Expenses</h2>
              <span>{{ expenses.length }} records</span>
            </div>
            <ul v-if="expenses.length" class="expense-list">
              <li v-for="expense in expenses" :key="expense.id" class="expense-row">
                <div class="expense-description">
                  <strong>{{ expense.title }}</strong>
                  <span>{{ expense.category }} · {{ formatExpenseDate(expense.date) }}</span>
                </div>
                <strong class="expense-amount">{{ formatPrice(expense.amount) }}</strong>
                <button
                  type="button"
                  class="expense-delete"
                  :aria-label="`Delete ${expense.title}`"
                  @click="deleteExpense(expense.id)"
                >
                  Remove
                </button>
              </li>
            </ul>
            <p v-else class="expense-empty">No expenses yet. Add one to start tracking.</p>
          </section>

          <div class="expense-side">
            <form class="expense-form-panel" @submit.prevent="addExpense">
              <h2>Add expense</h2>
              <label>
                <span>Title</span>
                <input v-model.trim="expenseForm.title" type="text" required maxlength="80" />
              </label>
              <label>
                <span>Category</span>
                <select v-model="expenseForm.category" required>
                  <option v-for="category in expenseCategories" :key="category" :value="category">
                    {{ category }}
                  </option>
                </select>
              </label>
              <label>
                <span>Amount</span>
                <input
                  v-model.number="expenseForm.amount"
                  type="number"
                  min="0.01"
                  step="0.01"
                  required
                />
              </label>
              <label>
                <span>Date</span>
                <input v-model="expenseForm.date" type="date" required />
              </label>
              <button type="submit" class="expense-submit">Add expense</button>
            </form>

            <section class="category-panel" aria-labelledby="category-totals-title">
              <div class="expense-section-heading">
                <h2 id="category-totals-title">By category</h2>
              </div>
              <ul v-if="getCategoryTotals().length" class="category-list">
                <li v-for="categoryTotal in getCategoryTotals()" :key="categoryTotal.category">
                  <span>{{ categoryTotal.category }}</span>
                  <strong>{{ formatPrice(categoryTotal.amount) }}</strong>
                </li>
              </ul>
              <p v-else class="expense-empty">Category totals will appear here.</p>
            </section>
          </div>
        </div>
      </section>

      <template v-else-if="activeTab === 'salary'">
      <section id="salary-calculator" class="salary-calculator" aria-labelledby="salary-title">
        <header class="salary-heading">
          <div>
            <h1 id="salary-title">Employee salary calculator</h1>
           
          </div>
          <label class="salary-filter">
            <span>Filter by net salary</span>
            <select v-model="salaryFilter">
              <option v-for="option in salaryFilterOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </label>
        </header>

        <div class="salary-summary" aria-live="polite">
          <article class="salary-summary-item">
            <span>Highest net salary</span>
            <strong>{{ highestSalary ? formatPrice(highestSalary.netSalary) : formatPrice(0) }}</strong>
            <small>{{ highestSalary ? highestSalary.name : "No matching employees" }}</small>
          </article>
          <article class="salary-summary-item">
            <span>Average net salary</span>
            <strong>{{ formatPrice(averageSalary) }}</strong>
            <small>{{ filteredSalaryRecords.length }} employees in this view</small>
          </article>
        </div>

        <div v-if="filteredSalaryRecords.length" class="salary-table-wrap">
          <table class="salary-table">
            <thead>
              <tr>
                <th scope="col">Employee</th>
                <th scope="col">Basic salary</th>
                <th scope="col">HRA</th>
                <th scope="col">DA</th>
                <th scope="col">Bonus</th>
                <th scope="col">Tax rate</th>
                <th scope="col">Gross salary</th>
                <th scope="col">Tax amount</th>
                <th scope="col">Net salary</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="employee in filteredSalaryRecords" :key="employee.id">
                <th scope="row">{{ employee.name }}</th>
                <td>{{ formatPrice(employee.basicSalary) }}</td>
                <td>{{ formatPrice(employee.hra) }}</td>
                <td>{{ formatPrice(employee.da) }}</td>
                <td>{{ formatPrice(employee.bonus) }}</td>
                <td>{{ employee.taxRate }}%</td>
                <td>{{ formatPrice(employee.grossSalary) }}</td>
                <td>{{ formatPrice(employee.taxAmount) }}</td>
                <td class="net-salary-cell">{{ formatPrice(employee.netSalary) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p v-else class="salary-empty">No employees match this salary range.</p>
      </section>

      <section id="employee-data-table" class="employee-data-table mt-4" aria-labelledby="data-table-title">
        <header class="salary-heading mb-4">
          <div>
            <h1 id="data-table-title" class="mb-2">Employee data table</h1>
            <p class="page-description mb-2">Select a row or use its actions to manage employees.</p>
          </div>
          <div class="ml-auto flex items-center gap-4">
            <span class="record-label">{{ employees.length }} EMPLOYEES</span>
            <button
              type="button"
              class="inline-flex h-10 items-center justify-center rounded bg-[#32634f] px-4 text-sm font-semibold text-white hover:bg-[#295440]"
              @click="openAddEmployeeModal"
            >
              Add employee
            </button>
          </div>
        </header>

        <p v-if="tableMessage" class="employee-table-message text-red-500" role="status">{{ tableMessage }}</p>

        <p v-if="selectedEmployee" class="selected-employee mb-2 text-green-500">
          Selected: <strong>{{ selectedEmployee.name }}</strong>
          <span>{{ selectedEmployee.designation }} · {{ selectedEmployee.department }}</span>
        </p>

        <DataTable
          :columns="employeeTableColumns"
          :data="employees"
          empty-message="No employees to display."
          @edit="handleEmployeeEdit"
          @delete="handleEmployeeDelete"
          @row-click="handleEmployeeRowClick"
        />
      </section>

      <Modal
        v-model="employeeModalOpen"
        @confirm="handleEmployeeModalConfirm"
        @cancel="cancelEmployeeModal"
      >
        <template #header>
          <h2 class="m-0 text-lg font-semibold text-[#25342c]">
            {{ employeeModalMode === "delete" ? "Delete employee" : employeeModalMode === "edit" ? "Edit employee" : "Add employee" }}
          </h2>
        </template>

        <p v-if="employeeModalMode === 'delete'" class="m-0 text-sm leading-6 text-[#68736b]">
          Delete {{ employeeToDelete?.name }}? This action cannot be undone.
        </p>
        <EmployeeForm
          v-else
          v-model="employeeForm"
          :gender-options="genderOptions"
          :skill-options="skillOptions"
          @submit="handleEmployeeFormSubmit"
        />

        <template #footer="{ confirm, cancel }">
          <div class="flex justify-end gap-2">
            <button
              v-if="employeeModalMode !== 'delete'"
              type="button"
              class="inline-flex h-10 min-w-24 items-center justify-center rounded border border-[#dce3dc] px-4 text-sm font-medium text-[#536158] hover:bg-[#f7f8f6]"
              @click="resetEmployeeForm"
            >
              Reset
            </button>
            <button
              type="button"
              class="inline-flex h-10 min-w-24 items-center justify-center rounded border border-[#dce3dc] px-4 text-sm font-medium text-[#536158] hover:bg-[#f7f8f6]"
              @click="cancel"
            >
              Cancel
            </button>
            <button
              v-if="employeeModalMode === 'delete'"
              type="button"
              class="inline-flex h-10 min-w-24 items-center justify-center rounded bg-red-600 px-4 text-sm font-semibold text-white hover:bg-red-700"
              @click="confirm"
            >
              Delete
            </button>
            <button
              v-else
              type="submit"
              form="employee-registration"
              class="inline-flex h-10 min-w-24 items-center justify-center rounded bg-[#32634f] px-4 text-sm font-semibold text-white hover:bg-[#295440]"
            >
              {{ employeeModalMode === "edit" ? "Save changes" : "Submit" }}
            </button>
          </div>
        </template>
      </Modal>
      </template>

      <JobApplicationForm v-else-if="activeTab === 'application'" />
      <ApiEmployeeManager v-else-if="activeTab === 'api-employees'" />
      <PiniaCartDemo v-else-if="activeTab === 'pinia-cart'" />
      <TaskManager v-else-if="activeTab === 'task-manager'" />

    </main>
  </div>
</template>

<script>
import { computed, reactive, ref } from "vue";
import DataTable from "./src/components/DataTable.vue";
import EmployeeForm from "./src/components/EmployeeForm.vue";
import EmployeeList from "./src/components/EmployeeList.vue";
import JobApplicationForm from "./src/components/JobApplicationForm.vue";
import ApiEmployeeManager from "./src/components/ApiEmployeeManager.vue";
import PiniaCartDemo from "./src/components/PiniaCartDemo.vue";
import TaskManager from "./src/components/TaskManager.vue";
import Modal from "./src/components/Modal.vue";

export default {
  name: "App",

  components: {
    DataTable,
    EmployeeForm,
    EmployeeList,
    JobApplicationForm,
    ApiEmployeeManager,
    PiniaCartDemo,
    TaskManager,
    Modal
  },

  setup() {
    const today = new Date();
    const todayString = [
      today.getFullYear(),
      String(today.getMonth() + 1).padStart(2, "0"),
      String(today.getDate()).padStart(2, "0")
    ].join("-");
    const expenses = ref([]);
    const nextExpenseId = ref(1);
    const expenseForm = reactive({
      title: "",
      category: "Food",
      amount: "",
      date: todayString
    });
    const expenseCategories = ["Food", "Transport", "Housing", "Utilities", "Health", "Shopping", "Other"];
    const salaryEmployees = ref([
      { id: 1, name: "Renjith", basicSalary: 4800, hra: 1900, da: 450, bonus: 600, taxRate: 12 },
      { id: 2, name: "Abeesh", basicSalary: 3800, hra: 1400, da: 300, bonus: 400, taxRate: 10 },
      { id: 3, name: "Aneesh", basicSalary: 3200, hra: 1000, da: 250, bonus: 350, taxRate: 8 },
      { id: 4, name: "Akhil", basicSalary: 5400, hra: 2200, da: 650, bonus: 900, taxRate: 15 }
    ]);
    const salaryFilter = ref("all");
    const salaryFilterOptions = [
      { value: "all", label: "All" },
      { value: "under-5000", label: "Under $5,000" },
      { value: "5000-7499", label: "$5,000 to $7,499" },
      { value: "7500-plus", label: "$7,500 and above" }
    ];
    const employeeSearchKeyword = ref("");
    const employees = ref([
      {
        id: 1,
        name: "Renjith",
        email: "renjith@example.com",
        phone: "9000000001",
        gender: "Prefer not to say",
        designation: "Project Manager",
        department: "IT",
        experience: 5,
        joiningDate: "2021-04-12",
        skills: ["Vue.js", "Angular", "Node.js", "AWS"],
        status: "Active"
      },
      {
        id: 2,
        name: "Abeesh",
        email: "abeesh@example.com",
        phone: "9000000002",
        gender: "Prefer not to say",
        designation: "HR",
        department: "HR",
        experience: 4,
        joiningDate: "2022-01-10",
        skills: ["Figma", "Prototyping", "Design systems"],
        status: "Active"
      },
      {
        id: 3,
        name: "Aneesh",
        email: "aneesh@example.com",
        phone: "9000000003",
        gender: "Prefer not to say",
        designation: "Software Engineer",
        department: "IT",
        experience: 3,
        joiningDate: "2023-06-05",
        skills: ["JavaScript", "Vue.js", "REST APIs"],
        status: "Inactive"
      },
      {
        id: 4,
        name: "Akhil",
        email: "akhil@example.com",
        phone: "9000000004",
        gender: "Prefer not to say",
        designation: "HR",
        department: "HR",
        experience: 6,
        joiningDate: "2020-09-21",
        skills: ["Recruiting", "Employee relations", "Onboarding"],
        status: "Active"
      }
    ]);
    const calculatedSalaries = computed(() => salaryEmployees.value.map((employee) => {
      const grossSalary = employee.basicSalary + employee.hra + employee.da + employee.bonus;
      const taxAmount = grossSalary * employee.taxRate / 100;
      return { ...employee, grossSalary, taxAmount, netSalary: grossSalary - taxAmount };
    }));
    const filteredSalaryRecords = computed(() => {
      const ranges = {
        "under-5000": (netSalary) => netSalary < 5000,
        "5000-7499": (netSalary) => netSalary >= 5000 && netSalary < 7500,
        "7500-plus": (netSalary) => netSalary >= 7500
      };
      const matchesRange = ranges[salaryFilter.value];
      return matchesRange
        ? calculatedSalaries.value.filter((employee) => matchesRange(employee.netSalary))
        : calculatedSalaries.value;
    });
    const highestSalary = computed(() => filteredSalaryRecords.value.reduce(
      (highest, employee) => !highest || employee.netSalary > highest.netSalary ? employee : highest,
      null
    ));
    const averageSalary = computed(() => {
      if (filteredSalaryRecords.value.length === 0) {
        return 0;
      }

      const total = filteredSalaryRecords.value.reduce((sum, employee) => sum + employee.netSalary, 0);
      return total / filteredSalaryRecords.value.length;
    });

    function addExpense() {
      const title = expenseForm.title.trim();
      const amount = Number(expenseForm.amount);
      if (!title || !expenseForm.category || !expenseForm.date || !Number.isFinite(amount) || amount <= 0) {
        return;
      }

      expenses.value.push({
        id: nextExpenseId.value,
        title,
        category: expenseForm.category,
        amount,
        date: expenseForm.date
      });
      nextExpenseId.value += 1;
      expenseForm.title = "";
      expenseForm.category = "Food";
      expenseForm.amount = "";
      expenseForm.date = todayString;
    }

    function deleteExpense(expenseId) {
      const expenseIndex = expenses.value.findIndex((expense) => expense.id === expenseId);
      if (expenseIndex !== -1) {
        expenses.value.splice(expenseIndex, 1);
      }
    }

    function getTotalExpenses() {
      return expenses.value.reduce((total, expense) => total + expense.amount, 0);
    }

    function getCategoryTotals() {
      const totals = {};
      expenses.value.forEach((expense) => {
        totals[expense.category] = (totals[expense.category] || 0) + expense.amount;
      });

      return Object.entries(totals).map(([category, amount]) => ({ category, amount }));
    }

    function formatExpenseDate(date) {
      return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      });
    }

    return {
      expenses,
      employees,
      expenseForm,
      expenseCategories,
      salaryFilter,
      salaryFilterOptions,
      filteredSalaryRecords,
      highestSalary,
      averageSalary,
      employeeSearchKeyword,
      addExpense,
      deleteExpense,
      getTotalExpenses,
      getCategoryTotals,
      formatExpenseDate
    };
  },

  data() {
    return {
      searchQuery: "",
      activeTab: "shop",
      cartItems: [],
      orderMessage: "",
      departmentFilter: "all",
      employeeModalOpen: false,
      employeeModalMode: "add",
      employeeForm: {
        id: null,
        name: "",
        email: "",
        phone: "",
        gender: "",
        department: "",
        designation: "",
        experience: 0,
        joiningDate: "",
        status: "Active",
        skills: []
      },
      employeeFormOriginal: null,
      employeeToDelete: null,
      selectedEmployee: null,
      tableMessage: "",
      genderOptions: ["Female", "Male", "Non-binary", "Prefer not to say"],
      skillOptions: [
        "Vue.js", "Angular", "Node.js", "AWS", "Figma", "Prototyping",
        "Design systems", "JavaScript", "REST APIs", "Recruiting",
        "Employee relations", "Onboarding", "SQL", "Communication"
      ],
      employeeTableColumns: [
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "phone", label: "Phone" },
        { key: "gender", label: "Gender" },
        { key: "designation", label: "Designation" },
        { key: "department", label: "Department" },
        { key: "skills", label: "Skills", format: (skills) => skills.join(", ") },
        { key: "experience", label: "Experience" },
        { key: "joiningDate", label: "Joining date" },
        { key: "status", label: "Status" }
      ],
      products: [
        {
          id: 1,
          name: "Everyday Notebook",
          category: "Paper goods",
          description: "A sturdy, lay-flat notebook for plans and passing thoughts.",
          price: 12,
          image: "/images/everyday-notebook.jpg"
        },
        {
          id: 2,
          name: "Stoneware Cup",
          category: "At home",
          description: "A hand-finished cup made for slow morning coffee.",
          price: 18,
          image: "/images/stoneware-cup.jpg"
        },
        {
          id: 3,
          name: "Pocket Pencils",
          category: "Writing tools",
          description: "A set of six dependable pencils with a soft graphite line.",
          price: 7.5,
          image: "/images/pocket-pencils.jpg"
        },
        {
          id: 4,
          name: "Desk Plant",
          category: "Green things",
          description: "An easy-care plant to bring a little life to your workspace.",
          price: 16,
          image: "/images/desk-plant.jpg"
        },
        {
          id: 5,
          name: "Water Bottle",
          category: "On the go",
          description: "A lightweight bottle with a leak-resistant stainless lid.",
          price: 24,
          image: "/images/water-bottle.jpg"
        }
      ]
    };
  },

  computed: {
    departments() {
      return [...new Set(this.employees.map((employee) => employee.department))].sort();
    },

    filteredEmployees() {
      const searchTerm = this.employeeSearchKeyword.trim().toLowerCase();
      return this.employees.filter((employee) => {
        const matchesDepartment = this.departmentFilter === "all" || employee.department === this.departmentFilter;
        const matchesSearch = `${employee.name} ${employee.department} ${employee.designation}`
          .toLowerCase()
          .includes(searchTerm);
        return matchesDepartment && matchesSearch;
      });
    }
  },

  methods: {
    showTab(tab) {
      this.activeTab = tab;
    },

    createEmptyEmployeeForm() {
      return {
        id: null,
        name: "",
        email: "",
        phone: "",
        gender: "",
        department: "",
        designation: "",
        experience: 0,
        joiningDate: "",
        status: "Active",
        skills: []
      };
    },

    openAddEmployeeModal() {
      this.employeeModalMode = "add";
      this.employeeForm = this.createEmptyEmployeeForm();
      this.employeeFormOriginal = null;
      this.employeeToDelete = null;
      this.employeeModalOpen = true;
      this.tableMessage = "";
    },

    handleEmployeeEdit(employee) {
      this.employeeModalMode = "edit";
      this.employeeForm = {
        ...employee,
        skills: [...employee.skills]
      };
      this.employeeFormOriginal = { ...this.employeeForm, skills: [...this.employeeForm.skills] };
      this.employeeToDelete = null;
      this.employeeModalOpen = true;
      this.selectedEmployee = null;
      this.tableMessage = "";
    },

    handleEmployeeDelete(employee) {
      this.employeeModalMode = "delete";
      this.employeeToDelete = employee;
      this.employeeModalOpen = true;
      this.selectedEmployee = null;
      this.tableMessage = "";
    },

    handleEmployeeModalConfirm() {
      if (this.employeeModalMode === "delete") {
        const deletedEmployee = this.employeeToDelete;
        if (!deletedEmployee) {
          return;
        }

        this.employees = this.employees.filter((employee) => employee.id !== deletedEmployee.id);
        this.tableMessage = `${deletedEmployee.name} deleted.`;
        this.employeeToDelete = null;
        this.selectedEmployee = null;
      } else {
        const savedEmployee = {
          id: this.employeeForm.id,
          name: this.employeeForm.name.trim(),
          designation: this.employeeForm.designation.trim(),
          email: this.employeeForm.email.trim(),
          phone: this.employeeForm.phone.trim(),
          gender: this.employeeForm.gender,
          department: this.employeeForm.department.trim(),
          experience: Number(this.employeeForm.experience),
          joiningDate: this.employeeForm.joiningDate,
          status: this.employeeForm.status,
          skills: [...this.employeeForm.skills]
        };

        if (this.employeeModalMode === "add") {
          savedEmployee.id = Math.max(0, ...this.employees.map((employee) => employee.id)) + 1;
          this.employees = [...this.employees, savedEmployee];
          this.tableMessage = `${savedEmployee.name} added.`;
        } else {
          this.employees = this.employees.map((employee) =>
            employee.id === savedEmployee.id ? savedEmployee : employee
          );
          this.tableMessage = `${savedEmployee.name} updated.`;
        }

        this.selectedEmployee = savedEmployee;
      }

      this.employeeForm = this.createEmptyEmployeeForm();
      this.employeeFormOriginal = null;
    },

    handleEmployeeFormSubmit(employeeForm) {
      this.employeeForm = { ...employeeForm, skills: [...employeeForm.skills] };
      this.handleEmployeeModalConfirm();
      this.employeeModalOpen = false;
    },

    resetEmployeeForm() {
      this.employeeForm = this.employeeModalMode === "edit" && this.employeeFormOriginal
        ? { ...this.employeeFormOriginal, skills: [...this.employeeFormOriginal.skills] }
        : this.createEmptyEmployeeForm();
    },

    cancelEmployeeModal() {
      this.employeeForm = this.createEmptyEmployeeForm();
      this.employeeFormOriginal = null;
      this.employeeToDelete = null;
    },

    handleEmployeeRowClick(employee) {
      this.selectedEmployee = employee;
      this.tableMessage = "";
    },

    getVisibleProducts() {
      const query = this.searchQuery.toLowerCase();
      return this.products.filter((product) =>
        `${product.name} ${product.category} ${product.description}`.toLowerCase().includes(query)
      );
    },

    addToCart(product) {
      const cartItem = this.cartItems.find((item) => item.id === product.id);

      if (cartItem) {
        cartItem.quantity += 1;
      } else {
        this.cartItems.push({ ...product, quantity: 1 });
      }

      this.orderMessage = "";
    },

    addFirstSearchResult(event) {
      if (event.key !== "Enter") {
        return;
      }

      const [firstProduct] = this.getVisibleProducts();
      if (firstProduct) {
        this.addToCart(firstProduct);
      }
    },

    clearSearch() {
      this.searchQuery = "";
    },

    removeFromCart(productId) {
      this.cartItems = this.cartItems.filter((item) => item.id !== productId);
    },

    changeQuantity(productId, amount) {
      const cartItem = this.cartItems.find((item) => item.id === productId);
      if (!cartItem) {
        return;
      }

      const nextQuantity = cartItem.quantity + amount;
      if (nextQuantity >= 1) {
        cartItem.quantity = nextQuantity;
      }
    },

    getCartQuantity() {
      return this.cartItems.reduce((total, item) => total + item.quantity, 0);
    },

    getCartTotal() {
      return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    },

    formatPrice(amount) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
      }).format(amount);
    },

    checkout() {
      if (this.cartItems.length === 0) {
        return;
      }

      this.cartItems = [];
      this.orderMessage = "Order placed. Thank you!";
    }
  }
};
</script>

<style>
:root {
  font-family: "Segoe UI", Tahoma, sans-serif;
  color: #202923;
  background: #f3f5f0;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
}

* {
  box-sizing: border-box;
}

body {
  min-width: 320px;
  min-height: 100vh;
  margin: 0;
}

.workspace {
  min-height: 100vh;
  background-color: #f3f5f0;
  background-image: radial-gradient(#dce2d9 0.7px, transparent 0.7px);
  background-size: 18px 18px;
}

.topbar {
  height: 68px;
  padding: 0 max(28px, calc((100vw - 1080px) / 2));
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border-bottom: 1px solid #e7ebe5;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 11px;
  color: #202923;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
}

.brand-mark {
  width: 30px;
  height: 30px;
  display: grid;
  place-items: center;
  border-radius: 8px;
  color: #fff;
  background: #32634f;
  font-family: Georgia, serif;
  font-size: 17px;
}

.brand-divider {
  color: #7a847d;
  font-weight: 400;
}

.view-switch {
  display: inline-flex;
  gap: 3px;
  margin-bottom: 28px;
  padding: 4px;
  border: 1px solid #dce2d9;
  border-radius: 6px;
  background: #e9ede7;
}

.view-switch button {
  min-width: 112px;
  height: 36px;
  padding: 0 14px;
  border: 0;
  border-radius: 4px;
  color: #68736b;
  background: transparent;
  font: inherit;
  font-size: 12px;
  cursor: pointer;
}

.view-switch button.is-current {
  color: #25342c;
  background: #fff;
  box-shadow: 0 1px 3px rgb(29 48 36 / 10%);
}

.workspace-label,
.eyebrow,
.record-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1.1px;
}

.workspace-label {
  color: #7d877f;
}

.content {
  width: min(100% - 48px, 900px);
  margin: 0 auto;
  padding: 54px 0 80px;
}

.page-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 26px;
}

.directory-header {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 24px;
}

.directory-header h2 {
  margin: 0;
  color: #25342c;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 28px;
  font-weight: 400;
}

.directory-header .page-description {
  margin-bottom: 0;
}

.directory-header .record-label {
  margin-bottom: 11px;
}

.empty-employees {
  padding: 20px 0;
  color: #768078;
  font-size: 13px;
}

.directory-tools {
  display: flex;
  align-items: end;
  gap: 22px;
}

.directory-tools .record-label {
  margin-bottom: 11px;
}

.department-filter {
  display: grid;
  gap: 6px;
  color: #707b73;
  font-size: 12px;
}

.department-filter select {
  min-width: 180px;
  height: 38px;
  padding: 0 32px 0 11px;
  border: 1px solid #dce3dc;
  border-radius: 5px;
  color: #29342d;
  background: #fff;
  font: inherit;
}

.eyebrow {
  margin: 0 0 11px;
  color: #61776a;
}

.eyebrow span,
.record-label span {
  padding: 0 5px;
  color: #c4694f;
}

h1 {
  margin: 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 34px;
  font-weight: 400;
  line-height: 1.15;
}

.page-description {
  margin: 8px 0 0;
  color: #707b73;
  font-size: 14px;
}

.record-label {
  margin: 0 0 5px;
  color: #879088;
  white-space: nowrap;
}

@media (max-width: 600px) {
  .topbar {
    height: 60px;
    padding: 0 20px;
  }

  .workspace-label {
    font-size: 9px;
  }

  .content {
    width: min(100% - 32px, 500px);
    padding-top: 38px;
  }

  .page-heading {
    align-items: start;
    flex-direction: column;
    gap: 14px;
  }

  .directory-header {
    align-items: start;
    flex-direction: column;
    gap: 16px;
  }

  .directory-tools {
    width: 100%;
    align-items: center;
    justify-content: space-between;
  }

  .directory-tools .record-label {
    margin-bottom: 0;
  }

  .department-filter select {
    min-width: 160px;
  }

  h1 {
    font-size: 30px;
  }

}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.shopping-page {
  width: min(100% - 48px, 1120px);
}

.shopping-heading {
  align-items: end;
  padding-bottom: 26px;
  border-bottom: 1px solid #dce2d9;
}

.shopping-heading .eyebrow,
.cart-heading .eyebrow {
  margin: 0 0 10px;
  color: #a35b3c;
}

.shopping-heading h1 {
  color: #25342c;
}

.store-summary {
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 10px 13px;
  border: 1px solid #dce2d9;
  border-radius: 6px;
  background: #fff;
}

.store-summary > span {
  color: #78827a;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1px;
}

.store-summary strong,
.cart-count {
  display: grid;
  width: 27px;
  aspect-ratio: 1;
  place-items: center;
  border-radius: 50%;
  color: #fff;
  background: #32634f;
  font-size: 12px;
}

.shop-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 340px;
  align-items: start;
  gap: 30px;
}

.employee-directory {
  margin-top: 0;
}

.employee-search-input {
  flex: 1 1 220px;
}

.employee-search-input input {
  width: 100%;
  height: 40px;
  padding: 0 12px;
  border: 1px solid #dce2d9;
  border-radius: 5px;
  color: #25342c;
  background: #fff;
  font: inherit;
  font-size: 13px;
}

.employee-search-input input:focus-visible {
  outline: 2px solid #c36a4c;
  outline-offset: 2px;
}

.employee-search-message {
  margin: 0;
  padding: 18px;
  border: 1px solid #e1e5de;
  border-radius: 6px;
  color: #68736b;
  background: #fff;
  font-size: 13px;
}

.salary-calculator {
  display: grid;
  gap: 24px;
}

.salary-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 24px;
}

.salary-heading h1 {
  color: #25342c;
}

.salary-filter {
  display: grid;
  min-width: 190px;
  gap: 6px;
  color: #707b73;
  font-size: 11px;
}

.salary-filter select {
  width: 100%;
  height: 38px;
  padding: 0 30px 0 10px;
  border: 1px solid #dce3dc;
  border-radius: 4px;
  color: #29342d;
  background: #fff;
  font: inherit;
  font-size: 12px;
}

.salary-filter select:focus-visible {
  outline: 2px solid #c36a4c;
  outline-offset: 2px;
}

.salary-summary {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.salary-summary-item {
  display: grid;
  gap: 6px;
  padding: 17px 19px;
  border: 1px solid #dce2d9;
  border-radius: 6px;
  background: #fff;
}

.salary-summary-item span,
.salary-summary-item small {
  color: #78827a;
  font-size: 11px;
}

.salary-summary-item strong {
  color: #32634f;
  font-size: 25px;
  font-weight: 400;
}

.salary-table-wrap {
  overflow-x: auto;
  border: 1px solid #e1e5de;
  border-radius: 6px;
  background: #fff;
}

.salary-table {
  width: 100%;
  min-width: 950px;
  border-collapse: collapse;
  color: #29342d;
  font-size: 12px;
  text-align: right;
}

.salary-table th,
.salary-table td {
  padding: 13px 14px;
  border-bottom: 1px solid #edf0ec;
  white-space: nowrap;
}

.salary-table thead th {
  color: #78827a;
  background: #f7f8f6;
  font-size: 10px;
  font-weight: 700;
}

.salary-table thead th:first-child,
.salary-table tbody th {
  position: sticky;
  left: 0;
  text-align: left;
}

.salary-table thead th:first-child {
  z-index: 1;
  background: #f7f8f6;
}

.salary-table tbody th {
  color: #25342c;
  background: #fff;
  font-size: 12px;
  font-weight: 650;
}

.salary-table tbody tr:last-child th,
.salary-table tbody tr:last-child td {
  border-bottom: 0;
}

.net-salary-cell {
  color: #32634f;
  font-weight: 700;
}

.salary-empty {
  margin: 0;
  padding: 20px;
  border: 1px solid #e1e5de;
  border-radius: 6px;
  color: #768078;
  background: #fff;
  font-size: 13px;
}

.expense-tracker {
  display: grid;
  gap: 25px;
}

.expense-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 24px;
}

.expense-heading h1 {
  color: #25342c;
}

.expense-total {
  display: grid;
  gap: 5px;
  min-width: 180px;
  padding: 15px 18px;
  border: 1px solid #dce2d9;
  border-radius: 6px;
  background: #fff;
}

.expense-total span,
.expense-section-heading > span {
  color: #78827a;
  font-size: 11px;
}

.expense-total strong {
  color: #32634f;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 25px;
  font-weight: 400;
}

.expense-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(280px, 0.8fr);
  align-items: start;
  gap: 18px;
}

.expense-history,
.expense-form-panel,
.category-panel {
  padding: 21px;
  border: 1px solid #e1e5de;
  border-radius: 7px;
  background: #fff;
}

.expense-section-heading {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.expense-section-heading h2,
.expense-form-panel h2 {
  margin: 0;
  color: #25342c;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 21px;
  font-weight: 400;
}

.expense-list,
.category-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.expense-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto auto;
  align-items: center;
  gap: 14px;
  padding: 15px 0;
  border-top: 1px solid #edf0ec;
}

.expense-description {
  display: grid;
  min-width: 0;
  gap: 5px;
}

.expense-description strong,
.expense-amount,
.category-list strong {
  color: #29342d;
  font-size: 13px;
}

.expense-description span {
  color: #849087;
  font-size: 11px;
}

.expense-delete {
  padding: 5px 0 5px 5px;
  border: 0;
  color: #a35b3c;
  background: transparent;
  font: inherit;
  font-size: 11px;
  cursor: pointer;
}

.expense-empty {
  margin: 0;
  padding: 14px 0 4px;
  color: #768078;
  font-size: 12px;
  line-height: 1.5;
}

.expense-side {
  display: grid;
  gap: 18px;
}

.expense-form-panel {
  display: grid;
  gap: 13px;
}

.expense-form-panel h2 {
  margin-bottom: 2px;
}

.expense-form-panel label {
  display: grid;
  gap: 6px;
  color: #707b73;
  font-size: 11px;
}

.expense-form-panel input,
.expense-form-panel select {
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

.expense-form-panel input:focus-visible,
.expense-form-panel select:focus-visible {
  outline: 2px solid #c36a4c;
  outline-offset: 2px;
}

.expense-submit {
  min-height: 40px;
  margin-top: 3px;
  border: 0;
  border-radius: 4px;
  color: #fff;
  background: #32634f;
  font: inherit;
  font-size: 12px;
  font-weight: 650;
  cursor: pointer;
}

.category-list li {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 11px 0;
  border-top: 1px solid #edf0ec;
  color: #68736b;
  font-size: 12px;
}

@media (max-width: 700px) {
  .directory-tools {
    flex-wrap: wrap;
  }

  .employee-search-input {
    flex-basis: 100%;
  }

  .salary-heading {
    align-items: start;
    flex-direction: column;
  }

  .salary-filter {
    width: 100%;
  }

  .expense-heading {
    align-items: start;
    flex-direction: column;
  }

  .expense-layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .view-switch button {
    min-width: 0;
    padding: 0 1px;
    font-size: 8px;
    white-space: nowrap;
  }

  .expense-row {
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 8px 12px;
  }

  .expense-description {
    grid-column: 1;
  }

  .expense-amount {
    grid-column: 2;
    grid-row: 1;
  }

  .expense-delete {
    grid-column: 2;
    grid-row: 2;
    justify-self: end;
  }
}

.section-heading,
.section-heading > div,
.product-action,
.cart-item-heading,
.cart-item-bottom,
.total-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.section-heading {
  gap: 18px;
  margin-bottom: 18px;
}

.section-heading h2,
.cart-heading h2 {
  margin: 0;
  color: #25342c;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 23px;
  font-weight: 400;
}

.section-heading > div {
  align-items: baseline;
  gap: 10px;
}

.section-heading p {
  margin: 0;
  color: #849087;
  font-size: 12px;
}

.product-search input {
  width: 210px;
  height: 38px;
  padding: 0 12px;
  border: 1px solid #dce2d9;
  border-radius: 5px;
  color: #25342c;
  background: #fff;
  font: inherit;
  font-size: 12px;
}

.product-search input:focus-visible,
button:focus-visible {
  outline: 2px solid #c36a4c;
  outline-offset: 2px;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.product-card {
  overflow: hidden;
  border: 1px solid #e1e5de;
  border-radius: 7px;
  background: #fff;
  transition: transform 160ms ease, box-shadow 160ms ease;
}

.product-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 24px rgb(29 48 36 / 8%);
}

.product-image {
  display: block;
  width: 100%;
  aspect-ratio: 1.65;
  object-fit: cover;
  background: #e8ebe5;
}

.product-info {
  padding: 14px 15px 15px;
}

.product-category {
  margin: 0 0 6px;
  color: #a35b3c;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.7px;
  text-transform: uppercase;
}

.product-info h3,
.cart-item h3 {
  margin: 0;
  color: #25342c;
  font-size: 14px;
  font-weight: 650;
}

.product-description {
  min-height: 36px;
  margin: 7px 0 13px;
  color: #768078;
  font-size: 12px;
  line-height: 1.5;
}

.product-action strong,
.cart-item-bottom > strong {
  color: #25342c;
  font-size: 13px;
}

.add-button,
.checkout-button {
  border: 0;
  border-radius: 4px;
  color: #fff;
  background: #32634f;
  font: inherit;
  font-size: 12px;
  font-weight: 650;
  cursor: pointer;
}

.add-button {
  padding: 8px 10px;
}

.add-button span {
  margin-right: 3px;
  font-size: 16px;
  vertical-align: -1px;
}

.empty-products,
.empty-cart {
  padding: 20px 0;
  color: #768078;
  font-size: 13px;
  line-height: 1.5;
}

.cart-panel {
  position: sticky;
  top: 20px;
  padding: 22px;
  border: 1px solid #e1e5de;
  border-radius: 7px;
  background: #fff;
}

.cart-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 18px;
  border-bottom: 1px solid #edf0ec;
}

.cart-heading .eyebrow {
  font-size: 9px;
}

.cart-heading h2 {
  font-size: 21px;
}

.cart-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.cart-item {
  padding: 17px 0;
  border-bottom: 1px solid #edf0ec;
}

.cart-item-heading {
  align-items: start;
  gap: 12px;
}

.cart-item-heading p {
  margin: 5px 0 0;
  color: #849087;
  font-size: 11px;
}

.remove-button {
  padding: 2px 0;
  border: 0;
  color: #a35b3c;
  background: transparent;
  font: inherit;
  font-size: 11px;
  cursor: pointer;
}

.cart-item-bottom {
  margin-top: 13px;
}

.quantity-control {
  display: inline-flex;
  align-items: center;
  gap: 13px;
  min-height: 30px;
  padding: 2px 5px;
  border: 1px solid #e1e5de;
  border-radius: 4px;
}

.quantity-control button {
  width: 22px;
  height: 24px;
  padding: 0;
  border: 0;
  color: #32634f;
  background: transparent;
  font: inherit;
  font-size: 17px;
  cursor: pointer;
}

.quantity-control button:disabled {
  color: #b8c0b9;
  cursor: not-allowed;
}

.quantity-control > span {
  min-width: 12px;
  color: #25342c;
  font-size: 12px;
  text-align: center;
}

.cart-footer {
  padding-top: 18px;
}

.total-row {
  margin-bottom: 17px;
  color: #25342c;
  font-size: 14px;
}

.total-row strong {
  font-size: 17px;
}

.checkout-button {
  display: flex;
  width: 100%;
  min-height: 43px;
  align-items: center;
  justify-content: space-between;
  padding: 0 14px;
  font-size: 13px;
}

.checkout-button span {
  font-size: 18px;
}

.checkout-button:disabled {
  background: #a7b4aa;
  cursor: not-allowed;
}

.shipping-note {
  margin: 11px 0 0;
  color: #849087;
  font-size: 10px;
  text-align: center;
}

.order-message {
  margin: 14px 0 0;
  padding: 10px;
  border-radius: 4px;
  color: #32634f;
  background: #eef5ef;
  font-size: 12px;
}

@media (max-width: 900px) {
  .shop-layout {
    grid-template-columns: minmax(0, 1fr) 300px;
    gap: 20px;
  }

  .cart-panel {
    padding: 18px;
  }
}

@media (max-width: 700px) {
  .shopping-page {
    width: min(100% - 32px, 560px);
  }

  .shop-layout {
    grid-template-columns: 1fr;
  }

  .cart-panel {
    position: static;
  }
}

@media (max-width: 480px) {
  .shopping-heading {
    align-items: start;
  }

  .store-summary {
    align-self: start;
  }

  .section-heading {
    align-items: start;
    flex-direction: column;
  }

  .product-search,
  .product-search input {
    width: 100%;
  }

  .product-grid {
    grid-template-columns: 1fr;
  }

  .view-switch {
    display: flex;
    width: 100%;
  }

  .view-switch button {
    flex: 1;
  }
}
</style>