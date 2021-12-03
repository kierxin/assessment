import { employees } from "./employees.json";
import {
  replaceEmailsWithNames,
  generateCompanyStructure,
} from "./manageEmployees";

function main() {
  replaceEmailsWithNames(employees);
  generateCompanyStructure(employees);

  console.log("\n");

}

main();
