import { mount } from "@vue/test-utils";
import { defineComponent, h } from "vue";
import { describe, expect, it, vi } from "vitest";
import EmployeeCard from "../EmployeeCard.vue";
import EmployeeForm from "../EmployeeForm.vue";
import EmployeeList from "../EmployeeList.vue";

const employee = {
  id: 7,
  name: "Aneesh Kumar",
  email: "aneesh@example.com",
  phone: "9000000007",
  gender: "Prefer not to say",
  designation: "Software Engineer",
  department: "IT",
  experience: 3,
  joiningDate: "2023-06-05",
  skills: ["Vue.js", "REST APIs"],
  status: "Active"
};

const genderOptions = ["Female", "Male", "Prefer not to say"];
const skillOptions = ["Vue.js", "Node.js", "REST APIs"];

const RouterLinkStub = defineComponent({
  props: {
    to: {
      type: Object,
      required: true
    }
  },
  setup(props, { slots }) {
    return () => h("a", {
      "data-route-name": props.to.name,
      "data-employee-id": props.to.params?.id
    }, slots.default?.());
  }
});

function createEmployeeForm(overrides = {}) {
  return {
    id: null,
    name: "Aneesh Kumar",
    email: "aneesh@example.com",
    phone: "9000000007",
    gender: "Prefer not to say",
    department: "IT",
    designation: "Software Engineer",
    experience: 3,
    joiningDate: "2023-06-05",
    status: "Active",
    skills: ["Vue.js"],
    ...overrides
  };
}

describe("EmployeeCard", () => {
  it("renders the employee details, status, and skills from its employee prop", () => {
    const wrapper = mount(EmployeeCard, {
      props: { employee }
    });

    expect(wrapper.get("h2").text()).toBe("Aneesh Kumar");
    expect(wrapper.text()).toContain("Software Engineer");
    expect(wrapper.text()).toContain("IT");
    expect(wrapper.text()).toContain("3 years");
    expect(wrapper.get('[role="status"]').text()).toContain("Active");
    expect(wrapper.findAll("li").map((item) => item.text())).toEqual(["Vue.js", "REST APIs"]);
  });

  it("renders the inactive status for an inactive employee prop", () => {
    const wrapper = mount(EmployeeCard, {
      props: { employee: { ...employee, status: "Inactive" } }
    });

    expect(wrapper.get('[role="status"]').text()).toContain("Inactive");
  });
});

describe("EmployeeList", () => {
  it("renders one employee card and detail link per employee", () => {
    const wrapper = mount(EmployeeList, {
      props: { employees: [employee, { ...employee, id: 8, name: "Renjith Kumar" }] },
      global: {
        stubs: { RouterLink: RouterLinkStub }
      }
    });

    expect(wrapper.findAllComponents(EmployeeCard)).toHaveLength(2);
    expect(wrapper.findAll("h2").map((heading) => heading.text())).toEqual([
      "Aneesh Kumar",
      "Renjith Kumar"
    ]);
    expect(wrapper.findAll("a").map((link) => [
      link.attributes("data-route-name"),
      link.attributes("data-employee-id")
    ])).toEqual([
      ["employee-detail", "7"],
      ["employee-detail", "8"]
    ]);
  });

  it("renders an empty list when passed no employees", () => {
    const wrapper = mount(EmployeeList, {
      props: { employees: [] },
      global: {
        stubs: { RouterLink: RouterLinkStub }
      }
    });

    expect(wrapper.findAllComponents(EmployeeCard)).toHaveLength(0);
  });

  it("renders a bounded page and clamps the page when the list shrinks", async () => {
    const largeEmployeeList = Array.from({ length: 13 }, (_, index) => ({
      ...employee,
      id: index + 1,
      name: `Employee ${index + 1}`
    }));
    const wrapper = mount(EmployeeList, {
      props: { employees: largeEmployeeList, pageSize: 5 },
      global: {
        stubs: { RouterLink: RouterLinkStub }
      }
    });

    expect(wrapper.findAllComponents(EmployeeCard)).toHaveLength(5);
    await wrapper.get('[aria-label="Next employee page"]').trigger("click");
    expect(wrapper.get("h2").text()).toBe("Employee 6");
    expect(wrapper.text()).toContain("Page 2 of 3");

    await wrapper.get('[aria-label="Next employee page"]').trigger("click");
    expect(wrapper.get("h2").text()).toBe("Employee 11");
    await wrapper.setProps({ employees: largeEmployeeList.slice(0, 2) });
    expect(wrapper.get("h2").text()).toBe("Employee 1");
    expect(wrapper.findAllComponents(EmployeeCard)).toHaveLength(2);
  });
});

describe("EmployeeForm", () => {
  function mountForm(modelValue = createEmployeeForm()) {
    return mount(EmployeeForm, {
      props: {
        modelValue,
        genderOptions,
        skillOptions
      }
    });
  }

  it("renders form fields and options from its props", () => {
    const wrapper = mountForm();

    expect(wrapper.get('input[name="name"]').element.value).toBe("Aneesh Kumar");
    expect(wrapper.get('input[name="email"]').attributes("type")).toBe("email");
    expect(wrapper.get('select[name="gender"]').findAll("option").map((option) => option.text())).toContain("Female");
    expect(wrapper.text()).toContain("Node.js");
    expect(wrapper.get('input[name="name"]').attributes()).toHaveProperty("required");
  });

  it("emits model updates for text fields and skill selection", async () => {
    const wrapper = mountForm();

    await wrapper.get('input[name="name"]').setValue("  Updated Name  ");
    expect(wrapper.emitted("update:modelValue").at(-1)[0].name).toBe("  Updated Name  ");

    await wrapper.get('input[type="checkbox"][value="Node.js"]').setValue(true);
    expect(wrapper.emitted("update:modelValue").at(-1)[0].skills).toEqual(["Vue.js", "Node.js"]);
  });

  it("blocks submit when reportValidity fails and emits submit when valid", async () => {
    const wrapper = mountForm();
    const reportValidity = vi.spyOn(wrapper.get("form").element, "reportValidity");
    reportValidity.mockReturnValueOnce(false).mockReturnValueOnce(true);

    await wrapper.get("form").trigger("submit");
    expect(wrapper.emitted("submit")).toBeUndefined();

    await wrapper.get("form").trigger("submit");
    expect(wrapper.emitted("submit")).toHaveLength(1);
    expect(wrapper.emitted("submit")[0][0]).toMatchObject({
      name: "Aneesh Kumar",
      email: "aneesh@example.com",
      skills: ["Vue.js"]
    });
  });

  it("reports invalid native form fields through its exposed validate method", () => {
    const wrapper = mountForm(createEmployeeForm({ name: "" }));

    expect(wrapper.vm.validate()).toBe(false);
    expect(wrapper.get('input[name="name"]').element.validity.valueMissing).toBe(true);
  });
});