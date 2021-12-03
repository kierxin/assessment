# Thought Process

## Installing and Running Program
1. Clone this repo: `git clone https://github.com/kierxin/assessment.git`
2. `cd` into project directory
3. Run `yarn` in terminal
4. Run `yarn start` in terminal

## Logic/Style Decisions / Reasoning
Any noteworthy logic/style decisions you made? If so, what is your reasoning?
    <!-- require new employees to be registered with a name that no current employee already has, since 'boss' values must be unique -->

## Given More Time...
If you had more time, what improvements would you implement?
    <!-- 
    create some form of unique identifier for each employee, so that employee names don't have to be unique (currently, if the names aren't all unique, then you can't identify which boss an employee reports to if multiple people share the same name)
    -->

## Time Complexities
(Bonus) What is the time complexity of each function in your code?

## Merging Similar Functions
(Bonus) There are two functions that have very similar logic and could be merged into one. Which functions do you think can be merged and why?
    <!-- promoteEmployee and demoteEmployee both take an employee and their boss and swap their positions in the company hierarchy -->