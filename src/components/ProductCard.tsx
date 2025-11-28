'use client';

import { Product } from '@/types/product';
import Image from 'next/image';
import { IoCart } from 'react-icons/io5';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();



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
        <button
          onClick={() => addToCart(product)}
          className="w-full mt-3 flex items-center justify-center p-2 text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <IoCart className="w-5 h-5 mr-2" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
