import { Skeleton } from '@/components/ui/skeleton';

// Search Bar Skeleton
function SearchBarSkeleton() {
  return (
    <div className="w-full">
      <Skeleton className="h-10 w-full" />
    </div>
  );
}

// Filter Sidebar Skeleton
function FilterSidebarSkeleton() {
  return (
    <div className="mt-4 space-y-4">
      <Skeleton className="h-6 w-1/2" />
      <div className="space-y-2">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
      </div>

      <Skeleton className="mt-6 h-6 w-1/2" />
      <div className="space-y-2">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
      </div>

      <Skeleton className="mt-6 h-6 w-1/2" />
      <div className="space-y-2">
        <Skeleton className="h-9 w-full" />
      </div>
    </div>
  );
}

// Bicycle Card Skeleton
function BCardSkeleton() {
  return (
    <div className="bg-card flex h-full flex-col overflow-hidden rounded-lg border shadow-sm">
      <Skeleton className="h-48 w-full" />
      <div className="space-y-3 p-4">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="mt-2 h-9 w-full" />
      </div>
    </div>
  );
}

// Main LoadingSkeleton Component
export default function LoadingSkeleton() {
  return (
    <div className="container mx-auto p-4">
      {/* Mobile Drawer Trigger Skeleton - Only visible on small screens */}
      <div className="mb-4 flex md:hidden">
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        {/* Sidebar Skeleton - Hidden on mobile, visible on md and up */}
        <div className="hidden md:block md:w-1/4 lg:w-1/5">
          <SearchBarSkeleton />
          <FilterSidebarSkeleton />
        </div>

        {/* Main Content Skeleton - Full width on mobile, 3/4 on md and up */}
        <div className="w-full md:w-3/4 lg:w-4/5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {Array(8)
              .fill(0)
              .map((_, index) => (
                <BCardSkeleton key={index} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
