import { TreeNode } from "./manageEmployees";

export function getEmployeeNodeByNameBFS(
  tree: TreeNode,
  boss: string | null
): TreeNode | undefined {
  const queue = [tree];

  while (queue.length > 0) {
    const currentNode = queue.shift();

    if (currentNode) {
      if (currentNode.value.name === boss) return currentNode;
      queue.push(...currentNode.descendants);
    }
  }

  return;
}

export function getEmployeeNodeByIdBFS(
  tree: TreeNode,
  id: number
): TreeNode | undefined {
  const queue = [tree];

  while (queue.length > 0) {
    const currentNode = queue.shift();

    if (currentNode) {
      if (currentNode.value.id === id) return currentNode;
      queue.push(...currentNode.descendants);
    }
  }

  return;
}

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
  const employee = getEmployeeNodeByNameBFS(tree, employeeName);
  let boss: TreeNode | undefined;

  if (employee) boss = getEmployeeNodeByNameBFS(tree, employee.value.boss);

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
  const employee: TreeNode | undefined = getEmployeeNodeByNameBFS(
    tree,
    employeeName
  );

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
 * @returns {TreeNode}
 */
export function findLowestEmployee(tree: TreeNode) {
  let lowestLeaf: TreeNode = tree;
  let deepestDepth: number = 1;

  const queue = [tree];

  while (queue.length) {
    const currentNode = queue.shift() as TreeNode;
    lowestLeaf = currentNode;

    if (currentNode.descendants.length > 0) {
      queue.push(...currentNode.descendants);
    }
  }

  deepestDepth = findHeight(tree, lowestLeaf) as number;

  console.log(
    `The lowest-ranking employee is ${lowestLeaf.value.name}, at ${deepestDepth} ranks down in the organization`
  );
  return [lowestLeaf, deepestDepth];
}

function findHeight(
  tree: TreeNode,
  leaf: TreeNode,
  currentHeight: number = 1,
  height: number[] = []
) {
  if (tree.value.name === leaf.value.name) height.push(currentHeight);

  tree.descendants.forEach((node) => {
    findHeight(node, leaf, currentHeight + 1, height);
  });

  return height[0];
}
