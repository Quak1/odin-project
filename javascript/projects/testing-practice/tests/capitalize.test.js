import capitalize from "../src/capitalize";

test("First letter is capitalized", () => {
  expect(capitalize("hello")).toBe("Hello");
});

test("If first letter is capitilized leaves string as is", () => {
  expect(capitalize("Hello")).toBe("Hello");
});

test("Ignores other letters", () => {
  expect(capitalize("heLlO")).toBe("HeLlO");
});

test("Handles empty strings", () => {
  expect(capitalize("")).toBe("");
});

test("Handles no argument", () => {
  expect(() => capitalize()).toThrow();
});
