import RatingStars from "./ratingStar";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import type { Product } from "@/types/product.types";

interface Props {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

function ProductCard({
  product,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div
      className="
        relative
        flex flex-col
        min-w-60
        min-h-88
        w-full
        max-w-80
        border
        rounded-xl
        overflow-hidden
        shadow-sm
        bg-white
        hover:shadow-md
        transition
      "
    >
      {/* Discount Ribbon */}
      {product?.discountPercentage > 0 && (
        <div className="absolute top-3 -right-10 rotate-45 bg-red-500 text-white text-xs font-semibold px-8 py-1 shadow-md">
          {product?.discountPercentage}% OFF
        </div>
      )}

      {/* Image Container */}
      <div className="h-48 w-full bg-gray-100 flex items-center justify-center overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.title}
          className="
            max-h-full
            max-w-full
            object-contain
            transition-transform
            duration-300
            hover:scale-105
          "
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <h3 className="font-semibold text-lg line-clamp-2 mb-2 text-black">
          {product.title}
        </h3>

        <div className="flex items-center justify-between mb-2">
          <div className="text-xl font-bold text-black">₹{product.price}</div>

          <div
            className={`text-sm ${
              product.stock < 10 ? "text-red-500" : "text-muted-foreground"
            }`}
          >
            {product.stock < 10 ? "Low Stock" : `Stock: ${product.stock}`}
          </div>
        </div>

        <RatingStars rating={Math.round(product.rating * 2) / 2} />

        <div className="mt-auto pt-4 flex justify-end gap-2">
          <Button
            size="icon"
            variant="default"
            onClick={() => onEdit(product)}
          >
            <Pencil className="h-4 w-4" />
          </Button>

          <Button size="icon" variant="default" onClick={() => onDelete(product)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
