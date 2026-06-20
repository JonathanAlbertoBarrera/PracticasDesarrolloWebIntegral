import { ProductGrid } from "./components/ProductGrid";
import { getProducts } from "./lib/products";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <ProductGrid products={products} />
      </div>
    </main>
  );
}