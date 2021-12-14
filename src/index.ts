import solutions from './solutions/day8/solutions';

solutions.forEach((f, i) => {
  const result = f();
  console.log('Solution', (i + 1).toString());
  console.log(result || '');
  console.log();
});
