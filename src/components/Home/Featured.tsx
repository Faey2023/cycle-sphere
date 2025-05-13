import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useGetAllBicycleQuery } from '@/redux/api/productApi';
import { Bicycle } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';

const Featured = () => {
  const { data: bicycles = [], isLoading } = useGetAllBicycleQuery({ page: 1, limit: 10 });
  const featuredBikes = bicycles?.data?.data?.slice(0, 7) || [];

  // console.log('Fetched:', bicycles?.data?.data?.length);

  if (isLoading) {
    return (
      <div>
        <Skeleton />
      </div>
    );
  }
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-white font-sans">
      <div className="mb-2.5 flex w-full justify-between px-10">
        <h3 className="text-xl font-bold text-red-700 capitalize italic lg:text-4xl">
          Best Selling Bicycles
        </h3>
        <Button asChild variant={'red'}>
          <Link to="/allBicycles">View All</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {featuredBikes.map((bike: Bicycle) => (
          <div
            key={bike._id}
            className="relative flex w-96 flex-col rounded-lg border border-slate-200 bg-white shadow-sm"
          >
            <div className="relative m-2.5 h-56 overflow-hidden rounded-md text-white">
              <img src={bike.img} alt="card-image" />
            </div>
            <div className="p-4">
              <h6 className="mb-2 text-xl font-semibold text-slate-800">{bike.name}</h6>
              <p className="leading-normal font-light text-slate-600">{bike.description}</p>
            </div>

            <div className="mt-2 px-4 pt-0 pb-4">
              <Link to={`/bicycles/${bike?._id}`}>
                <Button variant={'red'}> View Details</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featured;
