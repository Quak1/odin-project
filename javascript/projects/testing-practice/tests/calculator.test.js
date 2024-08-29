import calculator from "../src/calculator";

test("Adds two numbers", () => {
  expect(calculator.add(1, 4)).toBe(5);
});

test("Subtracts two numbers", () => {
  expect(calculator.subtract(1, 4)).toBe(-3);
});

test("Divides two numbers", () => {
  expect(calculator.divide(1, 4)).toBe(0.25);
});

test("Multiplies two numbers", () => {
  expect(calculator.multiply(1, 4)).toBe(4);
});
