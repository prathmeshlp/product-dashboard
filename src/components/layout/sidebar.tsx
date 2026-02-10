import { NavLink } from "react-router-dom";
import { useState } from "react";
import clsx from "clsx";

const navItems = [
  { label: "Dashboard", path: "/" },
  { label: "Products", path: "/products" },
  { label: "Users", path: "/users" },
  { label: "Settings", path: "/settings" },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(
    localStorage.getItem("sidebar-collapsed") === "true"
  );

  const toggleSidebar = () => {
    localStorage.setItem("sidebar-collapsed", String(!collapsed));
    setCollapsed(!collapsed);
  };

  return (
    <aside
      className={clsx(
        "border-r bg-background transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-16 items-center justify-between px-4">
        {!collapsed && <span className="font-bold">Admin</span>}
        <button onClick={toggleSidebar}>☰</button>
      </div>

      <nav className="space-y-1 px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              clsx(
                "block rounded px-3 py-2 text-sm",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              )
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
