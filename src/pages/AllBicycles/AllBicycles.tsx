import BCard from '@/components/BicycleCard/BCard';
import FilterSidebar from '@/components/FilterSidebar/FilterSidebar';
import SearchBar from '@/components/SearchBar/SearchBar';

import { useAppSelector } from '@/redux/hook';
import { Bicycle } from '@/types';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import LoadingSkeleton from './LoadingSkeleton';
import BicyclePageError from './BicyclePageError';
import { useGetAllBicycleQuery } from '@/redux/api/productApi';

export default function AllBicycles() {
  const [open, setOpen] = useState(false);

  // searchTerm and filter
  const { search, filters } = useAppSelector((state) => state.bicycles);

  // query parameters
  const queryParams = {
    searchTerm: search,
    brand: filters.brand,
    category: filters.category,
    model: filters.model,
    minPrice: filters.price[0],
    maxPrice: filters.price[1],
    inStock: filters.availability === 'all' ? undefined : filters.availability,
  };

  // fetch filtered data
  const { data: bicycles = [], isLoading, error } = useGetAllBicycleQuery(queryParams);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error || !bicycles?.data) {
    const safeError = error instanceof Error ? error : new Error('Unknown error');
    return <BicyclePageError error={safeError} reset={() => {}} />;
  }

  // Get filter stats [true, true, ...]
  const activeFiltersCount = [
    !!filters.brand,
    !!filters.category,
    !!filters.model,
    filters.availability !== 'all',
    filters.price[0] > 0 || filters.price[1] < 10000,
  ].filter(Boolean).length; //filter((item) => Boolean(item))

  return (
    <div className="container mx-auto p-4">
      {/* mbl Drawer - < sm only */}
      <div className="mb-4 flex md:hidden">
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button variant="outline" className="w-full">
              <Menu className="mr-2 h-4 w-4" />
              Filters & Search {activeFiltersCount > 0 && `(${activeFiltersCount})`}
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Filters & Search</DrawerTitle>
              <DrawerDescription>Find the perfect bicycle for your needs</DrawerDescription>
            </DrawerHeader>
            <div className="max-h-[60vh] overflow-y-auto px-4 pb-4">
              <SearchBar />
              <FilterSidebar />
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        {/* Sidebar visible on md => */}
        <div className="hidden md:block md:w-1/4 lg:w-1/5">
          <SearchBar />
          <FilterSidebar />
        </div>

        {/* main content */}
        <div className="w-full md:w-3/4 lg:w-4/5">
          {/* Filter status summary */}
          <div className="mb-4">
            {activeFiltersCount > 0 ? (
              <div className="mb-2 rounded bg-gray-100 p-2 text-sm">
                <p>{bicycles?.data?.length} results found with current filters</p>
              </div>
            ) : null}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {bicycles?.data?.length > 0 ? (
              bicycles.data.map((bicycle: Bicycle) => <BCard key={bicycle._id} bicycle={bicycle} />)
            ) : (
              <div className="col-span-full flex flex-col items-center py-10 text-center text-gray-500">
                <p className="mb-4">No bicycles found matching your criteria.</p>
                <Button variant="outline" onClick={() => window.location.reload()}>
                  Reset All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
