import { test, describe, expect } from "vitest";
import { render, screen } from "../utils/testUtils";
import CellChemistry from "./CellChemistry";
const testItem: Record<string, Record<string, unknown>[]> = {
  anodeActiveMaterials: [
    {
      materialName: "Lithium",
      materialWeight: 15,
      materialPercentageMassFraction: 8,
    },
    {
      materialName: "Nickel manganese cobalt",
      materialWeight: 30,
      materialPercentageMassFraction: 15,
    },
    {
      materialName: "Aluminum",
      materialWeight: 5,
      materialPercentageMassFraction: 2,
    },
    {
      materialName: "Graphite",
      materialWeight: 20,
      materialPercentageMassFraction: 10,
    },
    {
      materialName: "Cobalt",
      materialWeight: 5,
      materialPercentageMassFraction: 3,
    },
  ],
};

describe("CellChemistry renders ", async () => {
  test("without crashing", async () => {
    render(<CellChemistry title="Test Title" data={testItem} />, {});
  });
  test("with Title text", async () => {
    render(<CellChemistry title="Test Title" data={testItem} />, {});

    const text = screen.getByText(/Title/);

    expect(text.textContent).toBe("Test Title");
  });
  test("with Cell text", async () => {
    render(<CellChemistry title="Test Title" data={testItem} />, {});

    const testMaterial = "Aluminum";
    const text = screen.getByText(testMaterial);

    expect(text.textContent).toBe(testMaterial);
  });
});
