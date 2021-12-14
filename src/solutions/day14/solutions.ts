import { fileToArray } from '../scripts/fileToArray';

const filePath = 'src/solutions/day14/input.txt';
const solutions: Array<() => string> = [
  // Solution part 1
  () => {
    const array = fileToArray(filePath);
    // console.log(array);

    let template = array[0].split('');

    const rules = array.slice(2, array.length).reduce((acc, v) => {
      acc[v.slice(0, 2)] = v.slice(6, 7);
      return acc;
    }, {} as { [s: string]: string });

    // console.log(rules);
    let steps = 10;
    while (steps > 0) {
      let newTemplate = Array.from(template);
      for (let i = 1; i < template.length; i++) {
        // console.log(newTemplate);
        const pair = template.slice(i - 1, i + 1).join('');
        // console.log(
        //   'putting',
        //   rules[pair],
        //   'between',
        //   newTemplate.slice(0, i * 2 - 1),
        //   'and',
        //   newTemplate.slice(i * 2 - 1),
        // );
        newTemplate = [
          ...newTemplate.slice(0, i * 2 - 1),
          rules[pair],
          ...newTemplate.slice(i * 2 - 1),
        ];
      }
      template = newTemplate;
      // console.log(template);
      steps--;
    }
    // console.log(template.join(''));
    // console.log(template.length);

    const quantities = template.reduce((acc, v) => {
      if (!acc[v]) {
        acc[v] = 0;
      }
      acc[v] += 1;
      return acc;
    }, {} as { [s: string]: number });
    // console.log(template);
    // console.log(quantities);

    const diff =
      Object.values(quantities).sort((a, b) => b - a)[0] -
      Object.values(quantities).sort((a, b) => a - b)[0];
    return diff.toString();
  },
  // Solution part 2
  () => {
    const array = fileToArray(filePath);
    // console.log(array);

    let template = array[0].split('');

    const first = template[0];
    const last = template[template.length - 1];

    const rules = array.slice(2, array.length).reduce((acc, v) => {
      acc[v.slice(0, 2)] = v.slice(6, 7);
      return acc;
    }, {} as { [s: string]: string });

    let pairs: { [s: string]: number } = template.reduce((acc, _, i, arr) => {
      if (i === 0) {
        return acc;
      }
      const pair = arr.slice(i - 1, i + 1).join('');
      if (!acc[pair]) {
        acc[pair] = 0;
      }
      acc[pair] += 1;
      return acc;
    }, {} as { [s: string]: number });
    // console.log(pairs);

    for (const r in rules) {
      pairs[r] = pairs[r] ? pairs[r] : 0;
    }

    let steps = 40;
    while (steps > 0) {
      const newPairs = { ...pairs };
      for (const [key, value] of Object.entries(rules)) {
        // console.log(newPairs);
        if (!pairs[key]) {
          pairs[key] = 0;
          // console.log(pairs[key]);
        }
        // console.log(key, value);
        const amount = pairs[key];
        // console.log(amount);
        const left = key.slice(0, 1);
        const right = key.slice(1);
        // console.log(left, right);
        newPairs[key] -= amount;
        newPairs[`${left}${value}`] += amount;
        newPairs[`${value}${right}`] += amount;
      }
      // console.log(newPairs);
      pairs = { ...newPairs };
      steps--;
    }
    // console.log(pairs);

    const remade = Object.entries(pairs).reduce((acc, [k, v]) => {
      const amount = v / 2;
      const [left, right] = k.split('');
      acc[left] = acc[left] ? acc[left] + amount : amount;
      acc[right] = acc[right] ? acc[right] + amount : amount;

      return acc;
    }, {} as { [s: string]: number });
    // console.log(remade);

    remade[first] += 1 / 2;
    remade[last] += 1 / 2;
    // console.log(first, last);

    const diff =
      Object.values(remade).sort((a, b) => b - a)[0] -
      Object.values(remade).sort((a, b) => a - b)[0];
    return diff.toString();
  },
];

export default solutions;
