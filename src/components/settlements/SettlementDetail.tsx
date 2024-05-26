
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
import { Settlement } from "@/models/settlements";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import Button from "../buttons";
import { formatDate } from "@/utils/formatters/formatDate";
import { formatAmount } from "@/utils/formatters/formatAmount";
import { capitalizeFirstLetter } from "@/utils/formatters/capitalizeFirstLetter";
import { useFetchSettlement } from "@/utils/apiHooks/settlements/useFetchSettlement";
import { NetworkRequestContainer } from "../states/NetworkRequestContainer";
import { Divider } from "../Divider";

type SettlementDetailsPayload = {
    data: Settlement;
};

type SettlementDetailsProps = {};

export type SettlementDetailsRef = {
    open: (payload: SettlementDetailsPayload) => void;
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

export const SettlementDetails = forwardRef<
    SettlementDetailsRef,
    SettlementDetailsProps
>((_, ref) => {
    const [isVisible, setIsVisible] = useState(false);
    const [settlement, setSettlement] = useState<Settlement>();
    const { fetchSettlement, isLoading: isFetchSettlementLoading, error: fetchSettlementError, data: fetchedSettlements } = useFetchSettlement()

    useImperativeHandle(ref, () => ({
        open(payload: SettlementDetailsPayload) {
            setSettlement(payload.data);
            setIsVisible(true);
        },
        close() {
            closeModal();
        },
    }));

    function fetchData() {
        if (settlement) {
            fetchSettlement(settlement.id)
        }
    }

    useEffect(() => {
        if (fetchedSettlements) {
            setSettlement(fetchedSettlements)
        }
    }, [fetchedSettlements])

    useEffect(() => {
        fetchData()
    }, [isVisible])

    function closeModal() {
        setIsVisible(false);
    }

    function handlePrintReceipt() {

    }

    function handleGenerateReceipt() {

    }

    return (
        <Dialog open={isVisible} onOpenChange={setIsVisible}>
            {settlement && <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-scroll no-scrollbar">
                <DialogHeader>
                    <DialogTitle>Settlement Info</DialogTitle>
                    <DialogDescription>Full details summary</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <DetailItem data={{
                        title: "Merchant Name",
                        value: settlement.merchant_name
                    }} />
                    <DetailItem data={{
                        title: "Merchant Email",
                        value: settlement.merchant_email
                    }} />
                    <DetailItem data={{
                        title: "Settlement Account",
                        value: settlement.settlement_account
                    }} />
                    <DetailItem data={{
                        title: "Gross Amount",
                        value: formatAmount(settlement.gross_amount)
                    }} />
                    <DetailItem data={{
                        title: "Transaction Date",
                        value: formatDate(settlement.transaction_date)
                    }} />
                    <DetailItem data={{
                        title: "Processed Date",
                        value: formatDate(settlement.processed_date)
                    }} />
                    <DetailItem data={{
                        title: "Due Date",
                        value: formatDate(settlement.due_date)
                    }} />
                    <DetailItem data={{
                        title: "Currentcy",
                        value: (settlement.currency)
                    }} />
                    <DetailItem data={{
                        title: "Refund",
                        value: formatAmount(settlement.refund)
                    }} />
                </div>

                <NetworkRequestContainer isLoading={isFetchSettlementLoading} error={fetchSettlementError} onRetry={fetchData}>
                    <div className="flex flex-col">
                        <p className="font-semibold text-black">Transactions</p>

                        {(settlement.transactions ?? []).map((transaction) => {
                            return <div className="flex flex-col gap-4 mb-4">
                                <DetailItem data={{
                                    title: "Customer Email",
                                    value: transaction.customer_email
                                }} />
                                <DetailItem data={{
                                    title: "Charged amount",
                                    value: formatAmount(transaction.charged_amount)
                                }} />
                                <DetailItem data={{
                                    title: "Settlement amount",
                                    value: formatAmount(transaction.settlement_amount)
                                }} />
                                <DetailItem data={{
                                    title: "App fee",
                                    value: (transaction.app_fee)
                                }} />
                                <DetailItem data={{
                                    title: "Stamped Duty charge",
                                    value: formatAmount(transaction.stampduty_charge)
                                }} />
                                <DetailItem data={{
                                    title: "Transaction Date",
                                    value: transaction.transaction_date
                                }} />
                                <DetailItem data={{
                                    title: "Status",
                                    value: capitalizeFirstLetter(transaction.status)
                                }} />

                                <Divider />

                            </div>
                        })}
                    </div>
                </NetworkRequestContainer>



                <DialogFooter className="gap-4">
                    <Button onClick={closeModal} type="submit">Done</Button>
                </DialogFooter>
            </DialogContent>}
        </Dialog >
    );
});

SettlementDetails.displayName = "SettlementDetails"