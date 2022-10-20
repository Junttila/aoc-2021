import { fileToArray } from '../scripts/fileToArray';

const filePath = 'src/solutions/day17/input.txt';
const solutions: Array<() => string> = [
  // Solution part 1
  () => {
    const input = fileToArray(filePath)[0];
    const target: { x: number[]; y: number[] } = {
      x: [
        Number.parseInt(input.split('..')[0].split('=')[1]),
        Number.parseInt(input.split('..')[1].split(',')[0]),
      ],
      y: [
        Number.parseInt(input.split('..')[1].split('=')[1]),
        Number.parseInt(input.split('..')[2]),
      ],
    };
    const minX = minReqX(target.x[0]);
    const maxX = target.x[1];
    const maxY = Math.abs(target.y[0]) - 1;
    const minY = target.y[0];
    const v = { x: minX, y: maxY };
    const shot = shoot(v, target);

    const peak = Math.max(...shot.steps.map((s) => s.y));

    return peak.toString();
  },
  // Solution part 2
  () => {
    const input = fileToArray(filePath)[0];
    const target: { x: number[]; y: number[] } = {
      x: [
        Number.parseInt(input.split('..')[0].split('=')[1]),
        Number.parseInt(input.split('..')[1].split(',')[0]),
      ],
      y: [
        Number.parseInt(input.split('..')[1].split('=')[1]),
        Number.parseInt(input.split('..')[2]),
      ],
    };
    const minX = minReqX(target.x[0]);
    const maxX = target.x[1];
    const maxY = Math.abs(target.y[0]) - 1;
    const minY = target.y[0];
    console.log({ minX, maxX, maxY });

    const hits: Array<{ x: number; y: number }> = [];

    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y++) {
        if (shoot({ x, y }, target).hit) {
          hits.push({ x, y });
        }
      }
    }

    return hits.length.toString();
  },
];

export default solutions;

function shoot(
  v: { x: number; y: number },
  target: { x: number[]; y: number[] },
  log: boolean = false,
): { hit: boolean; steps: { x: number; y: number }[] } {
  log ? console.log('velocity:', v) : 0;
  const pos: { x: number; y: number } = { x: 0, y: 0 };
  let miss = false;
  let hit = false;
  const steps: Array<{ x: number; y: number }> = [];
  while (!(miss || hit)) {
    if (pos.x > target.x[1] || pos.y < target.y[0]) {
      miss = true;
      continue;
    } else if (pos.x >= target.x[0] && pos.y <= target.y[1]) {
      hit = true;
      continue;
    }
    log ? console.log(pos) : 0;

    pos.x += v.x;
    pos.y += v.y;

    steps.push({ ...pos });

    v.x = v.x <= 0 ? 0 : v.x - 1;
    v.y -= 1;
  }
  log ? console.log(hit ? 'HIT!' : 'MISS!') : 0;
  return { hit, steps };
}

function minReqX(x: number) {
  const n = (1 / 2) * (Math.sqrt(8 * x + 1) - 1);
  return Math.floor(n + 1);
}
