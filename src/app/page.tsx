import { getProducts } from '@/lib/api';
import { Product } from '@/types/product';
import ProductCard from '@/components/ProductCard';

export default async function HomePage() {
  const products: Product[] = await getProducts();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">

      <header className="bg-white shadow-md dark:bg-gray-800 p-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Product Listing</h1>
      </header>

      <main className="container mx-auto p-4 pt-8">
        <div className="flex flex-col md:flex-row gap-6">

          {/* Filters Section */}
          <aside className="w-full md:w-1/4 p-4 bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <h2 className="text-xl font-semibold mb-4 dark:text-white">Filters</h2>
            <p className="text-gray-500 dark:text-gray-400">Filter components </p>
          </aside>

          {/* Product view Grid */}
          <section className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>

        </div>
      </main>

    </div>
  );
}
