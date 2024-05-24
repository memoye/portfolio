import { Suspense } from "react";
import BlogPosts from "./_components/BlogPosts";
import { BlogPostCardSkeletons } from "@/components/ui/skeletons";
import Search from "@/components/Search";
import Pagination from "@/app/_components/pagination";
import { fetchTotalBlogPosts } from "./_api/blog-data";
import Order from "@/components/Order";

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
    order_by = "",
    order = "",
  } = props.searchParams ?? {
    page: 1,
    search: "",
    order_by: "",
    order: "",
  };

  const totalPages = await fetchTotalBlogPosts(search?.toString() || "");

  return (
    <>
      <h2 className="top-0 mb-2 text-3xl font-black">Blog</h2>
      {/* <p className="text-secondary-foreground">Manage your blog posts</p> */}
      <div className="mt-6 flex w-full flex-wrap items-center justify-between">
        <Search placeholder="Search blogs" />
        <Order />
      </div>

      <div className="my-12"></div>
      <Suspense
        key={search?.toString()! + page + order_by + order}
        fallback={<BlogPostCardSkeletons />}
      >
        <BlogPosts
          orderBy={{
            by: order_by as "created_at" | "published_at" | "title" | "hits",
            order: order as "asc" | "desc",
          }}
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
