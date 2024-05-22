import { scrollToTop } from "@/lib/utils";
import BlogForm from "../_components/BlogForm";

async function CreatBlogPage() {
  scrollToTop();

  return (
    <div className="scroll-smooth">
      <h2 className="mb-6 text-4xl font-black">Create New Blog Article</h2>
      <BlogForm />
    </div>
  );
}
export default CreatBlogPage;
