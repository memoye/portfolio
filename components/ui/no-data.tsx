import Image from "next/image";
import { Button } from "./button";
import Link from "next/link";

type NoDataFoundProps = {
  recoveryURL?: string;
  dataItemIdentifier?: string;
};

const undraw_void = "/undraw_void_-3-ggu.svg";

export default function NoDataFound(props: NoDataFoundProps) {
  const { dataItemIdentifier = "item", recoveryURL = "/" } = props;

  return (
    <div className="flex justify-center">
      <div className="flex min-h-[150px] w-full items-center justify-center rounded-xl border border-dashed border-foreground bg-muted/5 px-4 py-12">
        {/* LOGO COLOR HEX: #b04404*/}
        <div className="text-center">
          <figure className="mx-auto w-fit">
            <Image
              src={undraw_void}
              height={200}
              width={200}
              className="max-w-[150px]"
              alt="Not found"
            />
          </figure>
          <p className="mt-4 text-center text-lg font-bold">Not found!</p>
          <p className="text-secondary">
            No {dataItemIdentifier} matches your query.
          </p>
          <Button size={"sm"} variant={"outline"} className="mt-2" asChild>
            <Link href={recoveryURL} replace={true}>
              Refresh
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
