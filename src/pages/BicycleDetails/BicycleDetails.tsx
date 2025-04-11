// src/pages/BicycleDetails.tsx
import { Button } from '@/components/ui/button';
import { useGetSingleBicycleQuery } from '@/redux/api/baseApi';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function BicycleDetails() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useGetSingleBicycleQuery(id);

  if (isLoading) return <p className="mt-10 text-center">Loading...</p>;
  if (error || !data?.data) return <p>Error fetching details.</p>;

  const bike = data?.data;

  return (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 p-6 md:grid-cols-2">
      <img src={bike.img} alt={bike.name} className="h-96 w-full rounded-2xl object-cover" />
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{bike.name}</h1>
        <p>
          <strong>Brand:</strong> {bike.brand}
        </p>
        <p>
          <strong>Model:</strong> {bike.model}
        </p>
        <p>
          <strong>Category:</strong> {bike.category}
        </p>
        <p>
          <strong>Price:</strong> ${bike.price}
        </p>
        <Link to={`/checkout`}>
          <Button className="mt-4 rounded-xl bg-blue-600 px-4 py-2 text-white">Buy Now</Button>
        </Link>
      </div>
    </div>
  );
}
