"use client";

import { useFormStatus } from "react-dom";
import { type ComponentProps } from "react";
import { Button, buttonVariants } from "./ui/button";
import { LoaderIcon } from "lucide-react";
import { type VariantProps } from "class-variance-authority";

type Props = ComponentProps<"button"> &
  React.RefAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    pendingText?: string;
  };

export function SubmitButton({
  children,
  pendingText,
  className,
  ...props
}: Props) {
  const { pending, action } = useFormStatus();

  const isPending = pending && action === props.formAction;

  return (
    <>
      <Button
        {...props}
        type="submit"
        aria-disabled={pending}
        disabled={pending}
      >
        {isPending ? (
          <>
            <LoaderIcon
              size={16}
              className="mr-2 inline-block h-4 w-4 animate-spin"
            />{" "}
            {pendingText || children}
          </>
        ) : (
          children
        )}
      </Button>
    </>
  );
}
