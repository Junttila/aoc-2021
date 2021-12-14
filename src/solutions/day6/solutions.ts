import { fileToArray } from '../scripts/fileToArray';

const filePath = 'src/solutions/day6/input.txt';
const SPAWN_DAYS = 8;
const RECOVERY_DAYS = 6;

const solutions: Array<() => string> = [
  // Solution part 1
  () => {
    const array = fileToArray(filePath);

    const state = array[0].split(',').map((v) => parseInt(v));

    // const memo = new Map<[number, number], number>();
    // const totalFish = state.reduce((acc, v) => {
    //   return acc + simulate(v, 80, memo);
    // }, 0);

    const totalFish2 = simulate2(state, 80);
    // const newState = this.simulate(state, 80);
    // console.log(newState.length);
    // console.log(newState);
    return totalFish2.toString();
  },
  // Solution part 2
  () => {
    const array = fileToArray(filePath);

    const state = array[0].split(',').map((v) => parseInt(v));

    // const memo = new Map<[number, number], number>();
    // const totalFish = state.reduce((acc, v) => {
    //   return acc + this.simulate2(v, 256, memo);
    // }, 0);

    const totalFish2 = simulate2(state, 256);
    // const newState = this.simulate(state, 80);
    // console.log(newState.length);
    // console.log(newState);
    return totalFish2.toString();
  },
];

function simulate(
  untilBirth: number,
  daysLeft: number,
  memo: Map<[number, number], number>,
): number {
  const precalculated = memo.get([untilBirth, daysLeft]);
  if (precalculated) {
    return precalculated;
  }
  if (untilBirth >= daysLeft) {
    // console.log({ untilBirth, daysLeft });
    memo.set([untilBirth, daysLeft], 1);
    return 1;
  }
  const nextDay = daysLeft - untilBirth - 1;
  const child = simulate(SPAWN_DAYS, nextDay, memo); // Me
  const current = simulate(RECOVERY_DAYS, nextDay, memo); // Child

  memo.set([SPAWN_DAYS, nextDay], child);
  memo.set([RECOVERY_DAYS, nextDay], current);

  memo.set([untilBirth, daysLeft], child + current);

  return memo.get([untilBirth, daysLeft]) as number;

  // let newFish = 0;

  // state = state.map((f) => {
  //   // O(n)
  //   if (f < 1) {
  //     newFish++;
  //     return 7;
  //   }
  //   return f;
  // });
  // state = state.concat(new Array<number>(newFish).fill(9)).map((f) => f - 1); // O(n)
}

function simulate2(input: number[], days: number) {
  let fish: number[] = [];

  input.forEach((f) => (fish[f] = (fish[f] || 0) + 1));

  for (let i = 0; i < days; i++) {
    const newFish = [];
    newFish[0] = fish[1] || 0;
    newFish[1] = fish[2] || 0;
    newFish[2] = fish[3] || 0;
    newFish[3] = fish[4] || 0;
    newFish[4] = fish[5] || 0;
    newFish[5] = fish[6] || 0;
    newFish[6] = (fish[0] || 0) + (fish[7] || 0); // both 7 and 0 generates 6
    newFish[7] = fish[8] || 0;
    newFish[8] = fish[0] || 0;

    fish = newFish;
  }

  return fish.reduce((a, b) => a + b, 0);
}

export default solutions;
