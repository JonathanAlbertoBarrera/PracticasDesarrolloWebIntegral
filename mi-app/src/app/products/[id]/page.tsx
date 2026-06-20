import Image from "next/image";
import Link from "next/link";
import { getProductById } from "../../lib/products";

interface Props {
  params: {
    id: string;
  };
}


export default async function ProductDetailPage({ params }: Readonly<Props>) {
  const { id } = await params;
  const product = await getProductById(id);

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="mb-6 inline-block text-sm text-gray-600">
          ← Volver a productos
        </Link>

        <section className="grid gap-8 rounded-xl bg-white p-6 shadow-sm md:grid-cols-2">
          <div className="relative h-80 w-full">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain"
            />
          </div>

          <div>
            <p className="mb-2 text-sm text-gray-500 capitalize">
              {product.category}
            </p>

            <h1 className="mb-4 text-2xl font-bold text-gray-900">
              {product.title}
            </h1>

            <p className="mb-4 text-gray-600">
              {product.description}
            </p>

            <div className="mb-4 flex items-center gap-4">
              <span className="text-2xl font-bold text-gray-900">
                ${product.price}
              </span>

              <span className="text-yellow-600">
                ⭐ {product.rating.rate} / 5
              </span>
            </div>

            <p className="text-sm text-gray-500">
              {product.rating.count} reseñas
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}