import { test, expect } from "vitest";
import { render, screen } from "./utils/testUtils";
import App from "./App";
import { http, HttpResponse } from "msw";

export const handlers = [
  // Intercept "GET https://example.com/user" requests...
  http.get(
    "https://api-vera.susi.spherity.dev/credential-registry/did:web:api-rcs.susi.spherity.dev:did-registry:acme-power-drive-x-1000-3985-cb-1739186-d-7-d",
    () => {
      // ...and respond to them using this JSON response.
      return HttpResponse.json({
        id: "c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d",
        firstName: "John",
        lastName: "Maverick",
      });
    },
  ),
];
test("renders without crashing", async () => {
  render(<App />, {});
});

test("renders Loading on initial render", async () => {
  render(<App />, {});

  const text = screen.getByText(/Loading/);

  expect(text.textContent).toBe("Loading...");
});
