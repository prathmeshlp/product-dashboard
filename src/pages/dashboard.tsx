import { useDashboard } from "@/hooks/useDashboard";
import StatsCard from "@/components/dashboard/stats-card";
import ProductsByCategory from "@/components/dashboard/products-by-category";
import TopRatedProducts from "@/components/dashboard/top-rated-products";
import { calculateDashboardStats } from "@/lib/dashboard-utils";
import type { Product } from "@/types/product.types";

const DashboardPage = () => {
  const { productsQuery, usersQuery, categoriesQuery, isLoading } =
    useDashboard();

  if (isLoading) {
    return <div>Loading dashboard...</div>;
  }

  const products = productsQuery.data?.products ?? [];
  const usersTotal = usersQuery.data?.total ?? 0;
  const categories = categoriesQuery.data ?? [];

  const stats = calculateDashboardStats(
    products,
    usersTotal,
    categories.length,
  );

  const productsByCategory = categories.map((cat) => ({
    name: cat,
    value: products.filter((p: Product) => p.category === cat).length,
  }));

  const topRatedProducts = [...products]
    .sort((a: Product, b: Product) => b.rating - a.rating)
    .slice(0, 10)
    .map((p: Product) => ({
      title: p.title,
      rating: p.rating,
    }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-6">
        <StatsCard title="Total Products" value={stats.totalProducts} />
        <StatsCard title="Total Users" value={stats.totalUsers} />
        <StatsCard title="Low Stock" value={stats.lowStockItems} />
        <StatsCard title="Avg Price" value={`₹${stats.averagePrice}`} />
        <StatsCard title="Avg Rating" value={stats.averageRating} />
        <StatsCard title="Categories" value={stats.categoriesCount} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ProductsByCategory data={productsByCategory} />
        <TopRatedProducts data={topRatedProducts} />
      </div>
    </div>
  );
};

export default DashboardPage;
