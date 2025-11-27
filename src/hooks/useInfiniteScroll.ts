import { useState, useEffect, useCallback } from "react";
import { Product } from "@/types/product";
import { getProducts } from "@/lib/api";

interface InfiniteScrollHook {
  products: Product[];
  loading: boolean;
  hasMore: boolean;
  loadMore: () => void;
}

export const useInfiniteScroll = (
  initialProducts: Product[],
): InfiniteScrollHook => {
  // state for product, next page number, loading staatus
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // fetch the next batch of data
  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      // Call the API with the current page state
      const newProducts = await getProducts(page);

      if (newProducts.length === 0) {
        setHasMore(false);
      } else {
        // Add the new products to the existing list and increaese page number  by 1
        setProducts((prevProducts) => [...prevProducts, ...newProducts]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (e) {
      console.error("Failed to load more products:", e);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);

  // TODO: useEffect here to listen for scroll events

  return {
    products,
    loading,
    hasMore,
    loadMore,
  };
};
