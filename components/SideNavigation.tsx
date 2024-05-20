import { adminRoutes } from "@/lib/routes";
import NavLink from "./NavLink";
import { cn } from "@/lib/utils";

export default function SideNavigation() {
  return (
    <aside className="w-2/3 max-w-52 border-r">
      <h1 className="m-6 text-lg font-bold">Portfolio Admin</h1>
      <div className="mt-4">
        <span className="my-2 block border-b"></span>
        <ul className="space-y-2 p-2">
          {adminRoutes.map(({ href, name, icon: Icon }) => {
            return (
              <li key={href}>
                <NavLink
                  className={{
                    default:
                      "relative flex items-center gap-2 rounded p-4 font-medium text-muted-foreground hover:bg-muted/60 ",
                    active: cn(
                      "bg-accent text-foreground hover:bg-muted"
                      // "after:absolute after:right-4 after:text-sm after:content-['📝']"
                    ),
                  }}
                  href={href}
                >
                  <Icon />
                  {name}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
