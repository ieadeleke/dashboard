
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

type TransactionDetailsPayload = {
    data: Transaction;
};

// type TransactionDetailsProps = {};
type TransactionDetailsProps = {
    reprocessPayment?: () => void
    reversePayment?: () => void
};

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

export const TransactionDetails = forwardRef<
    TransactionDetailsRef,
    TransactionDetailsProps
>((props, ref) => {
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
                        title: "Bill reference",
                        value: transaction.reference
                    }} />
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
                        value: formatAmount(transaction.amountPaid)
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
                        title: "Payment Reference",
                        value: transaction.paymentRef
                    }} />
                    <DetailItem data={{
                        title: "Transaction Date",
                        value: formatDate(transaction.createdAt)
                    }} />
                </div>

                {transaction.paymentDetails && <div className="flex flex-col">
                    <p className="font-semibold text-black">Payment Info</p>
                    <div className="grid gap-4 py-4">
                        <DetailItem data={{
                            title: "Currency",
                            value: transaction?.paymentDetails?.data.currency ? transaction?.paymentDetails?.data.currency : transaction?.paymentDetails?.data.payments?.currency ? transaction?.paymentDetails?.data.payments?.currency : ''
                        }} />
                        <DetailItem data={{
                            title: "Payment Method",
                            value: transaction?.paymentDetails?.data.auth_model ? transaction?.paymentDetails?.data.auth_model : transaction?.paymentDetails?.data.payments?.paymentType ? transaction?.paymentDetails?.data.payments?.paymentType : ''
                        }} />
                        <DetailItem data={{
                            title: "Channel Reference",
                            value: transaction?.paymentDetails?.data.flw_ref ? transaction?.paymentDetails?.data.flw_ref : transaction?.paymentDetails?.data.payments?.gatewayref ? transaction?.paymentDetails?.data.payments?.gatewayref : ''
                        }} />
                        <DetailItem data={{
                            title: "Revenue Code",
                            value: transaction.RevenueCode
                        }} />
                        <DetailItem data={{
                            title: "Transaction Refenrence",
                            value: transaction?.paymentDetails?.data.tx_ref ? transaction?.paymentDetails?.data.tx_ref : transaction?.paymentDetails?.data.payments?.paymentReference ? transaction?.paymentDetails?.data.payments?.paymentReference : ''
                        }} />
                    </div>
                </div>}

                {(transaction.paymentDetails && transaction?.paymentDetails?.data?.card) && <div className="flex flex-col">
                    <p className="font-semibold text-black">Card Info</p>
                    <div className="grid gap-4 py-4">
                        <DetailItem data={{
                            title: "First 6 Digits",
                            value: transaction?.paymentDetails?.data?.card?.first_6digits
                        }} />
                        <DetailItem data={{
                            title: "Last 6 Digits",
                            value: transaction?.paymentDetails?.data?.card?.last_4digits
                        }} />
                        <DetailItem data={{
                            title: "Country",
                            value: transaction?.paymentDetails?.data?.card?.country
                        }} />
                        <DetailItem data={{
                            title: "Card Type",
                            value: transaction?.paymentDetails?.data?.card?.type
                        }} />
                    </div>
                </div>}

                {(transaction.paymentDetails && transaction?.paymentDetails?.data?.customer) && <div className="flex flex-col">
                    <p className="font-semibold text-black">Customer</p>
                    <div className="grid gap-4 py-4">
                        <DetailItem data={{
                            title: "Name",
                            value: `${transaction?.paymentDetails?.data?.customer?.name}`
                        }} />
                    </div>
                </div>}

                {transaction.subaccounts && <div className="flex flex-col">
                    <p className="font-semibold text-black">Settlements</p>
                    <div className="grid gap-4 py-4">
                        {transaction.subaccounts.map((account) => {
                            return <div key={account.id} className="flex flex-col gap-2 border-b pb-8">
                                <DetailItem data={{
                                    title: "Account Number",
                                    value: account.account_number
                                }} />
                                <DetailItem data={{
                                    title: "Sort Code",
                                    value: account.account_bank
                                }} />
                                <DetailItem data={{
                                    title: "Amount",
                                    value: formatAmount(account.transaction_charge)
                                }} />
                            </div>
                        })}
                    </div>
                </div>}

                {transaction.paymentDetails ? <div className="flex flex-col">
                    <p className="font-semibold text-black">Customer Info</p>
                    <div className="grid gap-4 py-4">
                        <DetailItem data={{
                            title: "Name",
                            value: transaction?.paymentDetails?.data?.customer?.name ? transaction?.paymentDetails?.data?.customer?.name : transaction?.paymentDetails?.data?.customers?.customerName ? transaction?.paymentDetails?.data?.customers?.customerName : ''
                        }} />
                        <DetailItem data={{
                            title: "Email",
                            value: transaction?.paymentDetails?.data?.customer?.email ? transaction?.paymentDetails?.data?.customer?.email : transaction?.paymentDetails?.data?.customers?.customerEmail ? transaction?.paymentDetails?.data?.customers?.customerEmail : ''
                        }} />
                        <DetailItem data={{
                            title: "Phone Number",
                            value: transaction?.paymentDetails?.data?.customer?.phone_number ? transaction?.paymentDetails?.data?.customer?.phone_number : transaction?.paymentDetails?.data?.customers?.customerMobile ? transaction?.paymentDetails?.data?.customers?.customerMobile : ''
                        }} />
                    </div>
                </div> : <div className="flex flex-col">
                    <p className="font-semibold text-black">Customer Info</p>
                    <div className="grid gap-4 py-4">
                        <DetailItem data={{
                            title: "Name",
                            value: transaction?.PayerName
                        }} />
                        <DetailItem data={{
                            title: "Email",
                            value: transaction?.email
                        }} />
                        <DetailItem data={{
                            title: "Phone Number",
                            value: transaction?.mobile
                        }} />
                    </div>
                </div>}
                <DialogFooter className="gap-4">
                    {transaction.NotificationDetails && <Button variant="outlined" onClick={handlePrintReceipt} type="submit">Print Receipt</Button>}
                    {
                        (transaction?.Status?.toLowerCase() === "pending" || transaction?.Status?.toLowerCase() === "fail") &&
                        <Button onClick={() => {
                            props.reversePayment && props.reversePayment();
                            closeModal();
                        }} type="submit" variant="outlined">Reverse Payment</Button>
                    }
                    {
                        (transaction?.Status?.toLowerCase() === "pending" || transaction?.Status?.toLowerCase() === "fail") &&
                        <Button onClick={() => {
                            props.reprocessPayment && props.reprocessPayment();
                            closeModal();
                        }} type="submit" variant="outlined">Reprocess Payment</Button>
                    }
                    {/* {transaction.paymentDetails && transaction.paymentDetails.data.status == 'successful' ? <Button variant="outlined" onClick={handlePrintReceipt} type="submit">Print Receipt</Button> : <Button variant="outlined" onClick={handleGenerateReceipt} type="submit">Generate Receipt</Button>} */}
                    <Button onClick={closeModal} type="submit">Done</Button>
                </DialogFooter>
            </DialogContent>}
        </Dialog>
    );
});

TransactionDetails.displayName = "TransactionDetails"