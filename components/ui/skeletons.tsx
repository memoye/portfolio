import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "./separator";

export function BlogPostCardSkeleton({
  mockPublished = 1,
}: {
  mockPublished?: number;
}) {
  const randomPublishStatus =
    Math.ceil(mockPublished * (Math.random() * 10)) % 2 === 0;

  return (
    <div className="flex min-h-96 min-w-[150px] flex-col justify-between border border-border bg-card p-6">
      <div className="space-y-4">
        <div className="space-y-3">
          <Skeleton className="h-5 w-[250px]" />
          <Skeleton className="h-5 w-[120px]" />
        </div>

        {randomPublishStatus && (
          <div className="space-y-2">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-2/3" />
            <Skeleton className="h-3 w-4/5" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        )}
      </div>

      {randomPublishStatus ? (
        <div className="my-4 space-y-3 p-2">
          <Skeleton className="h-4 w-3/5" />
          <div className="flex h-16 items-stretch gap-2 *:flex-1">
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        </div>
      ) : (
        <div className="my-4 space-y-4 py-2">
          <Separator />
          <Skeleton className="h-[150px] w-full rounded" />
        </div>
      )}

      <div className="mt-6 flex w-full items-center justify-between gap-2">
        {randomPublishStatus ? (
          <>
            <Skeleton className="h-8 w-16" />

            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-8" />
              <Skeleton className="h-4 w-12" />
            </div>
          </>
        ) : (
          <>
            <Skeleton className="h-8 flex-1" />
            <Skeleton className="h-8 w-16" />
          </>
        )}
      </div>
    </div>
  );
}

export function BlogPostCardSkeletons({ amount = 3 }: { amount?: number }) {
  const skeletons = Array.from({ length: amount }, (_x, i) => i);

  return (
    <div className="grid grid-cols-[repeat(auto-fill,_minmax(300px,1fr))] content-center gap-8 lg:gap-12">
      {skeletons.map((i) => (
        <BlogPostCardSkeleton mockPublished={i} key={i} />
      ))}
    </div>
  );
}
