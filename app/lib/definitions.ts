export interface Product {
  id: number;
  title: string;
  is_new?: boolean;
  price: number;
  discounted_price: number;
  description?: string;
  category?: string;
  type?: string;
  stock?: number;
  brand?: string;
  sizes?: string[];
  colors?: Color[];
  images: string[];
  rating: number;
  reviews?: Review[];
  review_count?: number;
  thumbnail: string;
}

export type Color = {
  id: string;
  name: string;
  classes: string;
};

export type Review = {
  id: number;
  date: string;
  name: string;
  rating: number;
  comment: string;
};
