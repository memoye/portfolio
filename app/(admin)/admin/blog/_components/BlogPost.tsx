import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { type BlogPost as BlogPostType } from "@/lib/definitions";
import { cn } from "@/lib/utils";
import {
  CalendarIcon,
  CheckCheckIcon,
  CheckIcon,
  Instagram,
  InstagramIcon,
  LinkedinIcon,
  LucideArrowUpRightFromCircle,
  LucideNotepadTextDashed,
  LucideTwitter,
  NotepadTextDashedIcon,
  SendIcon,
} from "lucide-react";
import Image from "next/image";

type BlogPostProps = BlogPostType;

export default function BlogPost(props: BlogPostProps) {
  const {
    id,
    title,
    cover_image,
    created_at,
    published,
    content,
    hits,
    cover_image_attribution,
    tags,
    description,
  } = props;

  return (
    <Card
      className="_p-4 group
     relative flex min-h-[200px] cursor-default flex-col justify-between overflow-hidden  border-border transition-shadow hover:shadow-md"
    >
      <div>
        <CardHeader>
          <CardTitle className="line-clamp-2 text-balance text-lg leading-7">
            {title}
          </CardTitle>
          {description && (
            <CardDescription className="line-clamp-4">
              {description}
            </CardDescription>
          )}
        </CardHeader>

        {/*  */}
        {description && published && (
          <CardContent className="m-2 rounded-lg">
            <p className="mb-3 flex items-center gap-2">
              <SendIcon size={18} /> Share to social
            </p>
            <div className="flex items-stretch justify-between gap-2">
              <button className="flex flex-1 flex-col items-center justify-center gap-2 rounded-md border-2 border-border bg-card p-2 hover:border-card-foreground">
                <LinkedinIcon />
                LinkedIn
              </button>
              <button className="flex flex-1 flex-col items-center justify-center gap-2 rounded-md border-2 border-border bg-card p-2 hover:border-card-foreground">
                <span className="text-2xl font-black">𝕏</span>
                <span>X</span>
              </button>
              <button className="flex flex-1 flex-col items-center justify-center gap-2 rounded-md border-2 border-border bg-card p-2 hover:border-card-foreground">
                <Instagram />
                LinkedIn
              </button>
            </div>
          </CardContent>
        )}

        {!description && (
          <>
            <Separator className="mb-4" />
            <CardContent>
              <figure className="relative mx-auto aspect-video h-auto w-full overflow-hidden rounded p-4 drop-shadow-lg group-hover:drop-shadow-none">
                <Image
                  src={cover_image || "/images/pexels-enginakyurt-3248292.jpg"}
                  className="flex place-items-center object-cover text-center font-mono"
                  fill
                  alt={title}
                />
                <figcaption className="absolute bottom-2 right-2 z-10 text-xs text-white opacity-80 shadow-lg">
                  {!cover_image && (
                    <span>
                      <a
                        href="https://www.pexels.com/photo/person-holding-smartphone-3248292/"
                        className="underline hover:text-blue-300"
                      >
                        Photo
                      </a>{" "}
                      by{" "}
                      <a
                        href="https://www.pexels.com/@enginakyurt/"
                        className="font-semibold underline hover:text-blue-300"
                      >
                        Engin Akyurt
                      </a>
                      .
                    </span>
                  )}
                </figcaption>
                <span className="delay-50 absolute inset-0 block bg-gradient-to-b from-transparent to-black opacity-10 transition-opacity duration-300 group-hover:opacity-30" />
              </figure>
            </CardContent>
          </>
        )}
      </div>

      <CardFooter
        className={cn("flex items-center gap-1", {
          "justify-between": published,
        })}
      >
        {!published && (
          <Button
            className="inline-flex flex-1 gap-2"
            variant={!published ? "default" : "secondary"}
          >
            <LucideArrowUpRightFromCircle className="size-4" />
            <span>Publish</span>
          </Button>
        )}
        <Button variant="outline">Edit</Button>
        {published && (
          <div className="flex h-8 items-center gap-2">
            <span
              className="inline-flex items-center gap-2 opacity-70"
              title="Hits"
            >
              <span className="">{hits}</span>
              <span className="sr-only">Number of hits</span>
              <CheckCheckIcon size={16} />
            </span>
            <Separator orientation="vertical" />
            <div className="flex items-center gap-1 text-xs font-light opacity-50">
              <CalendarIcon className="size-4" />{" "}
              <span className="sr-only">Created:</span>{" "}
              {new Date(created_at).toLocaleDateString()}
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
