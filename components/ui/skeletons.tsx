import { Skeleton } from "@/components/ui/skeleton";

export function BlogPostCardSkeleton() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[200px] w-[300px] rounded-xl" />
      <div className="space-y-2 ">
        <Skeleton className="h-5 w-[250px]" />
        <Skeleton className="h-4 w-[150px]" />
      </div>

      <div className="mt-6 flex items-center">
        <Skeleton className="h-6 flex-1" />
        <Skeleton className="h-4 flex-auto" />
      </div>
    </div>
  );
}

export function BlogPostCardSkeletons({ amount = 3 }: { amount?: number }) {
  const skeletons = Array.from({ length: amount }, (_x, i) => i);

  return (
    <div className="grid grid-cols-[repeat(auto-fill,_minmax(300px,1fr))] content-center gap-8 lg:gap-12">
      {skeletons.map((i) => (
        <BlogPostCardSkeleton key={i} />
      ))}
    </div>
  );
}
