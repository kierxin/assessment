import { TreeNode, nodeFromBFS } from "./manageEmployees";

/**
 * Given an employee, will find the node above (if any).
 *
 * @param {TreeNode} tree
 * @param {string} employeeName
 * @returns {TreeNode}
 */
export function getBoss(
  tree: TreeNode,
  employeeName: string
): TreeNode | undefined {
  const employee = nodeFromBFS(tree, employeeName);
  let boss: TreeNode | undefined;

  if (employee) boss = nodeFromBFS(tree, employee.value.boss);

  if (boss) {
    console.log(`[getBoss]: ${employeeName}'s boss is ${boss.value.name}`);
    return boss;
  }

  console.log("[getBoss]: Employee is the top boss!");
  return;
}

/**
 * Given an employee, will find the nodes directly below (if any).
 * Notice how it returns possibly several subordinates.
 *
 * @param {TreeNode} tree
 * @param {string} employeeName
 * @returns {TreeNode[]}
 */
export function getSubordinates(
  tree: TreeNode,
  employeeName: string
): Array<TreeNode> {
  let subordinates: Array<TreeNode> = [];
  const employee: TreeNode | undefined = nodeFromBFS(tree, employeeName);

  if (employee) {
    subordinates = employee.descendants;
    const subordinatesNames: Array<string> = subordinates.map((subordinate) => {
      return subordinate.value.name;
    });

    console.log(
      `[getSubordinates]: ${employeeName}'s subordinates are ${subordinatesNames.join(
        " "
      )}`
    );
  }

  return subordinates;
}

/**
 * EXTRA CREDIT:
 * Finds and returns the lowest-ranking employee and the tree node's depth index.
 *
 * @param {TreeNode} tree
 * @param {string} employeeName
 * @returns {TreeNode}
 */
function findLowestEmployee() {}
