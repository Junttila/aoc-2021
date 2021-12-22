import { fileToArray } from '../scripts/fileToArray';

const filePath = 'src/solutions/day11/input.txt';
const solutions: Array<() => string> = [
  // Solution part 1
  () => {
    let octoMap = fileToArray(filePath).map((v) => v.split('').map(Number));
    // console.log(octoMap.join('\n'));

    const height = octoMap.length;
    const width = octoMap[0].length;

    let flashCount = 0;

    let steps = 100;

    while (steps > 0) {
      const newMap = new Array(...octoMap).map((v) => v.map((u) => u + 1));
      const flashes = newMap.map((v) => v.map((_) => false));
      let recentFlash = false;

      do {
        recentFlash = false;
        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            if (!flashes[y][x] && newMap[y][x] > 9) {
              // console.log(x, y, 'flashes');
              flashes[y][x] = true;
              recentFlash = true;
              flashCount++;

              if (y - 1 >= 0) {
                newMap[y - 1][x]++;
                if (x - 1 >= 0) {
                  newMap[y - 1][x - 1]++;
                }
                if (x + 1 < width) {
                  newMap[y - 1][x + 1]++;
                }
              }
              if (y + 1 < height) {
                newMap[y + 1][x]++;
                if (x + 1 < width) {
                  newMap[y + 1][x + 1]++;
                }
                if (x - 1 >= 0) {
                  newMap[y + 1][x - 1]++;
                }
              }
              if (x - 1 >= 0) {
                newMap[y][x - 1]++;
              }
              if (x + 1 < width) {
                newMap[y][x + 1]++;
              }
            }
          }
        }
      } while (recentFlash);

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          if (flashes[y][x]) {
            newMap[y][x] = 0;
          }
        }
      }

      // console.log();
      // console.log(newMap.join('\n'));
      octoMap = new Array(...newMap);

      steps--;
    }

    console.log('flashes:', flashCount);

    return flashCount.toString();
  },
  // Solution part 2
  () => {
    let octoMap = fileToArray(filePath).map((v) => v.split('').map(Number));

    const height = octoMap.length;
    const width = octoMap[0].length;

    let sync = false;
    let stepsToSync = 0;

    while (!sync) {
      const newMap = new Array(...octoMap).map((v) => v.map((u) => u + 1));
      const flashes = newMap.map((v) => v.map((_) => false));
      let recentFlash = false;

      do {
        recentFlash = false;
        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            if (!flashes[y][x] && newMap[y][x] > 9) {
              // console.log(x, y, 'flashes');
              flashes[y][x] = true;
              recentFlash = true;

              if (y - 1 >= 0) {
                newMap[y - 1][x]++;
                if (x - 1 >= 0) {
                  newMap[y - 1][x - 1]++;
                }
                if (x + 1 < width) {
                  newMap[y - 1][x + 1]++;
                }
              }
              if (y + 1 < height) {
                newMap[y + 1][x]++;
                if (x + 1 < width) {
                  newMap[y + 1][x + 1]++;
                }
                if (x - 1 >= 0) {
                  newMap[y + 1][x - 1]++;
                }
              }
              if (x - 1 >= 0) {
                newMap[y][x - 1]++;
              }
              if (x + 1 < width) {
                newMap[y][x + 1]++;
              }
            }
          }
        }
      } while (recentFlash);

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          if (flashes[y][x]) {
            newMap[y][x] = 0;
          }
        }
      }

      sync = flashes.flat().every((v) => v);

      stepsToSync++;

      // console.log('sync:', sync);
      // console.log(newMap.join('\n'));
      octoMap = new Array(...newMap);
    }

    console.log('steps to sync:', stepsToSync);

    return stepsToSync.toString();
  },
];

export default solutions;
