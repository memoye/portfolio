import Image from "next/image";
import BlogPostCard from "./BlogPost";
import { fetchBlogPosts } from "../_api/blog-data";
import NoDataFound from "@/components/ui/no-data";

export default async function BlogPosts({
  page = 1,
  searchQuery,
  orderBy,
}: {
  page?: number;
  searchQuery?: string;
  orderBy?: {
    by?: "created_at" | "published_at" | "title" | "hits";
    order?: "asc" | "desc";
  };
}) {
  const { data, error } = await fetchBlogPosts(
    searchQuery || "",
    page,
    orderBy?.order,
    orderBy?.by
  );

  if (error) {
    console.log(error);
    // throw new Error(error.message || "Failed to fetch blog posts");
  }

  if (!data || data?.length < 1) {
    return (
      <NoDataFound recoveryURL="/admin/blog" dataItemIdentifier="blog post" />
    );
  }

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(250px,1fr))] content-center gap-8 lg:gap-12">
        {data?.map((post) => (
          <BlogPostCard key={post.id} {...post} />
        ))}
      </div>
    </>
  );
}
