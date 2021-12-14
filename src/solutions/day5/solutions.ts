import { fileToArray } from '../scripts/fileToArray';

const filePath = 'src/solutions/day5/input.txt';
const solutions: Array<() => string> = [
  // Solution part 1
  () => {
    const array = fileToArray(filePath);
    // const array = fileToArray('src/days/5/example.txt');
    const gridSize =
      Math.max(
        ...array
          .map((a) => a.replace(' -> ', ',').split(','))
          .flat()
          .map((v) => parseInt(v)),
      ) + 1;
    // console.log(gridSize);

    const lineGrid = [...Array(gridSize)].map(() =>
      Array<number>(gridSize).fill(0),
    );

    const lines = array
      .map((l) => {
        const points = l.split(' -> ');
        const [x1, y1] = points[0].split(',');
        const [x2, y2] = points[1].split(',');
        // console.log(l, x1, y1, x2, y2);
        return {
          from: {
            x: parseInt(x1),
            y: parseInt(y1),
          },
          to: {
            x: parseInt(x2),
            y: parseInt(y2),
          },
        };
      })
      .filter((l) => l.from.x === l.to.x || l.from.y === l.to.y); // filter part 1

    // console.log(lines);
    for (const l of lines) {
      // console.log('drawing line: ', index, l);
      if (l.from.x === l.to.x) {
        // console.log('vertical line');
        if (l.to.y >= l.from.y) {
          for (let i = l.from.y; i <= l.to.y; i++) {
            lineGrid[i][l.from.x]++;
          }
        } else {
          for (let i = l.from.y; i >= l.to.y; i--) {
            lineGrid[i][l.from.x]++;
          }
        }
      } else if (l.from.y === l.to.y) {
        // console.log('horizontal line');
        if (l.to.x >= l.from.x) {
          for (let i = l.from.x; i <= l.to.x; i++) {
            lineGrid[l.from.y][i]++;
          }
        } else {
          for (let i = l.from.x; i >= l.to.x; i--) {
            lineGrid[l.from.y][i]++;
          }
        }
      }
      // console.log(lineGrid.join('\n'));
    }

    // console.log(lines);
    // console.log(lineGrid.join('\n'));

    return lineGrid
      .flat()
      .reduce((acc, v) => acc + (v > 1 ? 1 : 0), 0)
      .toString();
  },
  // Solution part 2
  () => {
    const array = fileToArray(filePath);
    // const array = fileToArray('src/days/5/example.txt');
    const gridSize =
      Math.max(
        ...array
          .map((a) => a.replace(' -> ', ',').split(','))
          .flat()
          .map((v) => parseInt(v)),
      ) + 1;
    // console.log(gridSize);

    const lineGrid = [...Array(gridSize)].map(() =>
      Array<number>(gridSize).fill(0),
    );

    const lines = array.map((l) => {
      const points = l.split(' -> ');
      const [x1, y1] = points[0].split(',');
      const [x2, y2] = points[1].split(',');
      // console.log(l, x1, y1, x2, y2);
      return {
        from: {
          x: parseInt(x1),
          y: parseInt(y1),
        },
        to: {
          x: parseInt(x2),
          y: parseInt(y2),
        },
      };
    });
    // .filter((l) => l.from.x === l.to.x || l.from.y === l.to.y); // filter part 1

    // console.log(lines);
    for (const l of lines) {
      // console.log('drawing line: ', index, l);
      if (l.from.x === l.to.x) {
        // console.log('vertical line');
        if (l.to.y >= l.from.y) {
          for (let i = l.from.y; i <= l.to.y; i++) {
            lineGrid[i][l.from.x]++;
          }
        } else {
          for (let i = l.from.y; i >= l.to.y; i--) {
            lineGrid[i][l.from.x]++;
          }
        }
      } else if (l.from.y === l.to.y) {
        // console.log('horizontal line');
        if (l.to.x >= l.from.x) {
          for (let i = l.from.x; i <= l.to.x; i++) {
            lineGrid[l.from.y][i]++;
          }
        } else {
          for (let i = l.from.x; i >= l.to.x; i--) {
            lineGrid[l.from.y][i]++;
          }
        }
      } else {
        // console.log('diagonal line');
        if (l.from.x < l.to.x && l.from.y < l.to.y) {
          for (let i = l.from.x, j = l.from.y; i <= l.to.x; i++, j++) {
            lineGrid[j][i]++;
          }
        } else if (l.from.x > l.to.x && l.from.y < l.to.y) {
          for (let i = l.from.x, j = l.from.y; i >= l.to.x; i--, j++) {
            lineGrid[j][i]++;
          }
        } else if (l.from.x < l.to.x && l.from.y > l.to.y) {
          for (let i = l.from.x, j = l.from.y; i <= l.to.x; i++, j--) {
            lineGrid[j][i]++;
          }
        } else if (l.from.x > l.to.x && l.from.y > l.to.y) {
          for (let i = l.from.x, j = l.from.y; i >= l.to.x; i--, j--) {
            lineGrid[j][i]++;
          }
        }
      }
      // console.log(lineGrid.join('\n'));
    }

    // console.log(lines);
    // console.log(lineGrid.join('\n'));

    return lineGrid
      .flat()
      .reduce((acc, v) => acc + (v > 1 ? 1 : 0), 0)
      .toString();
  },
];

export default solutions;
