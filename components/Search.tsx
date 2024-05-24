"use client";

import { LoaderIcon, SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

export default function Search({ placeholder }: { placeholder: string }) {
  const [searching, setSearching] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    setSearching(true);
    console.log(`Searching... ${term}`);

    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    setSearching(false);
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative flex max-w-sm flex-shrink-0">
      <Label htmlFor="search" className="sr-only">
        Search
      </Label>
      <Input
        type="search"
        name="search"
        id="search"
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("search")?.toString()}
      />
      <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 " />
    </div>
  );
}
