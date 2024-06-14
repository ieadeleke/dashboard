import { useImperativeHandle, useState } from "react";
import { forwardRef } from "react";
import { memo } from "react";
import { useRef } from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import Button from "./buttons";

type ConfirmationDialogProps = {};

type ConfirmationDialogDataParams = {
  title: string;
  description: string;
  cancelText?: string;
  confirmText?: string;
};

type ConfirmationDialogParams = {
  data: ConfirmationDialogDataParams;
  onConfirm?: () => void;
  onCancel?: () => void;
};

export type ConfirmationDialogRef = {
  showConfirmationDialog: (params: ConfirmationDialogParams) => void;
  closeConfirmationDialog: () => void;
};

const _ConfirmationDialog = forwardRef<
  ConfirmationDialogRef,
  ConfirmationDialogProps
>((props: ConfirmationDialogProps, ref) => {
  const [params, setParams] = useState<ConfirmationDialogDataParams | null>(
    null
  );
  const [isOpen, setIsOpen] = useState(false);
  const onConfirmRef = useRef<(() => void) | undefined>();
  const onCancelRef = useRef<(() => void) | undefined>();

  function closeDialog() {
    setIsOpen(false);
    setParams(null);
  }

  useImperativeHandle(ref, () => ({
    showConfirmationDialog(payload: ConfirmationDialogParams) {
      const { data } = payload;
      onConfirmRef.current = payload.onConfirm;
      onCancelRef.current = payload.onCancel;

      setParams({
        ...data,
        cancelText: data.cancelText || "Cancel",
        confirmText: data.confirmText || "Confirm",
      });
      setIsOpen(true);
    },
    closeConfirmationDialog() {
      closeDialog();
    },
  }));

  return (
    <Dialog
      open={isOpen}
      onOpenChange={closeDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent className={"flex flex-col gap-4"}>
        <div className="flex flex-col gap-2 text-center">
          <h3 className={"font-semibold text-xl"}>{params?.title}</h3>

          <p className="text-gray text-sm">{params?.description}</p>
        </div>

        <div className="grid grid-cols-2 items-center gap-4">
          <Button variant="contained" className="h-12 rounded-lg" onClick={onConfirmRef.current}>
            {params?.confirmText}
          </Button>
          <Button className="h-12 rounded-lg" variant="outlined" onClick={onCancelRef.current} autoFocus>
            {params?.cancelText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
});

_ConfirmationDialog.displayName = "Confirmation_Dialog_Component";
export const ConfirmationDialog = memo(_ConfirmationDialog, () => false);
