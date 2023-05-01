import { isTest } from "@/config";
import { UIThemeProvider } from "@/services/theme";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  render as rtlRender,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const getRandom = (aroundMS = 100) => {
  return Math.floor(Math.random() * 3) * aroundMS;
};

export const wait = async (ms = 0) =>
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, ms);
  });

export const delay = (delay = getRandom()) => wait(isTest() ? 0 : delay);

export const waitForLoadersDone = async () => {
  const loading = await screen.findByText("Loading...");
  expect(loading).toBeInTheDocument();

  await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));
};
type WrapperProps = {
  children: React.ReactNode;
};
function render(ui: React.ReactElement, { ...renderOptions } = {}) {
  function Wrapper({ children }: WrapperProps) {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          cacheTime: 0,
          staleTime: 0,
          retry: false,
        },
      },
    });

    return (
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <UIThemeProvider>
            <Routes>
              <Route path={"/"} element={children} />
            </Routes>
          </UIThemeProvider>
        </BrowserRouter>
      </QueryClientProvider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// eslint-disable-next-line import/export
export * from "@testing-library/react";
// eslint-disable-next-line import/export
export { render };
