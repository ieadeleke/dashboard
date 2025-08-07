import Button from "@/components/buttons";
import { TextField } from "@/components/input/InputText";
import DashboardLayout from "@/components/layout/dashboard";
import { TransactionDetails, TransactionDetailsRef } from "@/components/transactions/TransactionDetails";
import { TransactionTable } from "@/components/transactions/TransactionTable";
import { GlobalActionContext } from "@/context/GlobalActionContext";
import { useReprocessPayment } from "@/utils/apiHooks/agents/useReprocessPayment";
import { useReversePayment } from "@/utils/apiHooks/agents/useReversePayment";
import { useFetchTransactionsByPaymentReference } from "@/utils/apiHooks/transactions/useFetchTransactionsByPaymentRef";
import { useFetchTransactionsByReference } from "@/utils/apiHooks/transactions/useFetchTransactionsByReference";
import React, { useContext, useEffect, useRef, useState } from "react";

export default function WebTransactions() {
    const { isLoading, error, data, count, fetchTransactionsByReference } = useFetchTransactionsByReference();
    const { isLoading: loadingRefData, error: paymentRefError, data: paymentRefData, count: paymentRefCount, fetchTransactionsByPaymentReference } = useFetchTransactionsByPaymentReference();

    const { isLoading: loadingReversePaymentError, error: reversePaymentError, data: reversePaymentData, reReversePayment } = useReversePayment();
    const { isLoading: loadingReprocess, error: reprocessPaymentError, data: reprocessPaymentData, reProcessPayment } = useReprocessPayment();

    const [paymentRef, setPaymentRef] = useState("");
    const [dataToShow, setDataToShow] = useState<any>([]);
    const [dataToShowCount, setDataToShowCount] = useState<any>(0);
    const [dataToShowError, setDataToShowError] = useState<any>('');
    const [isLoadingData, setIsLoadingData] = useState<any>(false);

    const [page, setPage] = useState(1)
    const transactionDetailsRef = useRef<TransactionDetailsRef>(null);
    const [currentSelectedTransaction, setCurrentSelectedTransaction] = useState<any>({});


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

    const { showSnackBar } = useContext(GlobalActionContext)


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

    useEffect(() => {
        if (reversePaymentData?.Wallet) {
            showSnackBar({
                severity: 'success',
                message: "Payment reversed successfully"
            })
            window.location.reload();
        }
    }, [reversePaymentData]);
    useEffect(() => {
        if (reprocessPaymentData?.data) {
            showSnackBar({
                severity: 'success',
                message: "Payment reprocessed successfully"
            })
            window.location.reload();
        }
    }, [reprocessPaymentData]);

    useEffect(() => {
        if (reprocessPaymentError) {
            showSnackBar({
                severity: 'error',
                message: reprocessPaymentError
            })
        }
    }, [reprocessPaymentError])

    useEffect(() => {
        if (reversePaymentError) {
            showSnackBar({
                severity: 'error',
                message: reversePaymentError
            })
        }
    }, [reversePaymentError])

    const handleReversePayment = () => {
        reReversePayment({
            paymentRef: currentSelectedTransaction?.paymentRef
        });
    }

    const handleReprocessPayment = () => {
        reProcessPayment({
            paymentRef: currentSelectedTransaction?.paymentRef
        });
    }

    return <DashboardLayout>
        <div className="flex flex-col min-h-screen px-2">
            <TransactionDetails ref={transactionDetailsRef} reprocessPayment={handleReprocessPayment} reversePayment={handleReversePayment} />
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