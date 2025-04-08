import DashboardLayout from "@/components/layout/dashboard";
import { useEffect, useState } from "react";
import { NetworkRequestContainer } from "@/components/states/NetworkRequestContainer";
import { useFetchSettlementAccounts } from "@/utils/apiHooks/settlements/useFetchSettlementAccounts";
import { SettlementAccountTable } from "@/components/settlements/SettlementAccountTable";

export default function SettlementAccounts() {
    const {
        isLoading,
        data: settlementAccounts,
        error,
        fetchSettlementAccounts,
        count
    } = useFetchSettlementAccounts();
    const [page, setPage] = useState(0)

    useEffect(() => {
        fetchData()
    }, [page]);


    function fetchData() {
        fetchSettlementAccounts({
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
                        <h1 className="font-medium text-2xl">Settlement Accounts</h1>
                    </div>
                    <NetworkRequestContainer isLoading={isLoading} error={error} onRetry={fetchData}>
                        {(!isLoading && !error) && <SettlementAccountTable
                            name=""
                            settlementAccounts={settlementAccounts}
                            count={count} page={page} onPageChange={onPageChange}
                            isLoading={isLoading}
                            fetchData={fetchData}
                        />}
                    </NetworkRequestContainer>
                </div>
            </div>
        </DashboardLayout>
    );
}
