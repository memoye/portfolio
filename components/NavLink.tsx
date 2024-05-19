"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function NavLink({
  href,
  className,
  children,
}: {
  href: string;
  className?:
    | {
        default?: string;
        active?: string;
      }
    | string;
  children?: ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={
        typeof className === "string" || !className
          ? className
          : cn(
              className?.default,
              className.active && { [className?.active]: isActive }
            )
      }
    >
      {children}
    </Link>
  );
}
