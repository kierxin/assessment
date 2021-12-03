import {
  getEmployeeNodeByNameBFS,
  getEmployeeNodeByIdBFS,
} from "./getEmployees";

interface Employee {
  name: string;
  jobTitle: string;
  boss: string | null;
  salary: string;
  id?: number;
}

export class TreeNode {
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

export function replaceEmailsWithNames(employees: Array<Employee>): void {
  if (employees.length < 1) return;
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

// use closure to track current highest ID number; ensure no repeat IDs
const generateUniqueId = (idCount: number = 0) => {
  return function createClosureForID(): number {
    idCount += 1;
    return idCount;
  };
};
const getUniqueId = generateUniqueId();

/**
 * Generates a tree of employees.
 *
 * @param {Object[]} employees array of employees
 * @returns {TreeNode}
 */

export function generateCompanyStructure(employees: Array<Employee>): TreeNode {
  console.log("Generating employee tree...");

  // initialize tree
  const root = employees[0];
  root.id = getUniqueId();
  const firstEmployee = new TreeNode(employees[0]);
  let tree: TreeNode = firstEmployee;

  // add each employee to tree, starting after CEO
  for (let i = 1; i < employees.length; i++) {
    const boss = getEmployeeNodeByNameBFS(tree, employees[i].boss);
    if (boss) {
      employees[i].id = getUniqueId();
      boss.descendants.push(new TreeNode(employees[i]));
    }
  }

  return tree;
}

/**
 * Adds a new employee to the team and places them under a specified boss.
 *
 * @param {TreeNode} tree
 * @param {Object} newEmployee
 * @param {string} bossName
 * @returns {void}
 */
export function hireEmployeeUnderBossName(
  tree: TreeNode,
  employee: Employee,
  bossName: string
): void {
  const boss = getEmployeeNodeByNameBFS(tree, bossName);

  if (boss) {
    employee.id = getUniqueId();
    boss.descendants.push(new TreeNode(employee));
    console.log(
      `[hireEmployeeUnderBossName] Added new employee (${employee.name}) with ${bossName} as their boss`
    );
  } else {
    console.log("No employee exists with the specified boss name");
  }

  return;
}

export function hireEmployeeUnderBossId(
  tree: TreeNode,
  employee: Employee,
  bossId: number
): void {
  const boss = getEmployeeNodeByIdBFS(tree, bossId);
  if (boss) {
    employee.id = getUniqueId();
    boss.descendants.push(new TreeNode(employee));
    console.log(
      `[hireEmployeeUnderBossId] Added new employee (${employee.name}) with employee #${bossId} as their boss`
    );
  } else {
    console.log("No employee exists with the specified boss name");
  }

  return;
}

/**
 * Removes an employee from the team by name.
 * If the employee has other employees below them, randomly selects one to take their place.
 *
 * @param {TreeNode} tree
 * @param {string} name employee's name
 * @returns {void}
 */
export function fireEmployee(tree: TreeNode, name: string): void {
  const employee = getEmployeeNodeByNameBFS(tree, name);
  let boss: TreeNode | undefined;

  if (employee) {
    boss = getEmployeeNodeByNameBFS(tree, employee.value.boss);

    // determine replacement if there are any descendants
    let inheritor: TreeNode | undefined;
    inheritor = selectReplacement(employee);
    employee.descendants = [];

    // remove employee from tree
    if (boss) {
      const idx: number = boss.descendants.indexOf(employee);
      boss.descendants.splice(idx, 1);

      // replace employee with inheritor if applicable
      if (inheritor) {
        boss.descendants.push(inheritor);
        console.log(
          `[fireEmployee] Fired ${name} and replaced with ${inheritor.value.name}`
        );
      } else {
        console.log(`[fireEmployee] Fired ${name}`);
      }
    }
  }
}

function selectReplacement(employee: TreeNode): TreeNode | undefined {
  let inheritor: TreeNode | undefined;
  let remainingSubordinates: Array<TreeNode> | undefined;

  if (employee.descendants.length > 0) {
    // choose which subordinate replaces fired employee
    const idx: number = Math.floor(
      Math.random() * (employee.descendants.length - 1)
    );
    inheritor = employee.descendants[idx];

    // assign fired employee's direct reports to replacement
    employee.descendants.splice(idx, 1);
    remainingSubordinates = employee.descendants;

    remainingSubordinates.forEach((subordinate: TreeNode) => {
      if (inheritor) subordinate.value.boss = inheritor.value.name;
    });

    inheritor.descendants = remainingSubordinates;
    inheritor.value.jobTitle = employee.value.jobTitle;
    inheritor.value.boss = employee.value.boss;

    return inheritor;
  }
}

/**
 * Promotes an employee one level above their current ranking.
 * The promoted employee and their boss should swap places in the hierarchy.
 *
 * @param {TreeNode} tree
 * @param {string} employeeName
 * @returns {void}
 */
export function promoteEmployee(tree: TreeNode, employeeName: string): void {
  const employee: TreeNode | undefined = getEmployeeNodeByNameBFS(
    tree,
    employeeName
  );
  let boss: TreeNode | undefined;

  if (employee) {
    boss = getEmployeeNodeByNameBFS(tree, employee.value.boss) as TreeNode;
    const coworkers = boss.descendants;

    // update (former) boss and the promoted employee
    swapSubordinates(boss, employee);
    updateBosses(tree, boss, employee);

    // also update (former) boss's direct reports to reflect new boss
    for (let i = 0; i < coworkers.length; i++) {
      coworkers[i].value.boss = employee.value.name;
    }

    console.log(
      `[promoteEmployee]: Promoted ${employee.value.name} and made ${boss.value.name} their subordinate`
    );
  } else {
    console.log("[promoteEmployee]: Employee does not exist");
  }

  return;
}

function swapSubordinates(boss: TreeNode, employee: TreeNode): void {
  const subordinatesOfBoss: Array<TreeNode> = boss.descendants;
  const idx: number = subordinatesOfBoss.indexOf(employee);
  const subordinatesOfEmployee: Array<TreeNode> = employee.descendants;

  boss.descendants = subordinatesOfEmployee;
  employee.descendants = subordinatesOfBoss;
  subordinatesOfBoss.splice(idx, 1);
  employee.descendants.push(boss);

  return;
}

function updateBosses(
  tree: TreeNode,
  boss: TreeNode,
  employee: TreeNode
): void {
  const bossOfBoss = getEmployeeNodeByNameBFS(tree, boss.value.boss);
  const bossOfBossName = boss.value.boss;

  if (bossOfBoss) {
    employee.value.boss = bossOfBossName;
    const idx: number = bossOfBoss.descendants.indexOf(boss);
    bossOfBoss.descendants.splice(idx, 1, employee);
  } else {
    employee.value.boss = null;
  }

  boss.value.boss = employee.value.name;

  return;
}

/**
 * Demotes an employee one level below their current ranking.
 * Picks a subordinat and swaps places in the hierarchy.
 *
 * @param {TreeNode} tree
 * @param {string} employeeName the employee getting demoted
 * @param {string} subordinateName the new boss
 * @returns {void}
 */
export function demoteEmployee(
  tree: TreeNode,
  employeeName: string,
  subordinateName: string
): void {
  const employee: TreeNode | undefined = getEmployeeNodeByNameBFS(
    tree,
    employeeName
  );
  const subordinate: TreeNode | undefined = getEmployeeNodeByNameBFS(
    tree,
    subordinateName
  );

  if (!employee || !subordinate) {
    console.log("Error: one or both employees do not exist");
    return;
  } else {
    swapSubordinates(employee, subordinate);
    updateBosses(tree, employee, subordinate);
  }

  console.log(
    `[demoteEmployee]: Demoted employee (demoted ${employeeName} and replaced with ${subordinateName})`
  );

  return;
}
