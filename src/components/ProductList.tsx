'use client';

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Product } from '@/types/product';
import ProductCard from './ProductCard';
import { IoSearch, IoFilterOutline, IoRefresh, IoClose, IoSwapVertical } from 'react-icons/io5';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';


interface ProductListProps {
  initialProducts: Product[];
}

const ProductList = ({ initialProducts }: ProductListProps) => {

  // HOok integration for infiinite scroll 
  const { products, loading, hasMore, loadMore } = useInfiniteScroll(initialProducts)

  // For mobile design close filter button in smaller screens
  const [isFilterOpen, setIsFilterOpen] = useState(false);



  // State for search and category filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSort, setSelectedSort] = useState('default');
  // UseMemo to find all unique category
  const uniqueCategories = useMemo(() => {
    // Use map and Set to quickly get a list of unique categories
    const categoriesSet = new Set(products.map(product => product.category));
    return ['all', ...Array.from(categoriesSet)];
  }, [products]);


  // main filtering logic
  const productsToDisplay = useMemo(() => {
    let resultProducts = products;

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
    if (selectedSort === 'price-low') {
      return resultProducts.slice().sort((a, b) => a.price - b.price);
    } else if (selectedSort === 'price-high') {
      return resultProducts.slice().sort((a, b) => b.price - a.price);
    }

    return resultProducts;
  }, [products, searchTerm, selectedCategory]);

  // scroll  handler
  const handleScroll = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 200 && !loading && hasMore) {
      loadMore();
    }
  }, [loading, hasMore, loadMore])

  // For cleaning scroll listeneer
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="flex flex-col md:flex-row gap-6">

      <div className="md:hidden flex justify-between items-center bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold dark:text-white">Filters</h2>
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="p-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors flex items-center"
        >
          {isFilterOpen ? <IoClose className="mr-1" /> : <IoFilterOutline className="mr-1" />}
          {isFilterOpen ? 'Close Filters' : 'Open Filters'}
        </button>
      </div>


      {/* Filters sidebar*/}
      <aside
        className={`w-full p-4 bg-white rounded-lg shadow-lg dark:bg-gray-800 
                        ${isFilterOpen ? 'block' : 'hidden'} 
                        md:block md:w-1/4`}
      >
        <h2 className="text-xl font-semibold mb-4 dark:text-white">Filters</h2>

        {/* Search input field */}
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

        {/* Dropdown for category filter menu */}
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
            {uniqueCategories.map((category) => (
              <option key={category} value={category} className="capitalize">
                {category.replace('-', ' ')}
              </option>
            ))}
          </select>
        </div>

        {/* Sorting section */}
        <div className="mb-6">
          <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <IoSwapVertical className="mr-2" />
            Sort By
          </label>
          <select
            value={selectedSort}
            onChange={(e) => setSelectedSort(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 capitalize"

          >
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </aside>

      {/* Product grid section */}
      <section className="flex-1">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Showing {productsToDisplay.length} of {products.length} Total
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
        {loading && (
          <div className="flex justify-center py-8">
            {/* loading spinner using IoRefresh */}
            <IoRefresh className="text-4xl text-indigo-500 animate-spin" />
          </div>
        )}

        {/* Show message for no more products */}
        {!hasMore && products.length > 0 && (
          <div className="text-center py-4 text-gray-500 dark:text-gray-400">
            End of Products
          </div>
        )}
      </section>
    </div>
  );
};

export default ProductList;
