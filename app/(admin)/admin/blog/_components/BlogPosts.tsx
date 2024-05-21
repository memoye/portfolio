import { createClient } from "@/utils/supabase/server";
import { type BlogPost } from "@/lib/definitions";
import { notFound } from "next/navigation";
import Pagination from "@/app/_components/pagination";

type BlogPostCount = {
  count: number | null;
};

const PAGE_RANGE = 10;

const fetchBlogPosts = async (
  offset: number,
  limit: number,
  sort?: string,
  order?: "asc" | "desc"
) => {
  "use server";

  const supabase = createClient();

  // get total number of blog posts
  const { count: total }: BlogPostCount = (await supabase
    .from("blogs")
    .select("*", { count: "estimated", head: true })) ?? { count: 0 };

  // fetch paginated data
  const ascending = order === "asc";
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .order(sort || "created_at", { ascending })
    .range(offset, limit);

  if (error) {
    return notFound();
  }

  const result: { data: BlogPost[]; total: number } = {
    data,
    total: total ?? 0,
  };
  return result;
};

export default async function BlogPosts({ page = 1 }: { page?: number }) {
  const from = (page - 1) * PAGE_RANGE;
  const to = PAGE_RANGE * page;

  const { data, total } = await fetchBlogPosts(from, to);

  if (page > total) {
    return notFound();
  }

  return (
    <>
      {data?.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}

      <Pagination totalPages={total} page={page} href="/admin/blog" />
    </>
  );
}
