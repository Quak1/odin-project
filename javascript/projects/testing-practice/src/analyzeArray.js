function analyzeArray(nums) {
  const analysis = {
    average: 0,
    min: 0,
    max: 0,
    length: 0,
  };

  if (!nums || typeof nums !== "object" || !nums.length) return analysis;

  const sum = nums.reduce((num, total) => {
    if (typeof num !== "number")
      throw new Error("Element in array is not a number");
    return num + total;
  }, 0);

  analysis.average = sum / nums.length;
  analysis.min = Math.min(...nums);
  analysis.max = Math.max(...nums);
  analysis.length = nums.length;

  return analysis;
}

export default analyzeArray;
