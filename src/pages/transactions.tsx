import DashboardLayout from "@/components/layout/dashboard";
import { useFetchTranscations } from "@/utils/apiHooks/transactions/useFetchTransactions";
import { ChangeEvent, useEffect, useState } from "react";
import { TransactionTable } from "@/components/transactions/TransactionTable";
import { DateRange } from "@/components/calendar/CalendarRange";
import { convertDateToFormat, getDefaultDateAsString } from "@/utils/data/getDefaultDate";
import { NetworkRequestContainer } from "@/components/states/NetworkRequestContainer";

export default function Transactionss() {
    const {
        isLoading,
        data: transactions,
        error,
        fetchTransactions,
        count
    } = useFetchTranscations();
    const [date, setDate] = useState(getDefaultDateAsString())
    const [page, setPage] = useState(0)

    useEffect(() => {
        fetchData()
    }, [date, page]);

    function onDateApplied(date: DateRange) {
        setDate({
            startDate: convertDateToFormat(date.from),
            endDate: convertDateToFormat(date.to ?? new Date()),
        });
    }

    function fetchData() {
        fetchTransactions({
            ...date,
            page: page +1
        })
    }


    function onPageChange(selectedItem: {
        selected: number;
    }) {
        setPage(selectedItem.selected)
    }


    return (
        <DashboardLayout>
            <div className="flex flex-col px-4 py-8 gap-8">
                <div className="flex flex-col">
                    <div className="flex flex-col gap-4">
                        <h1 className="font-medium text-2xl">All Transactions</h1>
                    </div>

                    <NetworkRequestContainer isLoading={isLoading} error={error} onRetry={fetchData}>
                        {(!isLoading && !error) && <TransactionTable
                            name=""
                            transactions={transactions}
                            count={count} page={page} onPageChange={onPageChange}
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
