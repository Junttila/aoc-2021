import { fileToArray } from '../scripts/fileToArray';

const filePath = 'src/solutions/day12/input.txt';
const solutions: Array<() => string> = [
  // Solution part 1
  () => {
    const array = fileToArray(filePath);
    // const array = fileToArray('src/days/12/input.txt');

    const graph = array.reduce((graph, conn) => {
      const [from, to] = conn.split('-');

      if (!graph[from]) {
        graph[from] = new Set<string>();
      }
      if (!graph[to]) {
        graph[to] = new Set<string>();
      }

      graph[from].add(to);
      graph[to].add(from);

      return graph;
    }, {} as { [s: string]: Set<string> });

    // console.log(graph);
    const paths: string[][] = [];
    // console.log(this.search(graph, ['start'], 'end', paths));
    search(graph, ['start'], 'end', paths);
    // console.log(paths.join('\n'));
    return paths.length.toString();
  },
  // Solution part 2
  () => {
    const array = fileToArray(filePath);
    // const array = fileToArray('src/days/12/input.txt');

    const graph = array.reduce((graph, conn) => {
      const [from, to] = conn.split('-');

      if (!graph[from]) {
        graph[from] = new Set<string>();
      }
      if (!graph[to]) {
        graph[to] = new Set<string>();
      }

      graph[from].add(to);
      graph[to].add(from);

      return graph;
    }, {} as { [s: string]: Set<string> });

    // console.log(graph);
    const paths: string[][] = [];
    // console.log(this.search(graph, ['start'], 'end', paths));
    search(graph, ['start'], 'end', paths, true);
    // console.log(paths.join('\n'));
    return paths.length.toString();
  },
];

function search(
  graph: { [s: string]: Set<string> },
  visited: string[],
  goal: string,
  paths: string[][],
  part2 = false,
) {
  const currentNode = visited[visited.length - 1];

  if (currentNode === goal) {
    // console.log(`found path: ${visited}`);
    return visited;
  }

  const possibleNodes = graph[currentNode];

  const visitedUniqueSmallCaves = Array.from(new Set<string>(visited)).filter(
    (v) => !(v.charCodeAt(0) >= 65 && v.charCodeAt(0) <= 90),
  );
  const visitedSmallCaves = visited.filter(
    (v) => !(v.charCodeAt(0) >= 65 && v.charCodeAt(0) <= 90),
  );

  for (const node of Array.from(possibleNodes)) {
    let smallCaveSkip =
      part2 && visitedSmallCaves.length === visitedUniqueSmallCaves.length;

    // console.log(`\ncurrent path: ${visited}`);

    // console.log(`checking ${node}, cave skip: ${smallCaveSkip}`);
    const largeCave = node.charCodeAt(0) >= 65 && node.charCodeAt(0) <= 90;
    if (
      node === 'start' ||
      (!smallCaveSkip && !largeCave && visited.indexOf(node) > -1)
    ) {
      // console.log(`${node} already visited`);
      continue;
    }
    if (smallCaveSkip && !largeCave && visited.indexOf(node) > -1) {
      // console.log('small cave skip used');
      smallCaveSkip = false;
    }
    // console.log(`searching ${node}`);
    const finished = search(graph, [...visited, node], goal, paths, part2);
    if (finished) {
      paths.push(finished);
    }
  }
  return null;
}

export default solutions;
