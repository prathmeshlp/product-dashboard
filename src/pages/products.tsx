import { useProducts } from "@/hooks/useProducts";
import { useProductParams } from "@/hooks/useProductParams";
import { useDebounce } from "@/hooks/useDebounce";
import { productService } from "@/services/product.service";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { type Product } from "@/types/product.types";

const PAGE_SIZE = 10;

const ProductsPage = () => {
  const { page, search, category, setPage, setSearch, setCategory } =
    useProductParams();

  const debouncedSearch = useDebounce(search);

  const productsQuery = useProducts({
    page,
    limit: PAGE_SIZE,
    search: debouncedSearch || undefined,
    category: category || undefined,
  });

  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: productService.getCategories,
  });

  const products = productsQuery.data?.products ?? [];
  const total = productsQuery.data?.total ?? 0;

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border rounded px-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categoriesQuery.data?.map((cat) => (
            <option key={cat.slug} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <table className="w-full border">
        <thead>
          <tr className="bg-muted text-left">
            <th className="p-2">Title</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Rating</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product: Product) => (
            <tr key={product.id} className="border-t">
              <td className="p-2">{product.title}</td>
              <td>{product.category}</td>
              <td>₹{product.price}</td>
              <td>{product.stock}</td>
              <td>{product.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-end gap-2">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>
        <span>
          Page {page} / {Math.ceil(total / PAGE_SIZE)}
        </span>
        <button
          disabled={page >= total / PAGE_SIZE}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductsPage;
