import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Transaction } from "@/models/transactions";
import { forwardRef, useImperativeHandle, useState } from "react";

type TransactionDetailsPayload = {
    data: Transaction;
};

type TransactionDetailsProps = {};

export type TransactionDetailsRef = {
    open: (payload: TransactionDetailsPayload) => void;
    close?: () => void;
};

type DetailItemProps = {
    data: {
        title: string,
        value: string
    }
}

const DetailItem = (props: DetailItemProps) => {
    return <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
            {props.data.title}
        </Label>
        <Input id="name" disabled value={props.data.value} className="col-span-3" />
    </div>
}

export const TransactionDetails = forwardRef<
    TransactionDetailsRef,
    TransactionDetailsProps
>((_, ref) => {
    const [isVisible, setIsVisible] = useState(false);
    const [transaction, setTransaction] = useState<Transaction>();

    useImperativeHandle(ref, () => ({
        open(payload: TransactionDetailsPayload) {
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
            {transaction && <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Transaction Info</DialogTitle>
                    <DialogDescription>Full details summary</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <DetailItem data={{
                        title: "Payer Name",
                        value: transaction.PayerName
                    }} />
                    <DetailItem data={{
                        title: "Agency Name",
                        value: transaction.AgencyName
                    }} />
                    <DetailItem data={{
                        title: "Amount Paid",
                        value: transaction.amountPaid.toString()
                    }} />
                    <DetailItem data={{
                        title: "Revenue Name",
                        value: transaction.RevName
                    }} />
                    <DetailItem data={{
                        title: "Revenue Code",
                        value: transaction.RevenueCode
                    }} />
                    <DetailItem data={{
                        title: "Payment Refenrence",
                        value: transaction.paymentRef
                    }} />
                </div>
                <DialogFooter>
                    <Button onClick={closeModal} type="submit">Done</Button>
                </DialogFooter>
            </DialogContent>}
        </Dialog>
    );
});

TransactionDetails.displayName = "TransactionDetails"