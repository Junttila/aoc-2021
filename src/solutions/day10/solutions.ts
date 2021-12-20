import { fileToArray } from '../scripts/fileToArray';
import { median } from '../scripts/median';

const filePath = 'src/solutions/day10/input.txt';

type OpeningChar = '{' | '[' | '(' | '<';
type ClosingChar = '}' | ']' | ')' | '>';
type BracketChar = OpeningChar | ClosingChar;

const closingChars = {
  '{': '}',
  '[': ']',
  '(': ')',
  '<': '>',
};

const errorPoints = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};

const completionPoints = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
};

const solutions: Array<() => string> = [
  // Solution part 1
  () => {
    const lines = fileToArray(filePath).map((l) =>
      l.split(''),
    ) as BracketChar[][];

    // console.log(lines);

    const errors = lines
      .map((l) => isCorrupt(l).unexpectedClosings[0] || null)
      .filter((v) => v);

    // console.log(errors);

    const result = errors.reduce((acc, v) => acc + errorPoints[v], 0);

    return result.toString();
  },
  // Solution part 2
  () => {
    const lines = fileToArray(filePath).map((l) =>
      l.split(''),
    ) as BracketChar[][];

    const checkedLines = lines.map((v) => isCorrupt(v));
    const incompleteLines = checkedLines.filter(
      (v) => !v.unexpectedClosings[0],
    );

    // console.log(incompleteLines);

    const points = incompleteLines.map((v) => {
      let p = 0;
      while (v.closingsLeft.length > 0) {
        p *= 5;
        const closing = v.closingsLeft.pop();
        p += completionPoints[closing as ClosingChar];
      }
      return p;
    });
    // console.log(points);

    const medianPoints = median(points, (a, b) => b - a);
    // console.log(medianPoints);

    return medianPoints.toString();
  },
];

function isCorrupt(line: BracketChar[]) {
  const unexpectedClosings: ClosingChar[] = [];
  const openingChars = Object.keys(closingChars);
  const closingsLeft: string[] = [];
  for (const char of line) {
    const expectedClosing = closingsLeft[closingsLeft.length - 1];
    if (openingChars.indexOf(char) > -1) {
      // if opening char
      closingsLeft.push(closingChars[char as OpeningChar]);
    } else if (char === expectedClosing) {
      closingsLeft.pop();
    } else {
      unexpectedClosings.push(char as ClosingChar);
    }
    // console.log(expectedClosings);
  }
  return { unexpectedClosings, closingsLeft };
}

export default solutions;
