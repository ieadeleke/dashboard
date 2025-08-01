import DashboardLayout from "@/components/layout/dashboard";
import { useEffect, useState } from "react";
import { NetworkRequestContainer } from "@/components/states/NetworkRequestContainer";
import { useFetchSettlementAccounts } from "@/utils/apiHooks/settlements/useFetchSettlementAccounts";
import { SettlementAccountTable } from "@/components/settlements/SettlementAccountTable";

import { Tabs } from 'antd';
import { useFetchCalculatedSettlementAccounts } from "@/utils/apiHooks/settlements/useFetchCalculatedSettlement";
import { CalculatedSettlementAccountTable } from "@/components/settlements/CalculatedSettlementTable";

export default function SettlementAccounts() {
    const {
        isLoading,
        data: settlementAccounts,
        error,
        fetchSettlementAccounts,
        count
    } = useFetchSettlementAccounts();
    const {
        isLoading: calculatedSettlementAccountsLoader,
        data: calculatedSettlementAccountsData,
        error: calculatedSettlementError,
        fetchCalculatedSettlementAccounts,
        count: calculatedSettlementCount
    } = useFetchCalculatedSettlementAccounts();
    const [page, setPage] = useState(0);
    const [calculatedDataDate, setCalculatedDataDate] = useState('');

    useEffect(() => {
        fetchData();
    }, [page]);
    useEffect(() => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const dateToUse = yesterday.toISOString().split('T')[0];
        setCalculatedDataDate(dateToUse);
        fetchCalculatedData(dateToUse);
    }, []);

    function fetchData() {
        fetchSettlementAccounts({
            page: page + 1
        })
    }

    function fetchCalculatedData(date: any) {
        fetchCalculatedSettlementAccounts({
            Date: date
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
                    <Tabs
                        defaultActiveKey="1" type="card">
                        <Tabs.TabPane key={1} tab="Settlement Accounts">
                            <NetworkRequestContainer isLoading={isLoading} error={error} onRetry={fetchData}>
                                {(!isLoading && !error) && <SettlementAccountTable
                                    name=""
                                    settlementAccounts={settlementAccounts}
                                    count={count} page={page} onPageChange={onPageChange}
                                    isLoading={isLoading}
                                    fetchData={fetchData}
                                />}
                            </NetworkRequestContainer>
                        </Tabs.TabPane>
                        <Tabs.TabPane key={2} tab="Calculated Settlement Accounts">
                            {(!isLoading && !error) && <CalculatedSettlementAccountTable
                                name=""
                                settlementAccounts={calculatedSettlementAccountsData}
                                count={count} page={page} dateToUse={calculatedDataDate}
                                isLoading={calculatedSettlementAccountsLoader}
                                fetchData={fetchCalculatedData}
                            />}
                        </Tabs.TabPane>
                    </Tabs>
                    {/* <div className="flex flex-col gap-4">
                        <h1 className="font-medium text-2xl">Settlement Accounts</h1>
                    </div> */}
                </div>
            </div>
        </DashboardLayout>
    );
}
