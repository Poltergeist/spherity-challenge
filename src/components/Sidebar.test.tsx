import { test, describe, expect } from "vitest";
import Sidebar from "./Sidebar";
import { render, screen } from "../utils/testUtils";

describe("Sidebar renders ", async () => {
  test("without crashing", async () => {
    render(<Sidebar />, {});
  });
  test("with text", async () => {
    render(
      <Sidebar>
        <div>TEST</div>
      </Sidebar>,
      {},
    );

    const text = screen.getByText(/TE/);

    expect(text.textContent).toBe("TEST");
  });
});
