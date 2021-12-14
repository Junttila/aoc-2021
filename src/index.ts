import solutions from './solutions/day14/solutions';

solutions.forEach((f, i) => {
  console.log('Start');
  const before = new Date();
  const result = f();
  const after = new Date();
  console.log(
    'Solution',
    (i + 1).toString(),
    `(${after.valueOf() - before.valueOf()}ms)`,
  );
  console.log(result || '');
  console.log();
});
