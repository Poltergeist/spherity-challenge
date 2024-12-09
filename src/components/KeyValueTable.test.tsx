import { test, describe, expect } from "vitest";
import KeyValueTable from "./KeyValueTable";
import { Proof } from "../types";
import { render, screen } from "../utils/testUtils";

const needle = "Proof Purpose";
const testItem: Proof = {
  jws: "jws",
  type: "type",
  created: Date.now().toString(),
  proofPurpose: needle,
  verificationMethod: "verificationMethod",
};

describe("Sidebar renders ", async () => {
  test("without crashing", async () => {
    render(<KeyValueTable item={testItem} />, {});
  });
  test("with text", async () => {
    render(<KeyValueTable item={testItem} />, {});

    const text = screen.getByText(needle);

    expect(text.textContent).toBe(needle);
  });
});
