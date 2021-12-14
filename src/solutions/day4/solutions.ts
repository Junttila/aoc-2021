import { fileToArray } from '../scripts/fileToArray';

const filePath = 'src/solutions/day4/input.txt';
const solutions: Array<() => string> = [
  // Solution part 1
  () => {
    // console.clear();
    const array = fileToArray(filePath);
    // const array = fileToArray('src/days/4/input.txt');

    const numbers = array[0].split(',');

    const boards = [];

    for (let i = 2; i < array.length; i += 6) {
      const rows = [];
      for (let j = 0; j < 5; j++) {
        const row = array[i + j];
        rows.push(row.split(' ').filter((v) => v !== ''));
      }
      boards.push([...rows]);
    }

    const win = winningBoard(boards, numbers, true);

    const unmarkedSum = win.winningBoard.flat().reduce((acc, v) => {
      const num = parseInt(v);
      if (!isNaN(num)) {
        acc += num;
      }
      return acc;
    }, 0);

    return (unmarkedSum * parseInt(win.winningNumber)).toString();
  },
  // Solution part 2
  () => {
    // console.clear();
    // const array = fileToArray('src/days/4/example.txt');
    const array = fileToArray(filePath);

    const numbers = array[0].split(',');

    const boards = [];

    for (let i = 2; i < array.length; i += 6) {
      const rows = [];
      for (let j = 0; j < 5; j++) {
        const row = array[i + j];
        rows.push(row.split(' ').filter((v) => v !== ''));
      }
      boards.push([...rows]);
    }

    const win = winningBoard(boards, numbers, false);
    // console.log(win);

    const unmarkedSum = win.winningBoard.flat().reduce((acc, v) => {
      const num = parseInt(v);
      if (!isNaN(num)) {
        acc += num;
      }
      return acc;
    }, 0);

    return (unmarkedSum * parseInt(win.winningNumber)).toString();
  },
];

function winningBoard(
  boards: string[][][],
  numbers: string[],
  first: boolean,
): { winningBoard: string[][]; winningNumber: string } {
  let winningBoard: string[][] = null;
  let winningNumber: string = null;
  for (const number of numbers) {
    if (boards.every((b) => !b)) {
      // console.log('all boards have won');
      break;
    }
    // console.log(`drawing ${number}`);
    for (const i in boards) {
      const board = boards[i];
      if (!board) {
        continue;
      }
      for (const row of board) {
        if (row.indexOf(number) > -1) {
          row[row.indexOf(number)] = 'mark';
        }
      }
    }

    for (const i in boards) {
      if (checkIfWin(boards[i], 'mark')) {
        // console.log(`board ${i} won`);
        winningBoard = boards[i];
        winningNumber = number;
        boards[i] = null;
        continue;
      }
    }
    if (first) {
      if (winningBoard || winningNumber) {
        break;
      }
    }
  }
  return {
    winningBoard,
    winningNumber,
  };
}

function checkIfWin(rows: string[][], mark: string) {
  if (!rows) {
    return false;
  }
  if (rows.some((r) => r.every((v) => v === mark))) {
    return true;
  }

  const columns = rows.reduce(
    (cols, row) => {
      row.forEach((v, j) => {
        cols[j].push(v);
      });

      return cols;
    },
    [...Array(5)].map(() => Array(0)),
  );

  if (columns.some((c) => c.every((v) => v === mark))) {
    return true;
  }

  return false;
}

export default solutions;
