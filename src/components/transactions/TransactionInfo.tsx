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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Transaction } from "@/models/transactions";
import { forwardRef, useImperativeHandle, useState } from "react";

type TransactionInfoPayload = {
  data: Transaction;
};

type TransactionInfoProps = {};

export type TransactionInfoRef = {
  open?: (payload: TransactionInfoPayload) => void;
  close?: () => void;
};

export const TransactionInfo = forwardRef<
  TransactionInfoRef,
  TransactionInfoProps
>((_, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const [transaction, setTransaction] = useState<Transaction>();

  useImperativeHandle(ref, () => ({
    open(payload: TransactionInfoPayload) {
      setTransaction(payload.data);
      setIsVisible(true);
    },
    close() {
      closeModal();
    },
  }));

  function closeModal() {
    setIsVisible(false);
  }

  return (
    <Dialog open={isVisible} onOpenChange={setIsVisible}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Transaction Info</DialogTitle>
          <DialogDescription>Full details summary</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});

TransactionInfo.displayName = "TransactionInfo"