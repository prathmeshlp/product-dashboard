export const calculateDashboardStats = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  products: any[],
  usersTotal: number,
  categoriesCount: number
) => {
  const totalProducts = products.length;

  const lowStockItems = products.filter(
    (p) => p.stock < 10
  ).length;

  const averagePrice =
    products.reduce((sum, p) => sum + p.price, 0) / totalProducts;

  const averageRating =
    products.reduce((sum, p) => sum + p.rating, 0) / totalProducts;

  return {
    totalProducts,
    totalUsers: usersTotal,
    lowStockItems,
    averagePrice: Number(averagePrice.toFixed(2)),
    averageRating: Number(averageRating.toFixed(2)),
    categoriesCount,
  };
};
