export interface Bicycle {
  _id?: string;
  name: string;
  brand: string;
  model: string;
  img: string;
  price: number;

  // Functional type — defines engineering/design purpose
  type: 'Mountain' | 'Road' | 'Hybrid' | 'BMX' | 'Electric';

  // Market category — defines audience, style, or placement
  category:
    | 'Men'
    | 'Women'
    | 'Kids'
    | 'Commuter'
    | 'Sport'
    | 'Professional'
    | 'Casual'
    | 'Urban Series'
    | 'Premium'
    | 'Budget';

  description?: string;
  quantity: number;
  inStock: boolean;
  isDeleted: boolean;
}

//  query parameters for searching and filtering |> product Api
export interface GetAllBicyclesParams {
  searchTerm?: string;
  brand?: string;
  category?: string;
  model?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
}

export interface GetAllOrderParams {
  _id: string;
  email: string;
  product: string;
  quantity: number;
  totalPrice: number;
}

// export interface IBicycle {
//   name: string;
//   brand: string;
//   price: number;
//   type: 'Mountain' | 'Road' | 'Hybrid' | 'BMX' | 'Electric';
//   description?: string;
//   quantity: number;
//   inStock: boolean;
//   isDeleted: boolean;
// }
