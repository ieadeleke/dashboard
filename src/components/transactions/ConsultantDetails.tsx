
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
import Button from "../buttons";
import { formatDate } from "@/utils/formatters/formatDate";
import { formatAmount } from "@/utils/formatters/formatAmount";
import { ConsultantInnerSuperAgentTable } from "./ConsultantInnerSuperAgentTable";

type TransactionDetailsPayload = {
    data: any;
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
        <Label htmlFor="name" className="text-left text-gray-600">
            {props.data.title}
        </Label>
        <Input id="name" disabled value={props.data.value} className="col-span-3" />
    </div>
}

export const ConsultantDetails = forwardRef<
    TransactionDetailsRef,
    TransactionDetailsProps
>((_, ref) => {
    const [isVisible, setIsVisible] = useState(false);
    const [transaction, setTransaction] = useState<any>();

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

    function handlePrintReceipt() {
        if (transaction) {
            window.open(transaction.NotificationDetails.ReceiptNumber, "_blank")
        }
    }

    function handleGenerateReceipt() {
        if (transaction) {
            const url = `https://usepay4it.com/payment/collection?tx_reference=${transaction.paymentRef}`
        }
    }

    return (
        <Dialog open={isVisible} onOpenChange={setIsVisible}>
            {transaction && <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-scroll no-scrollbar">
                <DialogHeader>
                    <DialogTitle>Transaction Info</DialogTitle>
                    <DialogDescription>Full details summary</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <DetailItem data={{
                        title: "Consultant Name",
                        value: transaction.companyName
                    }} />
                    <DetailItem data={{
                        title: "Total Amount",
                        value: formatAmount(+transaction?.companyTotalAmount)
                    }} />
                    <DetailItem data={{
                        title: "Total Company Transactions",
                        value: transaction.companyTransactionCount
                    }} />
                    <div className="mt-6">
                        <ConsultantInnerSuperAgentTable data={transaction?.superAgents} />
                    </div>
                </div>
            </DialogContent>}
        </Dialog>
    );
});

ConsultantDetails.displayName = "ConsultantDetails"