import { fileToArray } from '../scripts/fileToArray';

const filePath = 'src/solutions/day2/input.txt';
const solutions: Array<() => string> = [
  // Solution part 1
  () => {
    const array = fileToArray(filePath);

    const res = array.reduce(
      (pos, cmd) => {
        const [direction, amount] = cmd.split(' ');
        const distance = Number(amount);
        switch (direction) {
          case 'forward':
            pos.x += distance;
            break;
          case 'up':
            pos.y -= distance;
            break;
          case 'down':
            pos.y += distance;
            break;
        }
        return pos;
      },
      { x: 0, y: 0 },
    );
    return (res.x * res.y).toString();
  },
  // Solution part 2
  () => {
    const array = fileToArray(filePath);

    const res = array.reduce(
      (pos, cmd) => {
        const [direction, amount] = cmd.split(' ');
        const distance = Number(amount);
        switch (direction) {
          case 'forward':
            pos.x += distance;
            pos.y += pos.aim * distance;
            break;
          case 'up':
            pos.aim -= distance;
            break;
          case 'down':
            pos.aim += distance;
            break;
        }
        return pos;
      },
      { x: 0, y: 0, aim: 0 },
    );
    return (res.x * res.y).toString();
  },
];

export default solutions;
