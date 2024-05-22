import { createClient } from "@/utils/supabase/server";

export async function GET(_request: Request) {
  const supabase = createClient();

  const response = await supabase.from("blog_posts").select().limit(20);

  if (response.error) {
    return Response.json(response.error, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }

  return Response.json(response);
}

export async function POST(request: Request) {
  // const cookieStore = cookies();
  const supabase = createClient();

  const data = await request.json();

  const response = await supabase
    .from("blog_posts")
    .insert({
      title: data.title,
      description: data.description,
      cover_image: data.cover_image,
      cover_image_attribution: data.cover_image_attribution,
      tags: data.tags,
      content: data.content,
      published: data.published,
    })
    .select()
    // .limit(1)
    .single();
  console.log(data);

  return Response.json(response);
}

export async function UPDATE(request: Request) {}

export async function PATCH(request: Request) {}

export async function DELETE(request: Request) {}
