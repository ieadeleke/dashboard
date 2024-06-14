import DashboardLayout from "@/components/layout/dashboard";
import { useEffect, useState } from "react";
import { DateRange } from "@/components/calendar/CalendarRange";
import { convertDateToFormat, getDefaultDateAsString } from "@/utils/data/getDefaultDate";
import { NetworkRequestContainer } from "@/components/states/NetworkRequestContainer";
import { useFetchAccountSettlements } from "@/utils/apiHooks/settlements/useFetchAllSettlements";
import { useRouter } from "next/router";
import { SettlementTable } from "@/components/settlements/SettlementTable";

export default function Settlements() {
    const {
        isLoading,
        data: settlements,
        error,
        fetchAccountSettlements,
        count
    } = useFetchAccountSettlements();
    const router = useRouter()
    const [date, setDate] = useState(getDefaultDateAsString())
    const [page, setPage] = useState(0)

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
        fetchAccountSettlements({
            from: date.startDate,
            to: date.endDate,
            account_number: router.query.id as string,
            page: page + 1
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
                        <h1 className="font-medium text-2xl">All Settlements</h1>
                    </div>

                    <NetworkRequestContainer isLoading={isLoading} error={error} onRetry={fetchData}>
                        {(!isLoading && !error) && <SettlementTable
                            name=""
                            settlements={settlements}
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
