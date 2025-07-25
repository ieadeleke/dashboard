import Button from "@/components/buttons";
import { TextField } from "@/components/input/InputText";
import DashboardLayout from "@/components/layout/dashboard";
import { TransactionDetails, TransactionDetailsRef } from "@/components/transactions/TransactionDetails";
import { TransactionTable } from "@/components/transactions/TransactionTable";
import { useFetchTransactionsByPaymentReference } from "@/utils/apiHooks/transactions/useFetchTransactionsByPaymentRef";
import { useFetchTransactionsByReference } from "@/utils/apiHooks/transactions/useFetchTransactionsByReference";
import React, { useEffect, useRef, useState } from "react";

export default function WebTransactions() {
    const { isLoading, error, data, count, fetchTransactionsByReference } = useFetchTransactionsByReference();
    const { isLoading: loadingRefData, error: paymentRefError, data: paymentRefData, count: paymentRefCount, fetchTransactionsByPaymentReference } = useFetchTransactionsByPaymentReference();

    const [paymentRef, setPaymentRef] = useState("");
    const [dataToShow, setDataToShow] = useState<any>([]);
    const [dataToShowCount, setDataToShowCount] = useState<any>(0);
    const [dataToShowError, setDataToShowError] = useState<any>('');
    const [isLoadingData, setIsLoadingData] = useState<any>(false);

    const [page, setPage] = useState(1)
    const transactionDetailsRef = useRef<TransactionDetailsRef>(null)

    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        let ref = paymentRef;
        if (paymentRef.trim().length > 0) {
            if (!isNaN(+ref.split('-')[0])) {
                fetchTransactionsByReference({
                    reference: paymentRef.trim()
                })
            } else {
                fetchTransactionsByPaymentReference({
                    paymentRef: paymentRef.trim()
                })
            }
            setIsLoadingData(true);
        }
    }
    function submitForm() {
        let ref = paymentRef;
        if (paymentRef.trim().length > 0) {
            if (!isNaN(+ref.split('-')[0])) {
                fetchTransactionsByReference({
                    reference: paymentRef.trim()
                })
            } else {
                fetchTransactionsByPaymentReference({
                    paymentRef: paymentRef.trim()
                })
            }
            setIsLoadingData(true);
        }
    }

    useEffect(() => {
        setIsLoadingData(false);
        setDataToShowError('');
        if (data.found) {
            setDataToShowCount(count);
            return setDataToShow(data.data);
        };
    }, [data])
    useEffect(() => {
        setIsLoadingData(false);
        setDataToShowError('');
        if (paymentRefData.found) {
            setDataToShowCount(paymentRefCount);
            return setDataToShow([paymentRefData.data]);
        };
    }, [paymentRefData])
    useEffect(() => {
        setIsLoadingData(false);
        setDataToShowCount(0);
        setDataToShow([]);
        if (error) {
            return setDataToShowError(error);
        };
        if (paymentRefError) {
            return setDataToShowError(paymentRefError)
        };
    }, [paymentRefError, error])

    function onPageChange(selectedItem: {
        selected: number;
    }) {
        setPage(selectedItem.selected)
    }

    return <DashboardLayout>
        <div className="flex flex-col min-h-screen px-2">
            <TransactionDetails ref={transactionDetailsRef} />
            <div className="flex flex-col w-96 gap-8 self-center mt-8 mb-5">
                <form action="" onSubmit={submit} className="mb-5">
                    <TextField.Container className="bg-gray-200 mb-5">
                        <TextField.Input value={paymentRef} defaultValue={paymentRef} onChange={(evt) => setPaymentRef(evt.target.value)} placeholder="Enter Payment Reference" />
                    </TextField.Container>
                    <Button variant="outlined" className="px-8 text-sm w-max mx-auto block" isLoading={isLoadingData} disabled={isLoadingData}>Get Transactions</Button>
                </form>
            </div>

            <TransactionTable count={dataToShowCount} page={page} onPageChange={onPageChange} isLoading={isLoadingData} error={dataToShowError} fetchData={submitForm} transactions={dataToShow} name="All Transactions" />
        </div>
    </DashboardLayout>
}