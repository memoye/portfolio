import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import SideNavigation from "./SideNavigation";
import { ReactNode } from "react";
import { LogOutIcon, PlusCircleIcon, PlusIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { adminRoutes } from "@/lib/routes";
import Link from "next/link";

export default async function MainLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = createClient();

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  const user = { email: "test@demo.com" }; // offline testing

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="flex min-h-screen">
      <SideNavigation />
      <div className="flex-1">
        <header className="p-5">
          <div className="container flex items-center justify-between">
            <div>Page title</div>
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger className="rounded border p-2 px-4 outline-offset-2 outline-ring hover:border-foreground/50 focus:outline">
                  <span className="text-foreground">Create</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="space-y-1" align="end">
                  {adminRoutes
                    .filter(({ name }) => name !== "Home")
                    .map(({ name, href }) => (
                      <DropdownMenuItem
                        asChild
                        key={href}
                        className="flex items-center justify-between p-2 font-medium"
                      >
                        <Link href={`${href}/new`} scroll={false}>
                          <span>
                            {name.charAt(name.length - 1) === "s"
                              ? name.slice(0, -1)
                              : name}
                          </span>
                          <span className="text-foreground/50">
                            <PlusIcon className="size-4" />
                          </span>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger className="rounded-full outline-offset-4 outline-ring">
                  <Avatar className="bg-accent text-accent-foreground outline outline-1 outline-ring drop-shadow-md hover:drop-shadow-none">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback className="font-extrabold uppercase">
                      {user?.email?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    {user.email ? (
                      <>
                        Hi,{" "}
                        <span className="capitalize">
                          {user.email.split("@")[0]}!{" "}
                        </span>
                      </>
                    ) : (
                      "Hi there! "
                    )}
                    👋
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut}>
                    <LogOutIcon /> Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );

  // return (
  //   <div className="flex items-center gap-4">
  //     Hey, {user.email}!
  //     <form action={signOut}>
  //       <button className="rounded-md bg-btn-background px-4 py-2 no-underline hover:bg-btn-background-hover">
  //         Logout
  //       </button>
  //     </form>
  //   </div>
  // );
  // : (
  //   <Link
  //     href="/login"
  //     className="flex rounded-md bg-btn-background px-3 py-2 no-underline hover:bg-btn-background-hover"
  //   >
  //     Login
  //   </Link>
  // );
}
