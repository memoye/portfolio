"use server";

import { createClient } from "@/utils/supabase/server";
import { z } from "zod";

const fileSchema = z.instanceof(File, { message: "Required" });
const imageSchema = fileSchema.refine(
  (file: File) => file.size === 0 || file.type.startsWith("image/")
);

const uploadSchema = z.object({
  file: imageSchema.refine((file) => file.size > 0, "Required"),
  title: z.string().min(1, { message: "Please enter a Title first." }),
});

export async function uploadCoverImage(formData: FormData) {
  const supabase = createClient();
  const result = uploadSchema.safeParse(Object.fromEntries(formData.entries()));

  if (result.success == false) {
    console.log("Error validating input");
    return result.error.formErrors.fieldErrors;
  }

  const { file, title } = result.data;

  const { data: uploadedFileData, error } = await supabase.storage
    .from("images")
    .upload(
      `blog/${title.trim().split(" ").join("-")}-${crypto.randomUUID()}`,
      file
    );

  if (error) return error;

  return `${process.env
    .NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/images/${
    uploadedFileData.path
  }`;
}

export async function deleteSelectedImage(path: string) {
  const supabase = createClient();
  const data = await supabase.storage.from("images").remove([path]);
  return data;
}
