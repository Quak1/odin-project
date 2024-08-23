function fibs(n) {
  if (n < 0) throw new Error("N can't be a negative number");

  let fib = [];
  for (let i = 0; i < n; i++) {
    if (i <= 1) fib.push(i);
    else fib.push(fib[i - 1] + fib[i - 2]);
  }
  return fib;
}

console.log("fibs(10)", fibs(10));

function fibsRec(n) {
  if (n < 1) throw new Error("N can't be less than 1");
  if (n === 1) return [0];
  if (n === 2) return [0, 1];

  const prev = fibsRec(n - 1);
  prev.push(prev.at(-2) + prev.at(-1));
  return prev;
}

console.log("fibsRec(10)", fibsRec(10));
