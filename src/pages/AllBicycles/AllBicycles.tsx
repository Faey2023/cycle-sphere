import BCard from '@/components/BicycleCard/BCard';

import { useGetAllBicycleQuery } from '@/redux/api/baseApi';
// import { useAppSelector } from '@/redux/hook';
import { Bicycle } from '@/types';

export default function AllBicycles() {
  // const dispatch = useAppDispatch()

  // const { bicycles } = useAppSelector((state) => state.bicycles);

  // console.log(bicycles);

  const { data, isLoading } = useGetAllBicycleQuery(undefined, {
    pollingInterval: 30000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  console.log('im from server: ', data?.data, isLoading);

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-1">{/* <SearchBar /> or <FilterSidebar /> */}</div>
      <div className="col-span-3 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data?.data.map((bicycle: Bicycle) => (
          // <BicycleCard bicycle={bicycle} key={index}></BicycleCard>
          <BCard bicycle={bicycle} key={bicycle._id}></BCard>
        ))}
      </div>
    </div>
  );
}
