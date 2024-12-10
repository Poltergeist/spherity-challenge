/* eslint-disable react-refresh/only-export-components */
import type { ReactNode } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { vi } from "vitest";
import { Provider } from "../components/ui/provider.tsx";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

const AllTheProviders = ({ children }: { children: ReactNode }) => {
  return <Provider>{children}</Provider>;
};

const customRender = (ui: ReactNode, options: RenderOptions) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
