export interface Product {
  id: string;
  name: string;
  nameHindi: string;
  price: number;
  unit: string;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}
