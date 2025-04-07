import { Bicycle } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IInitialState {
  bicycles: Bicycle[];
  // filter: "all" | "high" | "medium" | "low";
}

/**
 *  name, brand, model, price, and category, with a "View Details"
 */

const initialState: IInitialState = {
  bicycles: [
    {
      name: 'Trail Blazer',
      brand: 'Mountain King',
      model: 'TB-X1',
      price: 1200,
      type: 'Mountain',
      category: 'Sport',
      description: 'A durable mountain bike designed for rugged trails.',
      quantity: 15,
      inStock: true,
      isDeleted: true,
      img: 'https://cdn.pixabay.com/photo/2013/07/13/13/46/bicycle-161524_1280.png',
    },
    {
      name: 'City Cruiser',
      brand: 'Urban Riders',
      model: 'CC-Urban',
      price: 850,
      type: 'Hybrid',
      category: 'Commuter',
      description: 'Perfect for city commuting and leisure rides.',
      quantity: 30,
      inStock: true,
      isDeleted: false,
      img: 'https://cdn.pixabay.com/photo/2022/07/24/19/42/bike-7342379_1280.png',
    },
    {
      name: 'Roadster 5000',
      brand: 'SpeedX',
      model: 'RX-5000',
      price: 300,
      type: 'Road',
      category: 'Professional',
      description: 'A premium road bike designed for speed and performance.',
      quantity: 20,
      inStock: true,
      isDeleted: false,
      img: 'https://cdn.pixabay.com/photo/2015/05/29/19/18/bicycle-789648_1280.jpg',
    },
    {
      name: 'Sansy 5000',
      brand: 'SpeedX',
      model: 'SX-5000',
      price: 300,
      type: 'Road',
      category: 'Casual',
      description: 'A premium road bike designed for speed and performance.',
      quantity: 17,
      inStock: true,
      isDeleted: false,
      img: 'https://cdn.pixabay.com/photo/2016/11/18/12/49/bicycle-1834265_1280.jpg',
    },
  ],
  //   filter: "all",
};

const bicycleSlice = createSlice({
  name: 'bicycles',
  initialState,
  reducers: {
    getBicycle: (state, action: PayloadAction<Bicycle>) => {
      console.log(state, action);
    },
  },
});

export const { getBicycle } = bicycleSlice.actions;

export default bicycleSlice.reducer;
