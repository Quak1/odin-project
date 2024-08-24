function mergeSort(a) {
  if (a.length === 1) return a;

  const middle = Math.floor(a.length / 2);
  // sort left
  const left = mergeSort(a.slice(0, middle));
  // sort right
  const right = mergeSort(a.slice(middle));

  // merge
  const merged = [];
  let i = 0;
  let j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      merged.push(left[i]);
      i++;
    } else {
      merged.push(right[j]);
      j++;
    }
  }

  for (; i < left.length; i++) {
    merged.push(left[i]);
  }

  for (; j < left.length; j++) {
    merged.push(right[j]);
  }

  return merged;
}

console.log(
  "mergeSort([3, 2, 1, 13, 8, 5, 0, 1])",
  mergeSort([3, 2, 1, 13, 8, 5, 0, 1]),
);

console.log("mergeSort([105, 79, 100, 110])", mergeSort([105, 79, 100, 110]));
