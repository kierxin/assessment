# Thought Process

## Installing and Running Program
1. Clone this repo: `git clone https://github.com/kierxin/assessment.git`
2. `cd` into project directory (`cd assessment`)
3. Run `yarn` in terminal
4. Run `yarn start` in terminal

## Logic/Style Decisions / Reasoning
- Use closure to generate a unique ID for every employee; otherwise, each employee's name would have to be unique since the program would rely on names to identify who an employee's boss is
- Use BFS (breadth-first search) to traverse tree when searching for a boss or employee since the company is small (target node is probably fairly close to the root) 
- Use DFS (depth-first search) to find lowest employee since the node isn't near the top of the tree (especially if the company hierarchy gains even more levels
- If the company hierarchy grows very wide, BFS will become more memory intensive so in that case it would be good to switch to DFS

## Given More Time, I Would...
- Create a user interface so the user can choose an action (hireEmployee, fireEmployee, getBoss, etc) and arguments for the action to be executed

## Time Complexities
(Bonus) What is the time complexity of each function in your code?

## Merging Similar Functions
There are two functions that have very similar logic and could be merged into one. Which functions do you think can be merged and why?
- promoteEmployee and demoteEmployee both take two people (an employee and their boss) and swap their positions in the company hierarchy, so they could be merged.