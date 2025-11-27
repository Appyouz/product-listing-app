import axios from "axios";
import { Product } from "@/types/product";

const API_URL = "https://api.freeapi.app/api/v1/public/randomproducts";

export const getProducts = async (page: number = 1): Promise<Product[]> => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        page: page,
        limit: 10,
        inc: "id,title,images,thumbnail,price,category",
        query: "watches",
      },
    });

    return response.data.data.data as Product[];
  } catch (error) {
    console.error("Error fetching products: ", error);

    return [];
  }
};
