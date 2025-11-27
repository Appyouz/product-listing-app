import { getProducts } from '@/lib/api';
import { Product } from '@/types/product';
import ProductList from '@/components/ProductList';

export default async function HomePage() {
  const products: Product[] = await getProducts();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">

      <header className="bg-white shadow-md dark:bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Product Listing</h1>
        </div>
      </header>

      <main className="container mx-auto p-4 pt-8">
        <ProductList initialProducts={products} />
      </main>

    </div>
  );
}
