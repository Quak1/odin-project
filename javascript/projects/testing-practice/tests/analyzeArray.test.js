import analyzeArray from "../src/analyzeArray";

test("Handles no input", () => {
  expect(analyzeArray()).toEqual({
    average: 0,
    min: 0,
    max: 0,
    length: 0,
  });
});

test("Handles empty array", () => {
  expect(analyzeArray([])).toEqual({
    average: 0,
    min: 0,
    max: 0,
    length: 0,
  });
});

test("Handles NaN in array", () => {
  expect(() => analyzeArray([1, "b", 2])).toThrow();
});

test("Handles 1 element array", () => {
  expect(analyzeArray([10])).toEqual({
    average: 10,
    min: 10,
    max: 10,
    length: 1,
  });
});

test("Handles example problem", () => {
  expect(analyzeArray([1, 8, 3, 4, 2, 6])).toEqual({
    average: 4,
    min: 1,
    max: 8,
    length: 6,
  });
});
