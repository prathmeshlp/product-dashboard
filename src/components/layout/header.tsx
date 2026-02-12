import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

const Header = () => {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      <h1 className="text-lg font-semibold">Dashboard</h1>

      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() =>
            theme === "light" ? setTheme("dark") : setTheme("light")
          }
          aria-label="Toggle theme"
          className="transition-colors"
        >
          {theme === "light" ? (
            <Sun className="h-5 w-5 transition-all rotate-0 scale-100" />
          ) : (
            <Moon className="h-5 w-5 transition-all rotate-0 scale-100" />
          )}
        </Button>
        <span className="text-sm text-muted-foreground">{user?.firstName}</span>
        <Button variant="outline" size="sm" onClick={logout}>
          Logout
        </Button>
      </div>
    </header>
  );
};

export default Header;
