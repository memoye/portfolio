import BlogForm from "../_components/BlogForm";

export default async function CreateBlogPage() {
  return (
    <div className="mx-auto scroll-smooth md:max-w-4xl">
      <h2 className="mb-6 text-4xl font-black">Create New Blog Article</h2>
      <div>
        <BlogForm />
      </div>
    </div>
  );
}
