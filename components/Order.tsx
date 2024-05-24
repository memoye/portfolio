"use client";

import {
  ArrowDownIcon,
  ArrowUpDownIcon,
  ArrowUpIcon,
  SearchIcon,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button, buttonVariants } from "./ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export default function Order() {
  const [sorting, setSorting] = useState(false);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSort =
    //  useDebouncedCallback(
    (order_by: string, order: "asc" | "desc" = "asc") => {
      setSorting(true);
      console.log(`Sorting by ${order_by}...`);
      const params = new URLSearchParams(searchParams);

      params.set("page", "1");

      if (order_by) {
        params.set("order_by", order_by);
        params.set("order", order);
      } else {
        params.delete("order_by");
        params.delete("order");
      }
      setSorting(false);
      replace(`${pathname}?${params.toString()}`);
    };
  // 100
  // );

  const currentOrderBy = searchParams.get("order_by");
  const currentOrder = searchParams.get("order");

  return (
    <div
      className={cn(
        "relative flex w-fit flex-shrink-0 outline-primary focus-within:outline focus-within:outline-offset-2",
        {
          "opacity-50": sorting,
        }
      )}
    >
      <Select onValueChange={(value) => handleSort(value)}>
        <SelectTrigger className="z-10 w-[180px] rounded-r-none outline-none">
          <SelectValue placeholder="Order by" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Order by</SelectLabel>
            <SelectItem value="title">Title</SelectItem>
            <SelectItem value="created_at">Date Created</SelectItem>
            <SelectItem value="date_published">Date Published</SelectItem>
            <SelectItem value="hits">Hits</SelectItem>
            {/* <SelectItem value="updated_at">Date updated</SelectItem> */}
          </SelectGroup>
        </SelectContent>
      </Select>

      <DropdownMenu>
        <DropdownMenuTrigger className="-ml-px" disabled={!currentOrderBy}>
          <span
            className={buttonVariants({
              size: "icon",
              class: "rounded-l-none",
              variant: "outline",
            })}
          >
            {currentOrderBy ? (
              currentOrder === "asc" ? (
                <>
                  <ArrowUpIcon />
                  <span className="sr-only">Ascending</span>
                </>
              ) : currentOrder === "desc" ? (
                <>
                  <ArrowDownIcon />
                  <span className="sr-only">Descending</span>
                </>
              ) : (
                <>
                  <ArrowUpDownIcon />
                  <span className="sr-only">Order</span>
                </>
              )
            ) : (
              <>
                <ArrowUpDownIcon />
                <span className="sr-only">Order</span>
              </>
            )}
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Order</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {[
            { o: "asc", i: ArrowUpIcon },
            { o: "desc", i: ArrowDownIcon },
          ].map(({ o, i: I }) => (
            <DropdownMenuItem>
              <button className={cn("flex items-center justify-center gap-2")}>
                <I
                  size={16}
                  className={currentOrder === o ? "visible" : "invisible"}
                />{" "}
                <span>{o === "asc" ? "Ascending" : "Descending"}</span>
              </button>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
// defaultValue={searchParams.get("search")?.toString()}
