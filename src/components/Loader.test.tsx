import { test, describe, expect } from "vitest";
import Loader from "./Loader";
import { render, screen } from "../utils/testUtils";

describe("Loader renders ", async () => {
  test("without crashing", async () => {
    render(<Loader />, {});
  });
  test("with text", async () => {
    render(<Loader />, {});

    const text = screen.getByText(/Loading/);

    expect(text.textContent).toBe("Loading...");
  });
});
