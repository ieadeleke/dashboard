import Button from "@/components/buttons";
import { TextField } from "@/components/input/InputText";
import DashboardLayout from "@/components/layout/dashboard";
import { TransactionDetails, TransactionDetailsRef } from "@/components/transactions/TransactionDetails";
import { GlobalActionContext } from "@/context/GlobalActionContext";
import { useFetchTranscationByPaymentRef } from "@/utils/apiHooks/transactions/useFetchTransactionByPaymentRef";
import { useContext, useEffect, useRef, useState } from "react";

export default function WebTransactions() {
    const { isLoading, error, data, fetchTransactionByPaymentRef } = useFetchTranscationByPaymentRef()
    const [paymentRef, setPaymentRef] = useState("")
    const { showSnackBar } = useContext(GlobalActionContext)
    const transactionDetailsRef = useRef<TransactionDetailsRef>(null)

    function submit() {
        if (paymentRef.trim().length > 0) {
            fetchTransactionByPaymentRef({
                paymentRef: paymentRef.trim()
            })
        }
    }

    useEffect(() => {
        if (error) {
            showSnackBar({ severity: "error", message: error })
        }
    }, [error])

    useEffect(() => {
        if(data){
            transactionDetailsRef.current?.open({
                data
            })
        }
    }, [data])

    return <DashboardLayout>
        <div className="flex flex-col mt-8 min-h-screen">
            <TransactionDetails ref={transactionDetailsRef} />
            <div className="flex flex-col w-96 gap-8 self-center mt-32">
                <TextField.Container className="bg-gray-200">
                    <TextField.Input value={paymentRef} defaultValue={paymentRef} onChange={(evt) => setPaymentRef(evt.target.value)} placeholder="Enter Payment Reference" />
                </TextField.Container>

                <Button onClick={submit} isLoading={isLoading} disabled={isLoading}>Get Transaction</Button>
            </div>
        </div>
    </DashboardLayout>
}