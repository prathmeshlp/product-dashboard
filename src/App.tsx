import { toast } from "sonner";
import Router from "./routes";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    const handleOffline = () => toast.error("You are offline.");
    window.addEventListener("offline", handleOffline);
    return () => window.removeEventListener("offline", handleOffline);
  }, []);

  return <Router />;
};

export default App;
