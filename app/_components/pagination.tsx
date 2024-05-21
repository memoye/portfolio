"use client";

import { cn, divideIntoSections } from "@/lib/utils";

import {
  Pagination as PaginationContainer,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronsRightLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useSearchParams } from "next/navigation";

type PaginationProps = {
  page?: number;
  totalPages: number;
  href?: `/${string}`;
};

const MAX_LINKS_TO_SHOW = 3;

function Pagination(props: PaginationProps) {
  const { page = 1, href = "/", totalPages = 0 } = props;
  const searchParams = useSearchParams();

  const [showFurtherLinks, setShowFurtherLinks] = useState(false);

  const paginationLinks = Array.from({ length: totalPages }, (_x, i) => i + 1);
  const sections = divideIntoSections(paginationLinks, MAX_LINKS_TO_SHOW);
  const currentSection = sections.filter((section) =>
    section.includes(page)
  )[0];

  const hasPrevPage = page >= 2;
  const hasNextPage = page < totalPages;
  const canSafelyShowFurtherLinks =
    sections.indexOf(currentSection) < sections.length - 3;

  const isLastSection = sections.indexOf(currentSection) >= sections.length - 1;
  const isFirstSection = sections.indexOf(currentSection) === 0;

  function getPageURL(page: number) {
    const params = new URLSearchParams(searchParams);
    if (page < 1 || page > totalPages) {
      params.delete("page", page.toString());
      return href;
    }

    params.set("page", page.toString());
    return `${href}?${params.toString()}`;
  }

  if (totalPages < 2)
    return (
      <Separator className="bg-gradient mx-auto my-4 w-10 from-transparent via-secondary to-transparent" />
    );

  return (
    <PaginationContainer className="my-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={hasPrevPage ? getPageURL(page - 1) : "#"}
            aria-disabled={!hasPrevPage}
            className={cn({
              "opacity-40 hover:bg-background": !hasPrevPage,
            })}
          />
        </PaginationItem>

        {!isFirstSection && (
          <>
            <PaginationItem className="font-light">
              <PaginationLink href={getPageURL(1)}>1</PaginationLink>
            </PaginationItem>
            <Separator orientation="vertical" />
          </>
        )}
        {currentSection?.map((link) => (
          <PaginationItem key={link}>
            <PaginationLink
              href={getPageURL(link)}
              className={cn({
                border: page === link,
              })}
            >
              {link}
            </PaginationLink>
          </PaginationItem>
        ))}
        {sections.length > 1 && !isLastSection && (
          <>
            <PaginationItem>
              <Button
                variant="ghost"
                size={"icon"}
                disabled={
                  sections.indexOf(currentSection) === sections.length - 1
                }
                onClick={() => setShowFurtherLinks((prev) => !prev)}
              >
                {showFurtherLinks ? (
                  <>
                    <ChevronsRightLeft className="size-4" />
                    <span className="sr-only">Hide further link</span>
                  </>
                ) : (
                  <>
                    <PaginationEllipsis />
                    <span className="sr-only">Show further link</span>
                  </>
                )}
              </Button>
            </PaginationItem>
          </>
        )}

        {showFurtherLinks && canSafelyShowFurtherLinks && (
          <>
            {!showFurtherLinks && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            {sections[sections.indexOf(currentSection) + 2]
              ?.slice(2)
              ?.map((link) => (
                <PaginationItem key={link}>
                  <PaginationLink href={getPageURL(link)}>
                    {link}
                  </PaginationLink>
                </PaginationItem>
              ))}
          </>
        )}

        <PaginationItem>
          <PaginationNext
            href={hasNextPage ? getPageURL(page + 1) : "#"}
            className={cn({
              "opacity-40 hover:bg-background": !hasNextPage,
            })}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationContainer>
  );
}
export default Pagination;
