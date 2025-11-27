'use client';

import React, { useState, useMemo } from 'react';
import { Product } from '@/types/product';
import ProductCard from './ProductCard';
import { IoSearch, IoFilterOutline } from 'react-icons/io5';

interface ProductListProps {
  initialProducts: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ initialProducts }) => {
  // State for search and category filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // UseMemo to find all unique category
  const uniqueCategories = useMemo(() => {
    // Use map and Set to quickly get a list of unique categories
    const categoriesSet = new Set(initialProducts.map(product => product.category));
    return ['all', ...Array.from(categoriesSet)];
  }, [initialProducts]);


  // main filtering logic
  const productsToDisplay = useMemo(() => {
    let resultProducts = initialProducts;

    // Applying search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      // Filter the products matching search term
      resultProducts = resultProducts.filter(product =>
        product.title.toLowerCase().includes(searchLower)
      );
    }

    // Applying category filter
    if (selectedCategory !== 'all') {
      // Filter the products matching search term for category
      resultProducts = resultProducts.filter(product =>
        product.category === selectedCategory
      );
    }

    // Return final list of all the products
    return resultProducts;
  }, [initialProducts, searchTerm, selectedCategory]);


  return (
    <div className="flex flex-col md:flex-row gap-6">

      {/* Filters sidebar */}
      <aside className="w-full md:w-1/4 p-4 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">Filters</h2>

        {/* Search input iield */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search products by title"
            className="w-full p-2 pl-10 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        {/* Dropdown  for category filtermenu*/}
        <div className="mb-6">
          <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <IoFilterOutline className="mr-2" />
            Category Filter
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 capitalize"
          >
            {/* Loop create options for unique category*/}
            {uniqueCategories.map((category) => (
              <option key={category} value={category} className="capitalize">
                {category.replace('-', ' ')}
              </option>
            ))}
          </select>
        </div>

        {/* Sorting sectin*/}
        <div className="space-y-4">
          <p className="text-gray-500 dark:text-gray-400">Sort Dropdown (TODO)</p>
        </div>
      </aside>

      {/* Product grid section*/}
      <section className="flex-1">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Showing {productsToDisplay.length} Products
        </h2>

        {productsToDisplay.length === 0 ? (
          <div className="p-10 text-center bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <p className="text-xl text-gray-500 dark:text-gray-400">
              No products found matching your filters.
            </p>
          </div>
        ) : (
          // Display the product grid
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {productsToDisplay.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

    </div>
  );
};

export default ProductList;
