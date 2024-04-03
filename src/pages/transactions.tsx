import DashboardLayout from "@/components/layout/dashboard";
import { useFetchTranscations } from "@/utils/apiHooks/transactions/useFetchTransactions";
import { ChangeEvent, useEffect, useState } from "react";
import { TransactionTable } from "@/components/transactions/TransactionTable";
import { DateRange } from "@/components/calendar/CalendarRange";
import moment from "moment";
import { convertDateToFormat, getDefaultDateAsString } from "@/utils/data/getDefaultDate";
import { TextField } from "@/components/input/InputText";
import Button from "@/components/buttons";
import { useFetchTransactionsByReference } from "@/utils/apiHooks/transactions/useFetchTransactionsByReference";
import { NetworkRequestContainer } from "@/components/states/NetworkRequestContainer";

export default function Transactionss() {
    const [searchWord, setSearchWord] = useState('')
    const {
        isLoading,
        data: transactions,
        error,
        fetchTransactionsByReference,
    } = useFetchTransactionsByReference();
    const [date, setDate] = useState(getDefaultDateAsString())

    useEffect(() => {
        fetchData()
    }, [date]);

    function onDateApplied(date: DateRange) {
        setDate({
            startDate: convertDateToFormat(date.from),
            endDate: convertDateToFormat(date.to ?? new Date()),
        });
    }

    function fetchData() {
        if (searchWord.trim().length > 0) {
            fetchTransactionsByReference({
                reference: searchWord,
                ...date
            })
        }
    }

    function onSubmit(event: ChangeEvent<HTMLFormElement>) {
        event.preventDefault()
        fetchData()
    }

    return (
        <DashboardLayout>
            <div className="flex flex-col px-4 py-8 gap-8">
                <div className="flex flex-col">
                    <div className="flex flex-col gap-4">
                        <h1 className="font-medium text-2xl">All Transactions</h1>
                    </div>

                    <form onSubmit={onSubmit} className="flex items-center gap-10 my-10">
                        <TextField.Container className="bg-gray-200 flex-1">
                            <TextField.Input  value={searchWord} onChange={(evt) => setSearchWord(evt.target.value)} placeholder="Search for references" />
                        </TextField.Container>

                        <Button isLoading={isLoading} disabled={isLoading} onClick={fetchData} className="px-12">
                            Search
                        </Button>
                    </form>
                    <NetworkRequestContainer isLoading={isLoading} error={error} onRetry={fetchData}>
                        {(!isLoading && !error) && <TransactionTable
                            name="Recent Transactions"
                            transactions={transactions}
                            isLoading={isLoading}
                            fetchData={fetchData}
                            dateRange={date}
                            onDateApplied={onDateApplied}
                        />}
                    </NetworkRequestContainer>
                </div>
            </div>
        </DashboardLayout>
    );
}
