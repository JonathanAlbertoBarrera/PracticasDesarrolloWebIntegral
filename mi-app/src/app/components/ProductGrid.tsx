"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "./ProductCard";
import { SortControls, SortOption } from "./SortControls";
import { Product } from "../types/product";

interface Props {
  products: Product[];
}

export function ProductGrid({ products }: Props) {
  const [sort, setSort] = useState<SortOption>("price-desc");

  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => {
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "rating-desc") return b.rating.rate - a.rating.rate;
      if (sort === "rating-asc") return a.rating.rate - b.rating.rate;

      return 0;
    });
  }, [products, sort]);

  return (
    <section>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          Productos
        </h1>

        <SortControls value={sort} onChange={setSort} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}