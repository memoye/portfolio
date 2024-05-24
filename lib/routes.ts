import {
  RocketIcon,
  BriefcaseBusinessIcon,
  HomeIcon,
  TextIcon,
  CircleUserIcon,
} from "lucide-react";

export const adminRoutes = [
  {
    name: "Home",
    icon: HomeIcon,
    href: "/admin",
  },
  {
    name: "About",
    icon: CircleUserIcon,
    href: "/admin/about",
  },
  {
    name: "Projects",
    child: "Project",
    icon: RocketIcon,
    href: "/admin/projects",
  },
  {
    name: "Experience",
    child: "Work Experience",
    icon: BriefcaseBusinessIcon,
    href: "/admin/experience",
  },
  // {
  //   name: "Skills/Tools",
  //   child: "Skill/Technology",
  //   icon: BriefcaseBusinessIcon,
  //   href: "/admin/skills",
  // },
  {
    name: "Blog",
    child: "Blog post",
    icon: TextIcon,
    href: "/admin/blog",
  },
];
