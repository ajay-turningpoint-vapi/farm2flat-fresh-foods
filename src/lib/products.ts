import potatoImg from "@/assets/potato.png";
import onionImg from "@/assets/onion.png";
import garlicImg from "@/assets/garlic.png";
import tomatoImg from "@/assets/tomato.jpeg";
import { Product } from "@/types/product";

const STORAGE_KEY = "f2f_products_v1";

export const defaultProducts: Product[] = [
  {
    id: "potato",
    name: "Potato",
    nameHindi: "आलू",
    price: 35,
    unit: "kg",
    image: potatoImg,
  },
  {
    id: "onion",
    name: "Onion",
    nameHindi: "प्याज",
    price: 35,
    unit: "kg",
    image: onionImg,
  },
  {
    id: "tomato",
    name: "Tomato",
    nameHindi: "टमाटर",
    price: 32,
    unit: "kg",
    image: tomatoImg,
  },
  {
    id: "garlic",
    name: "Garlic",
    nameHindi: "लहसुन",
    price: 120,
    unit: "kg",
    image: garlicImg,
  }
];

export function loadProducts(): Product[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProducts;
    const parsed = JSON.parse(raw) as Product[];
    return parsed;
  } catch (e) {
    return defaultProducts;
  }
}

export function saveProducts(products: Product[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch (e) {
    // ignore
  }
}

export function resetProducts() {
  saveProducts(defaultProducts);
}

export default {
  defaultProducts,
  loadProducts,
  saveProducts,
  resetProducts,
};
