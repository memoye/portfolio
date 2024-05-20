"use client";

import {
  deleteSelectedImage,
  uploadCoverImage,
} from "@/app/(admin)/_actions/storage";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";
import { CheckIcon, ImageUpIcon, LoaderIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useState } from "react";

const MAX_IMAGE_SIZE = 1_240_000;

function ImageUpload({
  onImageUpload,
  onError,
  title,
}: {
  onImageUpload: (url: string) => void;
  onError: (errors: string[]) => void;
  title: string;
}) {
  const supabase = createClient();

  const initialState = {
    file: null,
  };

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [selectedImageDataURL, setSelectedImageDataURL] = useState<
    string | null
  >(null);
  const [uploadingState, setUploadingState] = useState<
    "idle" | "loading" | "error" | "success"
  >("idle");
  const [uploadError, setUploadError] = useState<string[] | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");

  async function updateFile(e: ChangeEvent<HTMLInputElement>) {
    const imageFile = e.target.files?.[0];
    if (!imageFile) return;

    const fileReader = new FileReader();
    setImageFile(imageFile);

    fileReader.onload = (e) => {
      const result = e.target?.result;
      if (result) {
        setSelectedImageDataURL(result.toString());
      }
    };

    fileReader.readAsDataURL(imageFile);

    if (imageFile.size > MAX_IMAGE_SIZE) {
      const tooLarge = `File must not exceed ${Math.floor(
        MAX_IMAGE_SIZE / 1_000_000
      )} MB or ~${Math.round(imageFile?.size / 1_000)} KB in size.`;

      setUploadError([tooLarge]);
      return onError([tooLarge]);
    }

    await uploadFile(imageFile);
  }

  async function uploadFile(imageFile: File) {
    setUploadError(null);
    setUploadingState("loading");

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("title", title);

    const data = await uploadCoverImage(formData);

    if (typeof data === "string") {
      if (data.startsWith(process.env.NEXT_PUBLIC_SUPABASE_URL!)) {
        onImageUpload(data);
        setImageUrl(data);
        setUploadingState("success");
      } else {
        setUploadError([data]);
        onError([data]);
        setUploadingState("error");
      }
    } else {
      let errors = data as { title: string[]; file: string[] };

      if (errors.file || errors.title) {
        if (errors?.title != null) {
          setUploadError((prev) => {
            if (prev) {
              return [...prev, ...errors.title];
            } else {
              return [...errors.title];
            }
          });
        }

        if (errors?.file != null) {
          setUploadError((prev) => {
            if (prev) {
              return [...prev, ...errors.file];
            } else {
              return [...errors.file];
            }
          });
        }
      } else {
        setUploadError(["Something went wrong!"]);
      }

      onError(uploadError || ["Something went wrong!"]);
      setUploadingState("error");
    }
  }

  async function removeImage() {
    setUploadingState("loading");

    const data = await deleteSelectedImage(imageUrl.split("images/")[1]);
    if (data.error) {
      setUploadError(["Failed to delete"]);
    } else {
      setUploadError(null);
      setSelectedImageDataURL(null);
      setImageFile(null);
      setImageUrl("");
    }
    setUploadingState("idle");
  }

  return (
    <>
      <p className="flex items-center justify-between text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        <span>Cover Image</span>
        {
          {
            idle: null,
            success: <CheckIcon className="text-green-500" />,
            loading: <LoaderIcon color="yellow" className="animate-spin" />,
            error: <XIcon className="text-destructive" />,
          }[uploadingState]
        }
      </p>
      <Label
        htmlFor="coverImage"
        className={cn(
          "min flex min-h-[350px] flex-col content-center items-center justify-center gap-3 rounded-md border-2 border-border bg-secondary p-8",
          {
            "border-green-500 bg-green-500/10": uploadingState === "success",
            "border- bg-destructive/10": uploadingState === "error",
            "border-yellow-300 bg-yellow-300/10": uploadingState === "loading",
          }
        )}
      >
        {selectedImageDataURL ? (
          <>
            <Image
              alt={`Selected image: ${imageFile?.name || "yes"}`}
              className={cn("max-w-md rounded", {
                "opacity-20": uploadingState === "error",
                "opacity-50": uploadingState === "loading",
                "opacity-100": uploadingState === "success",
              })}
              src={selectedImageDataURL}
              width={500}
              height={200}
            />
            <span className="block text-center">
              <span className="mb-4 block italic">
                {imageFile?.name}{" "}
                <span
                  className={cn({
                    "text-foreground/50":
                      imageFile && imageFile.size <= MAX_IMAGE_SIZE,
                    "text-destructive":
                      imageFile && imageFile.size > MAX_IMAGE_SIZE,
                  })}
                >
                  {imageFile?.size &&
                    `~${Math.round(imageFile?.size / 1_000)}KB`}
                </span>
              </span>
              <span className="my font-light text-foreground/80">
                {
                  {
                    idle: "Choose an image",
                    loading: "🫷😎🫸 Please wait...",
                    error: "Click within box to change image",
                    success: "😁👍 Upload successful!",
                  }[uploadingState]
                }
              </span>
            </span>
          </>
        ) : (
          <span className="text-center">
            <ImageUpIcon className="mx-auto block size-28 text-foreground/50" />
            <span className="mt-4 inline-block font-semibold">
              Choose a cover image
            </span>
          </span>
        )}
      </Label>

      <input
        className="invisible hidden"
        name="coverImage"
        type="file"
        accept="image/*"
        id="coverImage"
        disabled={
          uploadingState === "loading" || (!uploadError && imageFile != null)
        }
        hidden
        onChange={updateFile}
      />
      <div className="flex max-w-full items-center justify-between gap-4">
        {uploadError && (
          <ul aria-labelledby="coverImage" className="text-sm text-destructive">
            {uploadError.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        )}
        <div className="ml-auto flex w-fit gap-2 justify-self-end">
          {imageFile && uploadingState === "error" ? (
            <Button
              onClick={() => uploadFile(imageFile)}
              variant={"ghost"}
              size={"sm"}
            >
              Retry upload
            </Button>
          ) : null}
          <Button
            onClick={removeImage}
            variant={"destructive"}
            size={"sm"}
            disabled={!imageFile && uploadingState !== "success"}
          >
            Remove Image
          </Button>
        </div>
      </div>
    </>
  );
}
export default ImageUpload;
