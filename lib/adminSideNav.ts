import { RocketIcon, BriefcaseBusinessIcon, TextQuoteIcon,  HomeIcon} from "lucide-react";

export const adminRoutes = [
  {
    name: "Home",
    icon: HomeIcon,
    href: "/admin",
  },
  {
    name: "Projects",
    icon: RocketIcon,
    href: "/admin/projects",
  },
  {
    name: "Experience",
    icon: BriefcaseBusinessIcon,
    href: "/admin/experience",
  },
  {
    name: "Blog",
    icon: "TextQuoteIcon",
    href: "/admin/blog",
  },
];
