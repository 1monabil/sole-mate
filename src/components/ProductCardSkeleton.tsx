import { Skeleton } from '@/components/ui/skeleton';

export const ProductCardSkeleton = () => {
  return (
    <div className="animate-fade-in">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-secondary rounded-lg">
        <Skeleton className="w-full h-full" />
      </div>

      {/* Info */}
      <div className="p-4 space-y-3">
        <Skeleton className="h-3 w-16" /> {/* Brand */}
        <Skeleton className="h-5 w-3/4" /> {/* Name */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-16" /> {/* Price */}
          <Skeleton className="h-4 w-12" /> {/* Original price */}
        </div>
        <div className="flex items-center gap-1">
          <Skeleton className="h-4 w-20" /> {/* Stars */}
          <Skeleton className="h-3 w-8" /> {/* Reviews count */}
        </div>
      </div>
    </div>
  );
};

export const ProductGridSkeleton = ({ count = 4 }: { count?: number }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </>
  );
};
