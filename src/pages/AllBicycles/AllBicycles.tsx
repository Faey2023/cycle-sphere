import BCard from '@/components/BicycleCard/BCard';
import FilterSidebar from '@/components/FilterSidebar/FilterSidebar';
import SearchBar from '@/components/SearchBar/SearchBar';

import { useGetAllBicycleQuery } from '@/redux/api/baseApi';
import { useAppSelector } from '@/redux/hook';
// import { useAppSelector } from '@/redux/hook';
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

export default function AllBicycles() {
  const [open, setOpen] = useState(false);

  const { search } = useAppSelector((state) => state.bicycles);
  const { data: bicycles = [], isLoading, error } = useGetAllBicycleQuery(search);
  // const { filters, search } = useAppSelector((state) => state.bicycles);

  // const { data: bicycles = [], isLoading } = useGetAllBicycleQuery({
  //   search,
  //   filters,
  // });

  if (isLoading) {
    return <LoadingSkeleton></LoadingSkeleton>;
  }

  if (error || !bicycles?.data) {
    const safeError = error instanceof Error ? error : new Error('Unknown error');
    return <BicyclePageError error={safeError} reset={() => {}} />;
  }

  return (
    <div className="container mx-auto p-4">
      {/* Mobile Drawer Trigger - Only visible on small screens */}
      <div className="mb-4 flex md:hidden">
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button variant="outline" className="w-full">
              <Menu className="mr-2 h-4 w-4" />
              Filters & Search
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
        {/* Sidebar - Hidden on mobile, visible on md and up */}
        <div className="hidden md:block md:w-1/4 lg:w-1/5">
          <SearchBar />
          <FilterSidebar />
        </div>

        {/* Main Content - Full width on mobile, 3/4 on md and up */}
        <div className="w-full md:w-3/4 lg:w-4/5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {bicycles?.data?.length > 0 ? (
              bicycles.data.map((bicycle: Bicycle) => <BCard key={bicycle._id} bicycle={bicycle} />)
            ) : (
              <p className="col-span-full py-10 text-center text-gray-500">No bicycles found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
