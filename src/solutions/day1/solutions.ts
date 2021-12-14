import { fileToArray } from '../scripts/fileToArray';

const filePath = 'src/solutions/day1/input.txt';
const solutions = [
  // Solution part 1
  () => {
    const array = fileToArray(filePath).map((v) => Number(v));
    const acc = array.reduce(
      (acc, value) => {
        if (acc.previous && acc.previous < value) {
          acc.count++;
        }
        acc.previous = value;
        return acc;
      },
      { previous: 0, count: 0 },
    );
    const res = acc.count.toString();
    return res;
  },
  // Solution part 2
  () => {
    const array = fileToArray(filePath).map((v) => Number(v));
    const acc = array.reduce(
      (acc, value) => {
        if (acc.previous.length < 3) {
          acc.previous.push(value);
          return acc;
        }
        const sum1 = acc.previous.reduce((sum, value) => sum + value, 0);
        acc.previous.push(value);
        acc.previous.shift();
        const sum2 = acc.previous.reduce((sum, value) => sum + value, 0);

        if (sum2 > sum1) {
          acc.count++;
        }
        return acc;
      },
      { previous: [] as number[], count: 0 },
    );
    return acc.count.toString();
  },
];

export default solutions;
