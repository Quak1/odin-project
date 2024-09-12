import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import First from "../src/First";

describe("App component", () => {
  it("renders correct heading", () => {
    render(<First />);
    expect(screen.getByRole("heading").textContent).toMatch(/our first test/i);
    expect(screen.getByRole("heading")).toHaveTextContent(/our first test/i);
  });
});
