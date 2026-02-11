import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryProvider } from "./providers/query-provider";
import { ThemeProvider } from "./providers/theme-provider.tsx";
import { AuthProvider } from "./hooks/useAuth.tsx";
import ErrorBoundary from "./components/common/common/error-boundary.tsx";
import { Toaster } from "@/components/ui/sonner";


createRoot(document.getElementById("root")!).render(
<ErrorBoundary>
  <AuthProvider>
    <ThemeProvider>
      <QueryProvider>
        <App />
        <Toaster richColors position="top-right" />
      </QueryProvider>
    </ThemeProvider>
  </AuthProvider>
</ErrorBoundary>

);
