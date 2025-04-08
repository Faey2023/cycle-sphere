import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IFilter {
  price: [number, number];
  brand?: string;
  model?: string;
  category?: string;
  availability?: 'inStock' | 'upcoming' | 'all';
}
export interface IInitialState {
  // bicycles: Bicycle[];
  search: string;
  filters: IFilter;
}

const initialState: IInitialState = {
  search: '',
  filters: {
    price: [0, 10000],
    brand: '',
    model: '',
    category: '',
    availability: 'all',
  },
};

const bicycleSlice = createSlice({
  name: 'bicycles',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setFilters: (state, action: PayloadAction<Partial<IFilter>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
});

export const { setSearch, setFilters } = bicycleSlice.actions;

export default bicycleSlice.reducer;
