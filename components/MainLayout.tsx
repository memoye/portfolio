import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import SideNavigation from "./SideNavigation";
import { ReactNode } from "react";
import { LogOutIcon, PlusIcon } from "lucide-react";
import SignOut from "./SignOut";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { adminRoutes } from "@/lib/routes";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { Separator } from "./ui/separator";

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

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="flex min-h-screen">
      <SideNavigation userEmail={user.email || ""} />
      <div className="flex-1">
        <header className="sticky top-0 z-40 bg-background/85 px-0 py-5 text-foreground backdrop-blur">
          <div className="container flex items-center justify-end max-sm:px-4">
            {/* <div className="font-extrabold">Page title</div> */}
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger
                  className={buttonVariants({
                    variant: "outline",
                    className: "cursor-pointer hover:text-primary",
                  })}
                  asChild
                >
                  <span className="inline-flex h-10 items-center border border-primary px-4 font-medium text-primary">
                    Create
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="space-y-1" align="end">
                  {adminRoutes
                    .filter((r) => !!r.child)
                    .map((route) => (
                      <DropdownMenuItem
                        asChild
                        key={route.href}
                        className="flex items-center justify-between gap-4 p-2 font-medium hover:bg-accent"
                      >
                        <Link href={`${route.href}/new`} scroll={false}>
                          <span>{route.child}</span>
                          <span className="text-foreground/50">
                            <PlusIcon className="size-4" />
                          </span>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="h-10">
                <Separator orientation="vertical" />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger className=" outline-offset-4 outline-ring">
                  <Avatar className="bg-accent text-accent-foreground outline outline-1 outline-ring hover:drop-shadow-md">
                    <AvatarImage src="https://github.com/memoye.png?size=256" />
                    <AvatarFallback className="font-extrabold uppercase">
                      {user?.email?.charAt(0) || "BM"}
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
                  <DropdownMenuItem>
                    <SignOut />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        <main className="relative bg-background p-4 pb-24 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
