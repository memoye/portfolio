import { adminRoutes } from "@/lib/routes";
import NavLink from "./NavLink";
import { cn } from "@/lib/utils";
import { ChevronsUpDown } from "lucide-react";
import Image from "next/image";
import { Separator } from "./ui/separator";
import CustomLogo from "./CustomLogo";

export default function SideNavigation({
  userEmail: email,
}: {
  userEmail: string;
}) {
  return (
    <aside className="sticky inset-y-0 flex max-h-screen max-w-52 flex-col justify-between bg-card text-foreground drop-shadow">
      <div>
        <h1 className="m-6 flex items-center gap-2 text-lg font-bold ">
          <CustomLogo />
          <span className="min-w-max max-sm:sr-only">Admin Panel</span>
        </h1>
        <div className="px-5">
          <span className="mx-auto my-4 block h-[1px] w-full bg-gradient-to-r from-transparent via-muted to-transparent" />
        </div>
        <div className="mt-4">
          <ul className="space-y-2 p-2">
            {adminRoutes.map(({ href, name, icon: Icon }) => {
              return (
                <li key={href}>
                  <NavLink
                    className={{
                      default: cn(
                        "relative flex items-center gap-2 rounded border border-transparent p-4 font-light text-primary-foreground/80 transition-colors duration-200 ease-in-out hover:border-border",
                        "max-sm:mx-auto max-sm:max-w-12 max-sm:justify-center max-sm:p-2"
                      ),
                      active: cn(
                        "border-primary text-primary hover:border-primary"
                      ),
                    }}
                    href={href}
                  >
                    <Icon />
                    <span className="max-sm:sr-only">{name}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <button className="flex items-center justify-between p-4 italic tracking-wide">
        <span className="max-sm:sr-only">
          {email.split("@").map((segment, i) => {
            return (
              <span
                key={segment}
                className={cn(
                  "inline-block w-max items-center text-xs",
                  i == 0
                    ? "mb-0 max-w-20 truncate"
                    : "truncate before:content-['@']"
                )}
              >
                {segment}
              </span>
            );
          })}
        </span>

        <ChevronsUpDown size={14} />
      </button>
    </aside>
  );
}
