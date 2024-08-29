import reverseString from "../src/reverseString";

test("Handles odd length strings", () => {
  expect(reverseString("asd")).toBe("dsa");
});

test("Handles even length strings", () => {
  expect(reverseString("qwerty")).toBe("ytrewq");
});

test("Keeps capitalization", () => {
  expect(reverseString("A")).toBe("A");
});

test("Handles empty string", () => {
  expect(reverseString("")).toBe("");
});

test("Handles no argument", () => {
  expect(() => reverseString()).toThrow();
});
