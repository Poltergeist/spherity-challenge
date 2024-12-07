import { expect, test } from "vitest";
import { fetchService } from "./fetchService";

test("Fetch Service exists", () => {
  expect(fetchService).toBeDefined();
});
