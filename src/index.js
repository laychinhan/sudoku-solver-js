/**
 * @param {number[]} nums
 * @return {number}
 */
/**
 * @param {string} s
 * @return {number}
 */
var solveSudoku = function (board) {
  solve(board);
};

function solve(grid, row = 0, column = 0) {
  if (row === 9) {
    return true;
  } else if (column === 9) {
    return solve(grid, row + 1, 0);
  } else if (grid[row][column] !== ".") {
    return solve(grid, row, column + 1);
  } else {
    for (let i = 1; i <= 9; i++) {
      if (isValid(grid, row, column, i)) {
        grid[row][column] = i.toString();
        if (solve(grid, row, column + 1)) {
          return true;
        }
        grid[row][column] = ".";
      }
    }
  }
  return false;
}

function isValid(grid, row, column, value) {
  // diagonal + horizontal
  for (let i = 0; i < 9; i++) {
    if (value.toString() === grid[row][i]) return false;
    if (value.toString() === grid[i][column]) return false;
  }
  // 3x3 search quadrant
  let rowQ = Math.floor(row / 3);
  let colQ = Math.floor(column / 3);
  let pool = [
    grid[rowQ * 3][colQ * 3],
    grid[rowQ * 3][colQ * 3 + 1],
    grid[rowQ * 3][colQ * 3 + 2],
    grid[rowQ * 3 + 1][colQ * 3],
    grid[rowQ * 3 + 1][colQ * 3 + 1],
    grid[rowQ * 3 + 1][colQ * 3 + 2],
    grid[rowQ * 3 + 2][colQ * 3],
    grid[rowQ * 3 + 2][colQ * 3 + 1],
    grid[rowQ * 3 + 2][colQ * 3 + 2]
  ];
  if (pool.includes(value.toString)) return false;
  return true;
}

const board = [
  ["5", "3", ".", ".", "7", ".", ".", ".", "."],
  ["6", ".", ".", "1", "9", "5", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "5"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"]
];
console.clear();
solveSudoku(board);
console.table(board);
