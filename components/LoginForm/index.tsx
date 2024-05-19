import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./SubmitButton";
import { cookies } from "next/headers";

export default async function LoginForm() {
  // const cookieStore = cookies();
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log(error);
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/admin");
  };

  if (user) {
    return redirect("/admin");
  }

  return (
    <form
      className="animate-in flex w-full flex-1 flex-col justify-center gap-2 text-foreground"
      // action={signIn}
    >
      <label className="text-md" htmlFor="email">
        Email
      </label>
      <input
        className="mb-6 rounded-md border bg-inherit px-4 py-2"
        name="email"
        placeholder="you@example.com"
        required
      />
      <label className="text-md" htmlFor="password">
        Password
      </label>
      <input
        className="mb-6 rounded-md border bg-inherit px-4 py-2"
        type="password"
        name="password"
        placeholder="••••••••"
        required
      />
      <SubmitButton
        className="mb-2 rounded-md bg-green-700 px-4 py-2 text-foreground"
        pendingText="Signing In..."
        formAction={signIn}
      >
        Sign In
      </SubmitButton>
    </form>
  );
}
