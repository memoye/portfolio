import { cn } from "@/lib/utils";
import Image from "next/image";

function CustomLogo({
  className = "",
  size,
}: {
  className?: string;
  size?: "lg" | "md" | "sm";
}) {
  return (
    <span
      className={cn(
        "relative inline-block object-cover p-1",
        {
          "h-16 w-16": size === "lg",
          "h-12 w-12": ["md", undefined].includes(size),
          "h-10 w-10": size === "sm",
        },
        className
          .split(" ")
          // remove invalid sizes
          .filter((i) => !i.startsWith("h-") || !i.startsWith("w-"))
          .join(" ")
      )}
    >
      <Image className="drop-shadow" src={"/logo.svg"} fill alt="logo" />
    </span>
  );
}
export default CustomLogo;
