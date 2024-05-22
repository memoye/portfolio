import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

type ConfirmationDialogProps = {
  title?: string;
  description?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  children?: React.ReactNode;
};

function ConfirmationDialog({
  title = "Are you sure?",
  description = "This action cannot be undone.",
  onConfirm,
  onCancel,
  children: triggerText,
}: ConfirmationDialogProps) {
  const [open, setOpen] = useState(false);

  function close() {
    setOpen(false);
  }

  function confirmAction() {
    onConfirm();
    close();
  }

  function cancelAction() {
    onCancel?.();
    close();
  }

  return (
    <Dialog open={open}>
      <DialogTrigger onClick={() => setOpen(true)}>{triggerText}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex items-center justify-end gap-2">
          <Button variant="outline" onClick={cancelAction}>
            Cancel
          </Button>
          <Button onClick={confirmAction}>Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default ConfirmationDialog;
