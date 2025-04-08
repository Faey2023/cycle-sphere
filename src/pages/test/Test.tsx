// // src/types/index.ts
// export interface Bicycle {
//     id: string;
//     name: string;
//     brand: string;
//     model: string;
//     category: string;
//     price: number;
//     availability: boolean;
//     image: string;
//     description: string;
//   }

//   // src/redux/store.ts
//   import { configureStore } from "@reduxjs/toolkit";
//   import { apiSlice } from "./api/apiSlice";

//   export const store = configureStore({
//     reducer: {
//       [apiSlice.reducerPath]: apiSlice.reducer,
//     },
//     middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware().concat(apiSlice.middleware),
//   });

//   export type RootState = ReturnType<typeof store.getState>;
//   export type AppDispatch = typeof store.dispatch;

//   // src/redux/hook.ts
//   import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
//   import type { RootState, AppDispatch } from "./store";

//   export const useAppDispatch = () => useDispatch<AppDispatch>();
//   export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

//   // src/redux/api/apiSlice.ts
//   import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//   export const apiSlice = createApi({
//     reducerPath: "api",
//     baseQuery: fetchBaseQuery({ baseUrl: "https://your-api.com/api" }),
//     tagTypes: ["Bicycle"],
//     endpoints: () => ({}),
//   });

//   // src/redux/api/bicycleApi.ts
//   import { apiSlice } from "./apiSlice";
//   import { Bicycle } from "@/types";

//   export const bicycleApi = apiSlice.injectEndpoints({
//     endpoints: (builder) => ({
//       getBicycles: builder.query<Bicycle[], void>({
//         query: () => "/bicycles",
//         providesTags: ["Bicycle"],
//       }),
//       getBicycleById: builder.query<Bicycle, string>({
//         query: (id) => `/bicycles/${id}`,
//       }),
//     }),
//   });

//   export const { useGetBicyclesQuery, useGetBicycleByIdQuery } = bicycleApi;

//   // src/redux/features/bicycleSlice.ts
//   import { createSlice } from "@reduxjs/toolkit";

//   const initialState = {
//     search: "",
//     filters: {
//       price: [0, 10000],
//       brand: "",
//       model: "",
//       category: "",
//       availability: "",
//     },
//   };

//   export const bicycleSlice = createSlice({
//     name: "bicycle",
//     initialState,
//     reducers: {
//       setSearch: (state, action) => {
//         state.search = action.payload;
//       },
//       setFilters: (state, action) => {
//         state.filters = { ...state.filters, ...action.payload };
//       },
//     },
//   });

//   export const { setSearch, setFilters } = bicycleSlice.actions;
//   export default bicycleSlice.reducer;

//   // src/redux/middleware/logger.ts
//   export const logger = (store: any) => (next: any) => (action: any) => {
//     console.log("dispatching", action);
//     let result = next(action);
//     console.log("next state", store.getState());
//     return result;
//   };

//   // src/components/SearchBar.tsx
//   import { Input } from "@/components/ui/input";
//   import { useAppDispatch } from "@/redux/hook";
//   import { setSearch } from "@/redux/features/bicycleSlice";

//   export default function SearchBar() {
//     const dispatch = useAppDispatch();
//     return (
//       <Input
//         type="text"
//         placeholder="Search by name, brand or category"
//         onChange={(e) => dispatch(setSearch(e.target.value))}
//         className="w-full mb-4"
//       />
//     );
//   }

//   // src/components/FilterSidebar.tsx
//   import { useAppDispatch } from "@/redux/hook";
//   import { setFilters } from "@/redux/features/bicycleSlice";

//   export default function FilterSidebar() {
//     const dispatch = useAppDispatch();
//     return (
//       <div className="space-y-4">
//         <input
//           type="number"
//           placeholder="Min Price"
//           onChange={(e) =>
//             dispatch(setFilters({ price: [Number(e.target.value), undefined] }))
//           }
//         />
//         <input
//           type="text"
//           placeholder="Brand"
//           onChange={(e) => dispatch(setFilters({ brand: e.target.value }))}
//         />
//         {/* Add other filters similarly */}
//       </div>
//     );
//   }

//   // src/components/BicycleCard.tsx
//   import { Button } from "@/components/ui/button";
//   import { Bicycle } from "@/types";
//   import { Link } from "react-router-dom";

//   export default function BicycleCard({ bicycle }: { bicycle: Bicycle }) {
//     return (
//       <div className="border p-4 rounded-xl shadow-md">
//         <img src={bicycle.image} alt={bicycle.name} className="w-full h-48 object-cover rounded" />
//         <h3 className="text-xl font-bold">{bicycle.name}</h3>
//         <p>{bicycle.brand} - {bicycle.model}</p>
//         <p>${bicycle.price}</p>
//         <p className="capitalize">{bicycle.category}</p>
//         <Link to={`/bicycles/${bicycle.id}`}>
//           <Button className="mt-2">View Details</Button>
//         </Link>
//       </div>
//     );
//   }

//   // src/pages/AllBicycles.tsx
//   import { useGetBicyclesQuery } from "@/redux/api/bicycleApi";
//   import { useAppSelector } from "@/redux/hook";
//   import BicycleCard from "@/components/BicycleCard";
//   import FilterSidebar from "@/components/FilterSidebar";
//   import SearchBar from "@/components/SearchBar";

//   export default function AllBicycles() {
//     const { data: bicycles = [] } = useGetBicyclesQuery();
//     const { search } = useAppSelector((state) => state.bicycle);

//     const filtered = bicycles.filter((b) =>
//       [b.name, b.brand, b.category].some((field) =>
//         field.toLowerCase().includes(search.toLowerCase())
//       )
//     );

//     return (
//       <div className="grid grid-cols-4 gap-4">
//         <div>
//           <SearchBar />
//           <FilterSidebar />
//         </div>
//         <div className="col-span-3 grid grid-cols-3 gap-4">
//           {filtered.map((bicycle) => (
//             <BicycleCard key={bicycle.id} bicycle={bicycle} />
//           ))}
//         </div>
//       </div>
//     );
//   }

//   // src/pages/BicycleDetails.tsx
//   import { useParams, useNavigate } from "react-router-dom";
//   import { useGetBicycleByIdQuery } from "@/redux/api/bicycleApi";
//   import { Button } from "@/components/ui/button";

//   export default function BicycleDetails() {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const { data } = useGetBicycleByIdQuery(id!);

//     if (!data) return <p>Loading...</p>;

//     return (
//       <div className="max-w-2xl mx-auto p-4">
//         <img src={data.image} alt={data.name} className="w-full h-64 object-cover mb-4 rounded" />
//         <h2 className="text-2xl font-bold mb-2">{data.name}</h2>
//         <p className="mb-1">Brand: {data.brand}</p>
//         <p className="mb-1">Model: {data.model}</p>
//         <p className="mb-1">Category: {data.category}</p>
//         <p className="mb-1">Availability: {data.availability ? "In Stock" : "Out of Stock"}</p>
//         <p className="text-xl font-semibold mt-2">${data.price}</p>
//         <p className="mt-4">{data.description}</p>
//         <Button onClick={() => navigate("/checkout")} className="mt-6">Buy Now</Button>
//       </div>
//     );
//   }
