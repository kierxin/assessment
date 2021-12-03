interface Employee {
  name: string;
  jobTitle: string;
  boss: string | null;
  salary: string;
}

class TreeNode {
  value: Employee;
  descendants: Array<TreeNode>;

  constructor(value: Employee) {
    this.value = value;
    this.descendants = [];
  }
}

/**
 * Normalizes the provided JSON file.
 *
 * @param {Object[]} employees array of employees
 */

export function replaceEmailsWithNames(employees: Array<Employee>) {
  if (employees.length < 1) return {};
  console.log("Normalizing JSON file...");

  employees.forEach((employee) => {
    const name = employee.name;

    if (name.includes("@")) {
      const locationOfAtSymbol = name.indexOf("@");
      const parsedName = name.slice(0, locationOfAtSymbol);
      employee.name = parsedName[0].toUpperCase() + parsedName.slice(1);
    }
  });

  return;
}

/**
 * Generates a tree of employees.
 *
 * @param {Object[]} employees array of employees
 * @returns {TreeNode}
 */

export function generateCompanyStructure(employees: Array<Employee>) {
  console.log("Generating employee tree...");

  // initialize tree
  if (employees.length < 1) return {};
  const firstEmployee = new TreeNode(employees[0]);
  let tree: Array<TreeNode> = [firstEmployee];

  // add each employee to tree, starting after CEO
  for (let i = 1; i < employees.length; i++) {
    const boss = bossNodeFromBFS(tree, employees[i].boss);
    if (boss) boss.descendants.push(new TreeNode(employees[i]));
  }

  return tree;
}

function bossNodeFromBFS(tree: Array<TreeNode>, boss: string | null) {
  const queue = [tree[0]];

  while (queue.length > 0) {
    const currentNode = queue.shift();

    if (currentNode) {
      if (currentNode.value.name === boss) return currentNode;
      queue.push(...currentNode.descendants);
    }
  }

  return;
}

/**
 * Adds a new employee to the team and places them under a specified boss.
 *
 * @param {TreeNode} tree
 * @param {Object} newEmployee
 * @param {string} bossName
 * @returns {void}
 */
function hireEmployee() {}

/**
 * Removes an employee from the team by name.
 * If the employee has other employees below them, randomly selects one to take their place.
 *
 * @param {TreeNode} tree
 * @param {string} name employee's name
 * @returns {void}
 */
function fireEmployee() {}

/**
 * Promotes an employee one level above their current ranking.
 * The promoted employee and their boss should swap places in the hierarchy.
 *
 * @param {TreeNode} tree
 * @param {string} employeeName
 * @returns {void}
 */
function promoteEmployee() {}

/**
 * Demotes an employee one level below their current ranking.
 * Picks a subordinat and swaps places in the hierarchy.
 *
 * @param {TreeNode} tree
 * @param {string} employeeName the employee getting demoted
 * @param {string} subordinateName the new boss
 * @returns {void}
 */
function demoteEmployee() {}
