import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { ErrorBoundaryBase } from "@/ui/features/error-handlers";
import { AppRouter } from "./routes";
import "./test/server";
import { BrowserRouter } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { isDev } from "@/config";
import { UIThemeProvider } from "./services/theme";
import "./app.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
      staleTime: 10000,
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const localStoragePersister = createSyncStoragePersister({
  storage: window.localStorage,
});

persistQueryClient({
  queryClient,
  persister: localStoragePersister,
});

export const AppRoot = () => {
  return (
    <ErrorBoundaryBase>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <UIThemeProvider>
            <AppRouter />
          </UIThemeProvider>
          {isDev() && (
            <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
          )}
        </QueryClientProvider>
      </BrowserRouter>
    </ErrorBoundaryBase>
  );
};
