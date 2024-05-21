import { Suspense } from "react";
import BlogPosts from "./_components/BlogPosts";
import Pagination from "@/app/_components/pagination";

export type PageProps = {
  params: { [key: string]: string | string[] | undefined };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function BlogPage(props: PageProps) {
  return (
    <>
      <h2>Blog Page</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <BlogPosts />
      </Suspense>
    </>
  );
}
