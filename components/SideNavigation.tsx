import { adminRoutes } from "@/lib/adminSideNav";
import NavLink from "./NavLink";
import {RocketIcon} from 'lucide-react'

export default function SideNavigation() {
  return (
    <aside className="w-2/3 max-w-52 border-r p-2">
      <h1 className="text-lg m-4 font-bold">Portfolio Admin</h1>
      <div className="mt-4">
        <span className="border-b my-2 block"></span>
        <ul className="space-y-2">
          {adminRoutes.map(({href, name, icon:Icon}) => {
            return (
              <li>
                <NavLink className={{
                  default: "block p-4 font-medium text-muted-foreground hover:bg-muted/60 rounded",
                  active: "bg-accent text-foreground hover:bg-muted"
                }} href={href}>
                  <Icon/>
                  {name}</NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}

