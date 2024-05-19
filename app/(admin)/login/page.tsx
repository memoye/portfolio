import LoginForm from "@/components/LoginForm";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4">
      <div>
        <h1 className="mb-2 text-4xl font-bold">Welcome back!</h1>
        <p className="mb-6 text-foreground/70">Please login.</p>
        <LoginForm />
        {searchParams?.message && (
          <p className="mt-4 bg-foreground/10 p-4 text-center text-foreground">
            {searchParams.message}
          </p>
        )}
      </div>
    </div>
  );
}
