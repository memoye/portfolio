import { Suspense } from "react";
import BlogPosts from "./_components/BlogPosts";
import { BlogPostCardSkeletons } from "@/components/ui/skeletons";
import { createClient } from "@/utils/supabase/server";

export type PageProps = {
  params: { [key: string]: string | string[] | undefined };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function BlogPage(props: PageProps) {
  const { page = 1 } = props.searchParams ?? {};

  return (
    <>
      <h2>Blog Page</h2>
      <Suspense fallback={<BlogPostCardSkeletons />}>
        <BlogPosts page={Number(page)} />
      </Suspense>
    </>
  );
}
