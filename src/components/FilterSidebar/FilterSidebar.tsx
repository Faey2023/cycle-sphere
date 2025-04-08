import { setFilters } from '@/redux/features/bicycle/bicycleSlice';
import { useAppDispatch } from '@/redux/hook';
import { Card, CardContent } from '../ui/card';
import { Slider } from '../ui/slider';
import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Checkbox } from '../ui/checkbox';
import { useGetAllBicycleQuery } from '@/redux/api/baseApi';

export type TBrand = {
  brand: string[];
};

export default function FilterSidebar() {
  const dispatch = useAppDispatch();
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [availability, setAvailability] = useState(false);
  const { data, isLoading } = useGetAllBicycleQuery('');

  //
  const uniqueBrand: string[] = Array.from(new Set(data?.data.map((brand: string) => brand.brand)));
  const uniqueMode: string[] = Array.from(new Set(data?.data.map((model: string) => model.model)));
  const uniqueCategory: string[] = Array.from(
    new Set(data?.data.map((category: string) => category.category)),
  );
  const uniqueAvailability: string[] = Array.from(
    new Set(data?.data.map((availability: string) => availability.inStock)),
  );
  console.log('Unique brands: ', uniqueBrand, uniqueMode, uniqueCategory, uniqueAvailability);

  console.log('im from filter page', data?.data);
  // Price Slider
  const handleSliderChange = (value: [number, number]) => {
    setPriceRange(value);
    dispatch(setFilters({ price: value }));
  };

  // Price Inputs
  const handleInputChange = (index: number, value: number) => {
    const newRange: [number, number] = [...priceRange];
    newRange[index] = value;
    setPriceRange(newRange);
    dispatch(setFilters({ price: newRange }));
  };

  // Availability toggle
  const handleAvailabilityToggle = (checked: boolean) => {
    setAvailability(checked);
    dispatch(setFilters({ availability: checked ? 'inStock' : 'all' }));
  };

  return (
    <div className="mt-4 space-y-4">
      {/* Price Filter */}
      <Card className="w-full rounded-2xl p-4 shadow-md">
        <CardContent className="space-y-4">
          <h3 className="text-xl font-bold">Price Range</h3>

          <Slider
            min={0}
            max={10000}
            step={100}
            value={priceRange}
            onValueChange={handleSliderChange}
          />

          <div className="flex h-full w-full flex-col gap-2 md:flex-row">
            <input
              type="number"
              value={priceRange[0]}
              min={0}
              max={priceRange[1]}
              onChange={(e) => handleInputChange(0, Number(e.target.value))}
              placeholder="Min Price"
              className="w-full rounded border p-2 md:w-1/2"
            />
            <input
              type="number"
              value={priceRange[1]}
              min={priceRange[0]}
              max={10000}
              onChange={(e) => handleInputChange(1, Number(e.target.value))}
              placeholder="Max Price"
              className="w-full rounded border p-2 md:w-1/2"
            />
          </div>

          <p className="text-sm text-gray-500">
            Showing between <strong>${priceRange[0]}</strong> – <strong>${priceRange[1]}</strong>
          </p>
        </CardContent>
      </Card>

      {/* Brand Filter */}
      <Card className="w-full rounded-2xl p-4 shadow-md">
        <CardContent className="space-y-4">
          <h3 className="text-xl font-bold">Brand</h3>
          <div className="flex h-full w-full flex-col gap-2">
            {uniqueBrand.map((brand: string, index: number) => (
              <div className="flex w-full items-center gap-1" key={index}>
                <Checkbox />
                <label
                  htmlFor={`brand-${index}`}
                  className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {brand}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Model Filter */}
      <Card className="w-full rounded-2xl p-4 shadow-md">
        <CardContent className="space-y-4">
          <h3 className="text-xl font-bold">Model</h3>
          <div className="flex h-full w-full flex-col gap-2">
            {uniqueMode.map((model: string, index: number) => (
              <div className="flex w-full items-center gap-1" key={index}>
                <Checkbox />
                <label
                  htmlFor={`brand-${index}`}
                  className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {model}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Category Filter */}
      <Card className="w-full rounded-2xl p-4 shadow-md">
        <CardContent className="space-y-4">
          <h3 className="text-xl font-bold">Category</h3>
          <div className="flex h-full w-full flex-col gap-2">
            {uniqueCategory.map((category: string, index: number) => (
              <div className="flex w-full items-center gap-1" key={index}>
                <Checkbox />
                <label
                  htmlFor={`brand-${index}`}
                  className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {category}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Availability Switch */}
      <div className="flex items-center gap-2">
        <Card className="w-full rounded-2xl p-4 shadow-md">
          <CardContent className="space-y-4">
            <h3 className="text-xl font-bold"> availability</h3>
            <div className="flex h-full w-full flex-col gap-2">
              {uniqueAvailability.map((inStock: string, index: number) => (
                <div className="flex w-full items-center gap-1" key={index}>
                  <Checkbox />
                  <label
                    htmlFor={`brand-${index}`}
                    className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {inStock ? 'in Stock' : 'out of Stock'}
                  </label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
