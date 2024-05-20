"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LucideLoader2, SaveIcon, XSquareIcon } from "lucide-react";
import { Editor } from "novel";
import { useCallback, useState } from "react";
import ImageUpload from "./ImageUpload";
import { useRouter } from "next/navigation";

export default function BlogForm() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[] | null>(null);
  const [uploadedImageURL, setUploadedImageURL] = useState<string | null>(null);

  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState({});

  const updateContent = useCallback((data: any) => {
    setBlogContent(data.getJSON());
  }, []);

  async function saveBlog() {
    setIsLoading(true);
    if (errors) return setIsLoading(false);

    const res = await fetch("/api/blog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: blogTitle,
        cover_image: uploadedImageURL,
        content: blogContent,
      }),
    });

    const data = await res.json();

    if (data) {
      setIsLoading(false);
      router.replace("/admin/blog");
    }
    setIsLoading(false);
  }

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30">
          <LucideLoader2 className="size-28 animate-spin text-gray-500" />
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="blogTitle">Title</Label>
        <Input
          name="blogTitle"
          id="blogTitle"
          value={blogTitle}
          onChange={(e) => setBlogTitle(e.target.value)}
          required
        />
      </div>

      <div className="mt-5 space-y-2">
        <ImageUpload
          onImageUpload={(url) => setUploadedImageURL(url)}
          onError={(err) => {
            setUploadedImageURL(null);
            setErrors(err);
          }}
          title={blogTitle}
        />
      </div>

      <div className="mt-5 space-y-2">
        <Label htmlFor="content">Content</Label>
        <Editor
          editorProps={{}}
          defaultValue={""}
          onDebouncedUpdate={updateContent}
          className="rounded border bg-card pb-8"
          disableLocalStorage
        />
      </div>
      <div className="mt-5 space-x-3 ">
        <Button variant={"destructive"} className="space-x-2 bg-opacity-50">
          <XSquareIcon size={16} />
          <span>Cancel</span>
        </Button>
        <Button
          className="space-x-2"
          onClick={saveBlog}
          disabled={uploadedImageURL == null || errors != null}
        >
          <SaveIcon size={16} />
          <span>Save</span>
        </Button>
      </div>
    </>
  );
}
