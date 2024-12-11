import { test, describe, expect } from "vitest";
import { render, screen } from "../utils/testUtils";
import FileCard from "./FileCard";
const testItem: Record<string, unknown> = [
  {
    fileUrl: "https://jlr-data.pages.dev/waste prevention.pdf",
    fileName: "Preventing and managing waste batteries",
    fileSize: "455",
    uploadDate: "22/09/2023",
  },
  {
    fileUrl: "https://jlr-data.pages.dev/conformity.pdf",
    fileName: "EU declaration of conformity",
    fileSize: "513",
    uploadDate: "22/09/2023",
  },
];

describe("CellChemistry renders ", async () => {
  test("without crashing", async () => {
    render(<FileCard title="Test Title" data={testItem} />, {});
  });
  test("with Title text", async () => {
    render(<FileCard title="Test Title" data={testItem} />, {});

    const text = screen.getByText(/Title/);

    expect(text.textContent).toBe("Test Title");
  });
  test("with Cell text", async () => {
    render(<FileCard title="Test Title" data={testItem} />, {});

    const testFile = "EU declaration of conformity";
    const text = screen.getByText(testFile);

    expect(text.textContent).toBe(testFile);
  });
});
