"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LucideLoader2, SaveIcon, XIcon, XSquareIcon } from "lucide-react";
import { Editor } from "novel";
import { useCallback, useState } from "react";
import ImageUpload from "./ImageUpload";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import ConfirmationDialog from "@/app/_components/confirmation-dialog";
import { cn } from "@/lib/utils";

const MAX_TAGS = 8;

type EditorContent = {
  type: string;
  content: {}[];
};

export default function BlogForm() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[] | null>(null);
  const [uploadedImageURL, setUploadedImageURL] = useState<string | null>(null);
  const [tagInputValue, setTagInputValue] = useState("");

  const [blogTitle, setBlogTitle] = useState("");
  const [blogDescription, setBlogDescription] = useState("");
  const [imageAttribution, setImageAttribution] = useState("");
  const [published, setPublished] = useState(false);
  const [blogContent, setBlogContent] = useState<
    string | EditorContent | undefined
  >(undefined);
  const [blogTags, setBlogTags] = useState<string[]>([""]);

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
        cover_image_attribution: imageAttribution,
        tags: blogTags,
        content: blogContent,
        description: blogDescription,
        published: published,
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <LucideLoader2 className="size-28 animate-spin text-gray-500" />
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="blogTitle" className="text-xl">
          Title
        </Label>
        <Input
          name="blogTitle"
          id="blogTitle"
          className="placeholder:italic"
          placeholder="Choose a title for your blog post"
          value={blogTitle}
          onChange={(e) => setBlogTitle(e.target.value)}
          required
        />
      </div>

      <div className="mt-5 space-y-2">
        <Label htmlFor="blogDescription" className="text-xl">
          Description
        </Label>
        <Textarea
          name="blogDescription"
          className="placeholder:italic"
          id="blogDescription"
          value={blogDescription}
          onChange={(e) => setBlogDescription(e.target.value)}
          placeholder="Enter a short description for this blog post"
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
      <div className="space-y-2">
        <Label htmlFor="imageAttribution" className="text-xl">
          Image attribution (optional)
        </Label>
        <Input
          name="imageAttribution"
          id="imageAttribution"
          className="placeholder:italic"
          placeholder="Enter link or name of creator/source"
          value={imageAttribution}
          onChange={(e) => setImageAttribution(e.target.value)}
        />
      </div>

      <div className="mt-5 space-y-2">
        <Label htmlFor="content" className="text-xl">
          Content
        </Label>
        <Editor
          editorProps={{}}
          defaultValue={""}
          onDebouncedUpdate={updateContent}
          className="z-0 rounded border bg-card pb-8"
          disableLocalStorage
        />
      </div>

      {/* TODO: Extract this to a reusable <TagInput /> component */}
      <div className="mt-5 space-y-2">
        <Label htmlFor="blogTags" className="text-xl">
          Tags
        </Label>
        <div className="flex flex-col gap-2 rounded border px-4 py-2 outline-offset-2 outline-primary focus-within:outline">
          <textarea
            className="bg-red flex-auto resize-none border-none bg-transparent p-2 outline-none focus:outline-none"
            value={tagInputValue}
            name="blogTags"
            id="blogTags"
            onChange={(e) => {
              setTagInputValue(e.target.value);
              setBlogTags(
                e.target.value
                  .trim()
                  .split(", ")
                  .map((t) => t.trim().replace(",", ""))
              );
              if (e.target.value.split(",").length > MAX_TAGS) {
                e.target.value = e.target.value
                  .split(",")
                  .slice(0, MAX_TAGS)
                  .join(",");
                setBlogTags(
                  e.target.value
                    .split(", ")
                    .map((t) => t.trim().replace(",", ""))
                );
              }
            }}
            placeholder={`Enter up to ${
              MAX_TAGS - (blogTags?.length ?? 0)
            } comma-separated words/phrases`}
          />

          <div className="flex min-w-[200px] flex-wrap gap-1">
            {blogTags?.map((tag, i) => {
              if (tag === "") {
                return null;
              } else {
                return (
                  <p
                    key={tag + i}
                    className="flex w-fit items-center rounded-sm bg-secondary p-1 px-2 text-foreground/70"
                  >
                    <span>{tag}</span>
                    <button
                      className="flex items-center gap-2 rounded-full p-0.5 hover:bg-destructive/10"
                      onClick={() => {
                        const newTags = blogTags.filter((t) => t !== tag);
                        setBlogTags(newTags);
                        setTagInputValue(newTags.join(", "));
                      }}
                    >
                      <XIcon size={12} />
                      <span className="sr-only">remove {tag} from tags</span>
                    </button>
                  </p>
                );
              }
            })}
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between space-y-2 rounded border border-border p-4 ">
        <div className="">
          <Label htmlFor="published" className="flex flex-col text-xl">
            Publish
            <span className="text-base text-gray-500">
              Make visible on save
            </span>
          </Label>
        </div>
        <Switch
          id="published"
          name="published"
          checked={published}
          onCheckedChange={() => setPublished((prev) => !prev)}
        />
      </div>

      <div className="mt-5 flex items-center justify-end gap-2 max-sm:flex-col-reverse max-sm:items-stretch">
        {blogTitle || blogContent || uploadedImageURL ? (
          <ConfirmationDialog
            onConfirm={() => router.back()}
            description="Your changes will be discarded."
          >
            <span className={cn(buttonVariants({ variant: "outline" }))}>
              Cancel
            </span>
          </ConfirmationDialog>
        ) : (
          <Button variant={"outline"} onClick={() => router.back()}>
            Cancel
          </Button>
        )}
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
