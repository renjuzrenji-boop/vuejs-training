import { ref } from "vue";

export const employees = ref([
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