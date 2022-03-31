import { fileToArray } from '../scripts/fileToArray';

const filePath = 'src/solutions/day13/example.txt';
const solutions: Array<() => string> = [
  // Solution part 1
  () => {
    const array = fileToArray(filePath);

    const splitPoint = array.indexOf('');

    const dots = array
      .slice(0, splitPoint)
      .map((s) => s.split(',').map(Number));
    const folds = array.slice(splitPoint + 1).map((s) => {
      const [along, index] = s.slice(s.length - 3).split('=');
      return { along, index };
    });

    console.log(dots, folds);
    console.log(paperToString(dots, [11, 15]));

    return '';
  },
  // Solution part 2
  () => {
    return '';
  },
];

function paperToString(points: number[][], [x, y]: number[]) {
  const paper = new Array(y).fill('').map(() => {
    return new Array<string>(x).fill('.');
  });

  points.forEach(([x, y]) => {
    paper[y][x] = '#';
  });

  return paper.map((v) => v.join('')).join('\n');
}

export default solutions;
