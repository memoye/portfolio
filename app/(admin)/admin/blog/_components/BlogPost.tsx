import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type BlogPost as BlogPostType } from "@/lib/definitions";
import {
  CalendarIcon,
  CheckIcon,
  LucideArrowUpRightFromCircle,
  LucideNotepadTextDashed,
  NotepadTextDashedIcon,
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
    description,
  } = props;

  return (
    <Card className="group relative cursor-default overflow-hidden rounded-lg border-border bg-transparent p-4">
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

      {!published && (
        <div className="absolute right-6 top-6 z-50 flex items-center gap-2">
          <NotepadTextDashedIcon size={26} className="text-white" />
          <span className="sr-only">
            This article is not yet published. Click on publish to publish it
          </span>
        </div>
      )}

      <CardHeader>
        <CardTitle className="mb-2 line-clamp-2 text-balance leading-7">
          {title}
        </CardTitle>
        <CardDescription className="flex items-center gap-1 font-light">
          <CalendarIcon className="size-4" />{" "}
          <span className="sr-only">Created:</span>{" "}
          {new Date(created_at).toLocaleDateString()}
        </CardDescription>
      </CardHeader>

      {description && (
        <CardContent>
          <p className="line-clamp-2 text-balance ">{description}</p>
        </CardContent>
      )}

      <CardFooter className="flex items-center gap-1">
        <Button
          className="inline-flex flex-1 gap-2"
          variant={!published ? "default" : "secondary"}
        >
          {published ? (
            <>
              <CheckIcon className="size-4" /> <span>Published</span>
            </>
          ) : (
            <>
              <LucideArrowUpRightFromCircle className="size-4" />{" "}
              <span>Publish</span>
            </>
          )}
        </Button>
        <Button className="" variant="outline">
          Edit
        </Button>
      </CardFooter>
    </Card>
  );
}
