import { employees } from "./employees.json";
import { getBoss, getSubordinates } from "./getEmployees";
import {
  TreeNode,
  replaceEmailsWithNames,
  generateCompanyStructure,
  hireEmployeeUnderBossName,
  hireEmployeeUnderBossId,
  fireEmployee,
  promoteEmployee,
  demoteEmployee,
} from "./manageEmployees";

const newEmployee1 = {
  name: "Jeb",
  jobTitle: "Head of Operations",
  boss: "Sarah",
  salary: "130000",
};

const newEmployee2 = {
  name: "Janna",
  jobTitle: "CTO",
  boss: "Sarah",
  salary: "180000",
};

function main() {
  replaceEmailsWithNames(employees);
  const tree: TreeNode = generateCompanyStructure(employees);

  console.log("\n");

  hireEmployeeUnderBossName(tree, newEmployee1, "Sarah");
  fireEmployee(tree, "Alicia");
  promoteEmployee(tree, "Jared");
  demoteEmployee(tree, "Xavier", "Maria");

  console.log("\n");

  getBoss(tree, "Bill");
  getSubordinates(tree, "Maria");

  console.log("\n");

  hireEmployeeUnderBossId(tree, newEmployee2, 1);
}

main();
