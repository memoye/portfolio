import { Suspense } from "react";
import BlogPosts from "./_components/BlogPosts";
import { BlogPostCardSkeletons } from "@/components/ui/skeletons";
import Search from "@/components/Search";
import Pagination from "@/app/_components/pagination";
import { fetchTotalBlogPosts } from "./_api/blog-data";

export type PageProps = {
  params: {
    [key: string]: string | string[] | undefined;
  };
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
};

export default async function BlogPage(props: PageProps) {
  const {
    page = 1,
    search = "",
    sort = "desc",
  } = props.searchParams ?? {
    page: 1,
    search: "",
    sort: "desc",
  };

  const totalPages = await fetchTotalBlogPosts(search?.toString() || "");

  return (
    <>
      <h2>Blog Page</h2>
      <div>
        <Search placeholder="Search blogs" />
      </div>

      <div className="my-12"></div>
      <Suspense
        key={search?.toString()! + page + sort}
        fallback={<BlogPostCardSkeletons />}
      >
        <BlogPosts
          sort={sort?.toString() as "asc" | "desc" | undefined}
          searchQuery={search?.toString() || ""}
          page={Number(page)}
        />
      </Suspense>
      {totalPages > 1 && (
        <div className="mx-auto my-10 flex w-full items-center justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      )}
    </>
  );
}
