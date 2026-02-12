import { useState, useEffect } from "react";

const SettingsPage = () => {
  const [pageSize, setPageSize] = useState(
    Number(localStorage.getItem("page-size") ?? 10),
  );

  const [density, setDensity] = useState(
    localStorage.getItem("density") ?? "comfortable",
  );

  useEffect(() => {
    localStorage.setItem("page-size", String(pageSize));
  }, [pageSize]);

  useEffect(() => {
    localStorage.setItem("density", density);
  }, [density]);

  return (
    <div className="space-y-6 max-w-md">
      <h1 className="text-xl font-semibold">Settings</h1>

      {/* Page Size */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Default Page Size
        </label>
        <select
          className="border rounded p-2 w-full bg-black text-white"
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>

      {/* Density */}
      <div>
        <label className="block text-sm font-medium mb-1">Table Density</label>
        <select
          className="border rounded p-2 w-full bg-black text-white"
          value={density}
          onChange={(e) => setDensity(e.target.value)}
        >
          <option value="comfortable">Comfortable</option>
          <option value="compact">Compact</option>
        </select>
      </div>
    </div>
  );
};

export default SettingsPage;
