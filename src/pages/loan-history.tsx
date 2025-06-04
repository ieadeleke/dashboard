'use client';

import DashboardLayout from "@/components/layout/dashboard";
import { MDATableList } from "@/components/mdas/MDATable";
import { TransactionTable } from "@/components/transactions/TransactionTable";
import { useGetMDAs } from "@/utils/apiHooks/mda/useGetMDAs";
import { GetAllMDAsResponse } from "@/utils/services/mda/types";
import { useContext, useEffect, useState } from "react";
import { Modal, Tabs, Checkbox, Divider, Select } from "antd";
import { RegularTextInput } from "@/components/input/RegularTextInput";
import { formatDate } from "@/utils/formatters/formatDate";
import { MDAConsultantTableList } from "@/components/mdas/ConsultantTable";
import Button from "@/components/buttons";
import { GlobalActionContext } from "@/context/GlobalActionContext";
import { useApproveMDA } from "@/utils/apiHooks/mda/useApproveConsultant";
import { useDisableMDASplitting } from "@/utils/apiHooks/mda/useDisableMDASplitting";
import { useAllowMDASplitting } from "@/utils/apiHooks/mda/useAllowMDASplitting";
import { useGetAgents } from "@/utils/apiHooks/agents/useGetAgents";
import { AgentTableList } from "@/components/agents/AgentTable";
import { useSuspendAgents } from "@/utils/apiHooks/agents/useSuspendAgent";
import { useUnSuspendAgents } from "@/utils/apiHooks/agents/useUnSuspendAgent";
import { useFreezeAgent } from "@/utils/apiHooks/agents/useFreezeAgent";
import { useUnfreezeAgent } from "@/utils/apiHooks/agents/useUnfreezeAgent";
import { useUpgradeWallet } from "@/utils/apiHooks/agents/useUpgradeWallet";
import ViewAgentData from "@/components/agents/ViewAgent";
import { AgentWalletTransactionList } from "@/components/agents/AgentWalletTransactions";
import { FundAgentWallet } from "@/components/agents/FundAgentWallet";
import { AgentTotalTransactionList } from "@/components/agents/AgentTransactions";
import { AgentLoanHistoryTable } from "@/components/agents/AgentLoanHistory";
import { useGetAgentsLoanHistory } from "@/utils/apiHooks/agents/useGetLoanHistory";

interface WalletInterface {
    _id?: string;
    accountName: string;
    accountNumber: string;
    bankName: string;
    phoneNumber: string;
    email: string;
    tier: string;
    type: string;
    maxBalance: number;
    dailyTransactionLimit: number;
}

interface SelectedAgentInterface {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    wallet?: WalletInterface;
    createdAt: string;
    isActive: boolean;
    ConsultantCompany: string
}
interface selectedAgentConsultantInterface {
    _id: string
    DoNotChargeUserForTransactionFee: boolean;
    MDA: string;
    RevenueCode: string;
    RevenueName: string;
    SplittingPercentageForConsultant: string;
    allowPartialPayment: boolean;
    approve: boolean;
    chargeUserForAllTransactionFee: boolean;
    chargeUserForOnlySystemTransactionFee: boolean;
    createdAt: string;
    email: string;
    maxServiceCharge: number;
    maxServiceChargeStatus: boolean;
    minServiceCharge: number;
    name: string;
    settlementAccountCBNCode: string;
    settlementAccountName: string;
    settlementAccountNumber: string;
    settlementBankName: string;
    takeServiceChargeFromGovtCut: boolean
}

export default function AgentLoanHistory() {
    const { } = useGetMDAs();

    const [mdaList, setMDAList] = useState<any>([]);
    const { getAgentList, isLoading, error, data } = useGetAgentsLoanHistory();
    const { suspendAgent, isLoading: loadingSuspendAgent, error: suspendAgentError, data: suspendAgentData } = useSuspendAgents();
    const { unSuspendAgent, isLoading: loadingUnSuspendAgent, error: unSuspendAgentError, data: unSuspendAgentData } = useUnSuspendAgents();

    const { freezeAgent, isLoading: loadingfreezeAgentData, error: freezeAgentError, data: freezeAgentData } = useFreezeAgent();
    const { UnfreezeAgent, isLoading: loadingUnFreezeAgentData, error: unFreezeAgentError, data: unFreezeAgentData } = useUnfreezeAgent();

    const { upgradeWallet, isLoading: loadingUpgradeAgentData, error: upgradeAgentError, data: upgradeAgentWalletData } = useUpgradeWallet();


    const { approveConsultant, isLoading: isLoadingConsultant, error: errorConsultant, data: dataConsultant } = useApproveMDA();
    const [page, setPage] = useState(1);
    const [count, setCount] = useState<number>(0);
    const [openDisplayModal, setOpenDisplayModal] = useState<boolean>(false);
    const [statusFilter, setStatusFilter] = useState<string>('');
    const { showSnackBar } = useContext(GlobalActionContext);

    function fetchData() {
        getAgentList({
            status: statusFilter,
            page
        });
    }

    useEffect(() => {
        if (data) {
            setCount(data.count);
            setMDAList(data.data);
        }
    }, [data])

    useEffect(() => {
        if (errorConsultant) {
            showSnackBar({
                severity: "error",
                message: errorConsultant,
            });
        }
    }, [errorConsultant])

    useEffect(() => {
        fetchData();
    }, [statusFilter])

    return (
        <DashboardLayout>
            <>
                <div className="flex flex-col px-4 py-8 gap-8">
                    <div>
                        <AgentLoanHistoryTable name="Agent Loan History" mdaList={mdaList} isLoading={isLoading} error={error} page={page} count={count} />
                    </div>
                </div>
            </>
        </DashboardLayout>
    );
}