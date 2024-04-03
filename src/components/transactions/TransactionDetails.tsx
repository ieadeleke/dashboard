
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
        <Label htmlFor="name" className="text-left">
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

                {transaction.paymentDetails && <div className="flex flex-col">
                    <p className="text-gray-500">Payment Info</p>
                    <div className="grid gap-4 py-4">
                        <DetailItem data={{
                            title: "Currency",
                            value: transaction.paymentDetails.data.currency
                        }} />
                        <DetailItem data={{
                            title: "Payment Method",
                            value: transaction.paymentDetails.data.auth_model
                        }} />
                        <DetailItem data={{
                            title: "Channel Reference",
                            value: transaction.paymentDetails.data.flw_ref
                        }} />
                        <DetailItem data={{
                            title: "Revenue Code",
                            value: transaction.RevenueCode
                        }} />
                        <DetailItem data={{
                            title: "Transaction Refenrence",
                            value: transaction.paymentDetails.data.tx_ref
                        }} />
                    </div>
                </div>}

                {transaction.paymentDetails && <div className="flex flex-col">
                    <p className="text-gray-500">Customer Info</p>
                    <div className="grid gap-4 py-4">
                        <DetailItem data={{
                            title: "Name",
                            value: transaction.paymentDetails.data.customer.name
                        }} />
                        <DetailItem data={{
                            title: "Email",
                            value: transaction.paymentDetails.data.customer.email
                        }} />
                        <DetailItem data={{
                            title: "Phone Number",
                            value: transaction.paymentDetails.data.customer.phone_number
                        }} />
                    </div>
                </div>}
                <DialogFooter className="gap-4">
                    {transaction.paymentDetails && <Button variant="outlined" onClick={handlePrintReceipt} type="submit">Print Receipt</Button>}

                    {/* {transaction.paymentDetails && transaction.paymentDetails.data.status == 'successful' ? <Button variant="outlined" onClick={handlePrintReceipt} type="submit">Print Receipt</Button> : <Button variant="outlined" onClick={handleGenerateReceipt} type="submit">Generate Receipt</Button>} */}
                    <Button onClick={closeModal} type="submit">Done</Button>
                </DialogFooter>
            </DialogContent>}
        </Dialog>
    );
});

TransactionDetails.displayName = "TransactionDetails"