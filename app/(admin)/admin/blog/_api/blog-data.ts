"use server";

import { createClient } from "@/utils/supabase/server";

type BlogPostCount = {
  count: number | null;
};

const ITEMS_PER_PAGE = 6;

export async function fetchTotalBlogPosts(Search: string) {
  const supabase = createClient();

  try {
    const { count }: BlogPostCount = (await supabase
      .from("blog_posts")
      .select("*", { count: "estimated", head: true })
      .or(`title.ilike.%${Search}%, description.ilike.%${Search}%`)) ?? {
      count: 0,
    };

    const totalPages = Math.ceil(count! / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of Blog posts.");
  }
}

export async function fetchBlogPosts(
  query: string,
  currentPage: number,
  order: "asc" | "desc" = "desc",
  sort_by: string = "created_at"
) {
  const supabase = createClient();

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const limit = currentPage > 1 ? ITEMS_PER_PAGE : ITEMS_PER_PAGE - 1;

  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .or(`title.ilike.%${query}%, description.ilike.%${query}%`)
      .order(sort_by || "created_at", { ascending: order === "asc" })
      .range(offset - 1, limit);
    return { data, error };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of Blog posts.");
  }
}
