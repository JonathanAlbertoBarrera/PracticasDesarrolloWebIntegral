import Image from "next/image";
import Link from "next/link";
import { Product } from "../types/product";

interface Props {
  product: Product;
}

export function ProductCard({ product }: Props) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="rounded-xl bg-white p-4 shadow-sm transition hover:shadow-md"
    >
      <div className="relative mb-4 h-48 w-full">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain"
        />
      </div>

      <p className="mb-1 text-sm text-gray-500 capitalize">
        {product.category}
      </p>

      <h2 className="line-clamp-2 text-base font-semibold text-gray-900">
        {product.title}
      </h2>

      <div className="mt-3 flex items-center justify-between">
        <span className="font-bold text-gray-900">
          ${product.price}
        </span>

        <span className="text-sm text-yellow-600">
          ⭐ {product.rating.rate}
        </span>
      </div>
    </Link>
  );
}