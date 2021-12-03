import { employees } from "./employees.json";
import { getBoss, getSubordinates } from "./getEmployees";
import {
  TreeNode,
  replaceEmailsWithNames,
  generateCompanyStructure,
  hireEmployee,
  fireEmployee,
  promoteEmployee,
  demoteEmployee,
} from "./manageEmployees";

const newEmployee = {
  name: "Jeb",
  jobTitle: "Head of Operations",
  boss: "Sarah",
  salary: "130000",
};

function main() {
  replaceEmailsWithNames(employees);
  // generateCompanyStructure(employees)
  const tree: TreeNode = generateCompanyStructure(employees);

  console.log("\n");

  hireEmployee(tree, newEmployee, "Sarah");
  fireEmployee(tree, "Alicia");
  promoteEmployee(tree, "Jared");
  demoteEmployee(tree, "Xavier", "Maria");

  console.log("\n");

  getBoss(tree, "Bill");
  getSubordinates(tree, "Maria");
}

main();
