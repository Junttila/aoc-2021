import { fileToArray } from '../scripts/fileToArray';

const filePath = 'src/solutions/day9/input.txt';
const solutions: Array<() => string> = [
  // Solution part 1
  () => {
    const array = fileToArray(filePath);

    const map2D = array.map((v) => v.split(''));
    // console.log(map2D.map((v) => v.join(',')));
    const lowPoints: boolean[][] = new Array<boolean[]>(map2D.length).fill(
      new Array<boolean>(map2D[0].length).fill(false),
    );
    const riskValues: number[] = [];

    for (let y = 0; y < map2D.length; y++) {
      for (let x = 0; x < map2D[y].length; x++) {
        const point = Number(map2D[y][x]);
        const adjacents = [
          y >= 1 ? Number(map2D[y - 1][x]) : 10,
          y < map2D.length - 1 ? Number(map2D[y + 1][x]) : 10,
          x >= 1 ? Number(map2D[y][x - 1]) : 10,
          x < map2D[y].length - 1 ? Number(map2D[y][x + 1]) : 10,
        ];
        const lowPoint = adjacents.every((v) => v > point);
        // console.log(point, adjacents, lowPoint);

        if (lowPoint) {
          riskValues.push(point + 1);
        }

        lowPoints[y][x] = lowPoint;
      }
    }
    // console.log(lowPoints);
    // console.log(riskValues);
    const sum = riskValues.reduce((acc, v) => acc + v, 0);

    return sum.toString();
  },
  // Solution part 2
  () => {
    const array = fileToArray(filePath);

    const map2D = array.map((v) => v.split(''));
    // console.log(map2D.map((v) => v.join(',')));
    const lowPoints: boolean[][] = new Array<boolean[]>(map2D.length).fill(
      new Array<boolean>(map2D[0].length).fill(false),
    );

    const lowPointCoords: Coordinate[] = [];

    for (let y = 0; y < map2D.length; y++) {
      for (let x = 0; x < map2D[y].length; x++) {
        const point = Number(map2D[y][x]);
        const adjacents = [
          y >= 1 ? Number(map2D[y - 1][x]) : 10,
          y < map2D.length - 1 ? Number(map2D[y + 1][x]) : 10,
          x >= 1 ? Number(map2D[y][x - 1]) : 10,
          x < map2D[y].length - 1 ? Number(map2D[y][x + 1]) : 10,
        ];
        const lowPoint = adjacents.every((v) => v > point);
        // console.log(point, adjacents, lowPoint);
        if (lowPoint) {
          lowPointCoords.push(`${x},${y}`);
        }

        lowPoints[y][x] = lowPoint;
      }
    }
    // console.log(lowPointCoords);

    const basins = new Map<Coordinate, Set<Coordinate>>();

    lowPointCoords.forEach((p) => {
      basins.set(
        p,
        searchBasin(map2D, p, new Set<Coordinate>()) ||
          new Set<Coordinate>([p]),
      );
    });

    // console.log(basins);
    const result = Array.from(basins.values())
      .sort((a, b) => b.size - a.size)
      .slice(0, 3)
      .reduce((acc, v) => acc * v.size, 1);

    // console.log(lowPoints);
    // console.log(riskValues);

    return result.toString();
  },
];

type Coordinate = string;

function searchBasin(
  map: string[][],
  coord: Coordinate,
  searched: Set<Coordinate>,
): Set<Coordinate> {
  const [x, y] = coord.split(',').map(Number);

  if (Number(map[y][x]) >= 9 || searched.has(coord)) {
    return searched;
  }
  searched.add(coord);
  const currentValue = Number(map[y][x]);
  const adjacents = [
    y >= 1
      ? Number(map[y - 1][x]) > currentValue
        ? coordToString({ y: y - 1, x })
        : ''
      : '',
    y < map.length - 1
      ? Number(map[y + 1][x]) > currentValue
        ? coordToString({ y: y + 1, x })
        : ''
      : '',
    x >= 1
      ? Number(map[y][x - 1]) > currentValue
        ? coordToString({ y, x: x - 1 })
        : ''
      : '',
    x < map[y].length - 1
      ? Number(map[y][x + 1]) > currentValue
        ? coordToString({ y, x: x + 1 })
        : ''
      : '',
  ];

  return setUnion(
    ...adjacents
      .filter((v) => v.length !== 0)
      .map((v) => {
        return searchBasin(map, v as Coordinate, searched);
      }),
  );
}

function coordToString({ x, y }: { x: number; y: number }) {
  return `${x},${y}`;
}

function setUnion<T>(...sets: Set<T>[]) {
  return sets.reduce((acc, s) => {
    for (const v of Array.from(s || [])) {
      acc.add(v);
    }
    return acc;
  }, new Set<T>());
}

export default solutions;
