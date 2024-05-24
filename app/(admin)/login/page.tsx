import CustomLogo from "@/components/CustomLogo";
import LoginForm from "@/components/LoginForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4">
      <Card className="drop-shadow-lg animate-in">
        <CardHeader>
          <CustomLogo size="lg" />
          <h1 className="mb-2 text-4xl font-bold">Welcome back!</h1>
          <CardDescription className="mb-6 text-foreground/70">
            Please login.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>

        <CardFooter>
          <>
            {searchParams?.message && (
              <p className="mt-4 w-full max-w-full bg-destructive/50 p-4 text-center text-destructive-foreground">
                {searchParams.message}
              </p>
            )}
          </>
        </CardFooter>
      </Card>
    </div>
  );
}
