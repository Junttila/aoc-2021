import { fileToArray } from '../scripts/fileToArray';
import { median } from '../scripts/median';

const filePath = 'src/solutions/day7/input.txt';
const solutions: Array<() => string> = [
  // Solution part 1
  () => {
    const array = fileToArray(filePath);

    const crabs = array[0].split(',').map(Number);
    // console.log(crabs.sort((a, b) => b - a));

    const alignPos = median(crabs, (a, b) => b - a);
    // const alignPos = Math.round(
    //   crabs.reduce((acc, v, _, arr) => acc + v / arr.length, 0)
    // );
    // console.log(alignPos);

    const fuelSum = crabs.reduce((acc, v) => acc + Math.abs(v - alignPos), 0);

    // console.log(fuelSum);

    return fuelSum.toString();
  },
  // Solution part 2
  () => {
    const array = fileToArray(filePath);

    const crabs = array[0].split(',').map(Number);
    const largestDistance = crabs.sort((a, b) => b - a)[0];
    const fuelCosts = new Array<number>(largestDistance);
    fuelCosts[0] = 0;
    for (let i = 1; i <= largestDistance; i++) {
      fuelCosts[i] = fuelCosts[i - 1] + i;
    }
    let lowestFuel = Number.MAX_VALUE;

    for (let i = 1; i <= largestDistance; i++) {
      const fuelSum = crabs.reduce(
        (acc, v) => acc + fuelCosts[Math.abs(v - i)],
        0,
      );
      if (fuelSum < lowestFuel) {
        lowestFuel = fuelSum;
        // console.log('new best fuel:', lowestFuel, 'at position', i);
      }
    }

    // new Array<number>(crabs.sort((a, b) => b - a)[0])
    // .fill(0)
    // .map((_, i, arr) => {
    //   const sum = arr[i - 1 <= 0 ? i : 0] + i;
    //   console.log(sum);
    //   return sum;
    // });

    // console.log(fuelCosts);
    // console.log(crabs.sort((a, b) => b - a));

    // const alignPos = this.median(crabs, (a, b) => fuelCosts[b] - fuelCosts[a]);
    // const alignPos = Math.round(
    //   crabs.reduce((acc, v, _, arr) => acc + v / arr.length, 0)
    // );
    // console.log(alignPos);

    // console.log(fuelSum);
    // WRITE SOLUTION FOR TEST 2
    return lowestFuel.toString();
  },
];

export default solutions;
