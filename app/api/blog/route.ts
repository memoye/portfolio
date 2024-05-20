import { createClient } from "@/utils/supabase/server";

export async function GET(_request: Request) {
  const supabase = createClient();

  const response = await supabase.from("blogs").select().limit(20);

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
    .from("blogs")
    .insert({
      title: data.title,
      cover_image: data.cover_image,
      content: data.content,
    })
    .select()
    // .limit(1)
    .single();

  return Response.json(response);
}

export async function UPDATE(request: Request) {}

export async function PATCH(request: Request) {}

export async function DELETE(request: Request) {}
