import Button from "@/components/buttons";
import { TextField } from "@/components/input/InputText";
import DashboardLayout from "@/components/layout/dashboard";
import { TransactionDetails, TransactionDetailsRef } from "@/components/transactions/TransactionDetails";
import { TransactionTable } from "@/components/transactions/TransactionTable";
import { useFetchTransactionsByReference } from "@/utils/apiHooks/transactions/useFetchTransactionsByReference";
import { useRef, useState } from "react";

export default function WebTransactions() {
    const { isLoading, error, data, fetchTransactionsByReference } = useFetchTransactionsByReference()
    const [paymentRef, setPaymentRef] = useState("")
    const transactionDetailsRef = useRef<TransactionDetailsRef>(null)

    function submit() {
        if (paymentRef.trim().length > 0) {
            fetchTransactionsByReference({
                reference: paymentRef.trim()
            })
        }
    }

    return <DashboardLayout>
        <div className="flex flex-col min-h-screen px-2">
            <TransactionDetails ref={transactionDetailsRef} />
            <div className="flex flex-col w-96 gap-8 self-center mt-8">
                <TextField.Container className="bg-gray-200">
                    <TextField.Input value={paymentRef} defaultValue={paymentRef} onChange={(evt) => setPaymentRef(evt.target.value)} placeholder="Enter Payment Reference" />
                </TextField.Container>

                <Button variant="outlined" onClick={submit} isLoading={isLoading} disabled={isLoading}>Get Transactions</Button>
            </div>

            <TransactionTable isLoading={isLoading} error={error} fetchData={submit} transactions={data} name="All Transactions" />
        </div>
    </DashboardLayout>
}