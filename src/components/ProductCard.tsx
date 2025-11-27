'use client';

import { Product } from '@/types/product';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
      <div className="relative h-48 w-full">
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={500}
          height={500}
          className="object-cover"
        />
      </div>

      <div className="p-4">
        {/*Product Title*/}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
          {product.title}
        </h3>

        {/* Product Price */}
        <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">
          ${product.price}
        </p>

        {/* Category */}
        <p className="text-sm text-gray-500 dark:text-gray-400 capitalize mt-2">
          {product.category}
        </p>

      </div>
    </div>
  );
};

export default ProductCard;
