import { fileToArray } from '../scripts/fileToArray';
import { setEq } from '../scripts/setEq';
import { setDiff } from '../scripts/setDiff';

const filePath = 'src/solutions/day8/input.txt';
const solutions: Array<() => string> = [
  // Solution part 1
  () => {
    const array = fileToArray(filePath);

    const parsed = array.map((v) => {
      const [sigPattern, output] = v.split(' | ').map((v) => v.split(' '));
      return {
        sigPattern,
        output,
      };
    });
    // console.log(parsed);

    const result = parsed.reduce(
      (acc, s) =>
        acc + s.output.filter((v) => [2, 3, 4, 7].includes(v.length)).length,
      0,
    );

    return result.toString();
  },
  // Solution part 2
  () => {
    const array = fileToArray(filePath);

    // const correctPatterns = [
    //   new Set<string>('abcefg'),
    //   new Set<string>('cf'),
    //   new Set<string>('acdeg'),
    //   new Set<string>('acdfg'),
    //   new Set<string>('bcdf'),
    //   new Set<string>('abdfg'),
    //   new Set<string>('abdefg'),
    //   new Set<string>('acf'),
    //   new Set<string>('abcdefg'),
    //   new Set<string>('abcdfg'),
    // ];
    // console.log(correctPatterns);

    const asSets = array.map((v) => {
      const [sigPattern, output] = v
        .split(' | ')
        .map((v) => v.split(' ').map((v) => new Set(v.split('').sort())));
      return {
        sigPattern,
        output,
      };
    });

    const sum = asSets.reduce((acc, { sigPattern, output }) => {
      const seven = sigPattern.filter((v) => v.size === 3)[0];
      const one = sigPattern.filter((v) => v.size === 2)[0];
      const four = sigPattern.filter((v) => v.size === 4)[0];
      const eight = sigPattern.filter((v) => v.size === 7)[0];

      const three = sigPattern.filter(
        (v) => v.size === 5 && setDiff(v, one).size === 3,
      )[0];

      const six = sigPattern.filter(
        (v) => v.size === 6 && setDiff(v, one).size === 5,
      )[0];

      const nine = sigPattern.filter(
        (v) => v.size === 6 && setDiff(v, three).size === 1,
      )[0];

      const zero = sigPattern.filter(
        (v) => v.size === 6 && !setEq(v, six) && !setEq(v, nine),
      )[0];

      const five = sigPattern.filter(
        (v) => v.size === 5 && setDiff(v, six).size === 0,
      )[0];

      const two = sigPattern.filter(
        (v) => v.size === 5 && !setEq(v, five) && !setEq(v, three),
      )[0];

      const conversion = [
        zero,
        one,
        two,
        three,
        four,
        five,
        six,
        seven,
        eight,
        nine,
      ];

      // console.log(conversion);

      console.log(output);

      // console.log(output.reduce((acc, v) => acc + conversion.indexOf(v), ''));
      const result = output.reduce((acc, v) => {
        for (const i in conversion) {
          if (setEq(conversion[i], v)) {
            return `${acc}${i}`;
          }
        }
        throw { message: 'miss', v };
      }, '');

      console.log(result);
      // console.log(Number(result));
      return acc + Number(result);
    }, 0);

    // console.log(asSets[0].sigPattern[0]);
    return sum.toString();
  },
];

export default solutions;
