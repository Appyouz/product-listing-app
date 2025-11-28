import axios from "axios";
import { Product } from "@/types/product";

//Use dummyjson api
const API_URL = "https://dummyjson.com/products";
const LIMIT = 10;

export const getProducts = async (page: number = 1): Promise<Product[]> => {
  try {
    const skipAmount = (page - 1) * LIMIT;

    const response = await axios.get(API_URL, {
      params: {
        limit: LIMIT,
        skip: skipAmount,
      },
    });

    return response.data.products as Product[];
  } catch (error) {
    console.error("Error fetching products: ", error);
    return [];
  }
};
