import { fileToArray } from '../scripts/fileToArray';

const filePath = 'src/solutions/day3/input.txt';
const solutions: Array<() => string> = [
  // Solution part 1
  () => {
    const array = fileToArray(filePath);

    const bits = array[0].length;

    const gamma = array
      .reduce((acc, value) => {
        for (let i = 0; i < bits; i++) {
          const bit = parseInt(value.charAt(i));
          // console.log(bit);
          acc[i] += bit;
          // console.log(`Added ${bit} to bit ${i}, acc: ${acc}`);
        }
        return acc;
      }, new Array<number>(bits).fill(0))
      .map((v) => (v >= array.length / 2 ? 1 : 0))
      .reduce((acc, v, i, arr) => {
        acc += v * (0b1 << (arr.length - (i + 1)));
        return acc;
      }, 0 as number);

    const epsilon = array
      .reduce((acc, value) => {
        for (let i = 0; i < bits; i++) {
          const bit = parseInt(value.charAt(i));
          // console.log(bit);
          acc[i] += bit;
          // console.log(`Added ${bit} to bit ${i}, acc: ${acc}`);
        }
        return acc;
      }, new Array<number>(bits).fill(0))
      .map((v) => (v < array.length / 2 ? 1 : 0))
      .reduce((acc, v, i, arr) => {
        acc += v * (0b1 << (arr.length - (i + 1)));
        return acc;
      }, 0 as number);

    // console.log(
    //   bits,
    //   Math.max(gamma.toString(2).length, epsilon.toString(2).length)
    // );

    // console.log(gamma.toString(2).padStart(bits, '0'));
    // console.log(epsilon.toString(2).padStart(bits, '0'));
    // console.log((gamma + epsilon).toString(2).padStart(bits, '0'));
    // console.log(gamma, epsilon);

    return (gamma * epsilon).toString();
  },
  // Solution part 2
  () => {
    console.log('======PART 2=========');
    const array = fileToArray(filePath);
    const bits = array[0].length;

    let oxygenGen = array;

    console.log(`Original array:\n${array.join('\n')}`);

    oxygenGen = genRating(oxygenGen, bits, true);

    let CO2Gen = array;

    CO2Gen = genRating(CO2Gen, bits, false);

    console.log(oxygenGen[0], CO2Gen[0]);
    const oxygen = parseInt(oxygenGen[0], 2);
    const co2 = parseInt(CO2Gen[0], 2);

    console.log(oxygen, co2);

    return (oxygen * co2).toString();
  },
];

function genRating(array: string[], bits: number, isOxy: boolean): string[] {
  for (let i = 0; i < bits; i++) {
    let criteria =
      array.reduce((acc, value) => {
        const bit = parseInt(value.charAt(i));
        return acc + bit;
      }, 0) >=
      array.length / 2
        ? '1'
        : '0';

    if (!isOxy) {
      criteria = criteria === '1' ? '0' : '1';
    }

    console.log(`filtering with criteria: ${criteria}`);

    array = array.filter((v) => {
      return v.charAt(i) === criteria;
    });

    if (array.length === 1) {
      break;
    }

    console.log(`filtered array:\n${array.join('\n')}`);
  }
  return array;
}

export default solutions;
