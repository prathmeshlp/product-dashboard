import { useProducts } from "@/hooks/useProducts";
import { useProductParams } from "@/hooks/useProductParams";
import { useDebounce } from "@/hooks/useDebounce";
import { productService } from "@/services/product.service";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { type Product } from "@/types/product.types";
import { useProductMutations } from "@/hooks/useProductMutations";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ProductForm from "@/components/products/product-form";
import ProductDeleteDialog from "@/components/products/product-delete-dialog";
import ProductCard from "@/components/common/common/productCard";

const PAGE_SIZE = 10;

const ProductsPage = () => {
  const [openForm, setOpenForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const { createProduct, updateProduct, deleteProduct } = useProductMutations();

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
          className="border rounded px-2 bg-accent"
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
      <Button onClick={() => setOpenForm(true)}>Add Product</Button>
      <div className="flex justify-center items-center gap-6 flex-wrap border-2">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onDelete={() => setProductToDelete(product)}
            onEdit={() => setEditingProduct(product)}
          />
        ))}
      </div>
      <Dialog
        open={openForm || !!editingProduct}
        onOpenChange={() => {
          setOpenForm(false);
          setEditingProduct(null);
        }}
      >
        <DialogContent>
          <ProductForm
            defaultValues={editingProduct ?? undefined}
            onSubmit={async (data) => {
              if (editingProduct) {
                await updateProduct.mutateAsync({
                  id: editingProduct.id,
                  data,
                });
              } else {
                await createProduct.mutateAsync(data);
              }

              setOpenForm(false);
              setEditingProduct(null);
            }}
          />
        </DialogContent>
      </Dialog>
      <ProductDeleteDialog
        open={!!productToDelete}
        onClose={() => setProductToDelete(null)}
        onConfirm={async () => {
          if (productToDelete) {
            await deleteProduct.mutateAsync(productToDelete.id);
            setProductToDelete(null);
          }
        }}
      />
      {/* Pagination */}
      <div className="flex justify-center items-center gap-2">
        <button
          className="border-2 p-2 rounded-2xl"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>
        <span>
          Page {page} / {Math.ceil(total / PAGE_SIZE)}
        </span>
        <button
          disabled={page >= total / PAGE_SIZE}
          onClick={() => setPage(page + 1)}
          className="border-2 p-2 rounded-2xl"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductsPage;
