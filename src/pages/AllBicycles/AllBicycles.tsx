import BCard from '@/components/BicycleCard/BCard';
import FilterSidebar from '@/components/FilterSidebar/FilterSidebar';
import SearchBar from '@/components/SearchBar/SearchBar';

import { useGetAllBicycleQuery } from '@/redux/api/baseApi';
import { useAppSelector } from '@/redux/hook';
// import { useAppSelector } from '@/redux/hook';
import { Bicycle } from '@/types';

export default function AllBicycles() {
  // const { search } = useAppSelector((state) => state.bicycles);
  // const { data: bicycles = [], isLoading } = useGetAllBicycleQuery(search);
  const { filters, search } = useAppSelector((state) => state.bicycles);

  const { data: bicycles = [], isLoading } = useGetAllBicycleQuery({
    search,
    filters,
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-1">
        <SearchBar />
        <FilterSidebar />
      </div>

      <div className="col-span-3 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {bicycles?.data?.length > 0 ? (
          bicycles.data.map((bicycle: Bicycle) => <BCard key={bicycle._id} bicycle={bicycle} />)
        ) : (
          <p className="col-span-full text-center text-gray-500">No bicycles found.</p>
        )}
      </div>
    </div>
  );
}
