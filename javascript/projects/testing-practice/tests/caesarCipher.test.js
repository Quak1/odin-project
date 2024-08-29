import caesarCipher from "../src/caesarCipher";

test("Shifts correctly", () => {
  expect(caesarCipher("aabb", 1)).toBe("bbcc");
});

test("Wrapping works as expected", () => {
  expect(caesarCipher("xyz", 3)).toBe("abc");
});

test("Handle shift factor 26", () => {
  expect(caesarCipher("a", 26)).toBe("a");
});

test("Handle shift factor larger than 26", () => {
  expect(caesarCipher("abc", 28)).toBe("cde");
});

test("Lettercase is preserved", () => {
  expect(caesarCipher("HeLLo", 3)).toBe("KhOOr");
});

test("Non-alphabetical charactes are preserved", () => {
  expect(caesarCipher("hello, world!", 3)).toBe("khoor, zruog!");
});
