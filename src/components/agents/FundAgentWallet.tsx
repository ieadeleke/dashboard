import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import moment from "moment";
import Loading from "../states/Loading";
import Error from "../states/Error";
import { LoadingModal } from "../states/LoadingModal";
import { GlobalActionContext } from "@/context/GlobalActionContext";
import Button from "../buttons";
import { formatAmount } from "@/utils/formatters/formatAmount";
import { formatDate } from "@/utils/formatters/formatDate";
import { TablePagination } from "../pagination/TablePagination";
import { AllMDAsType } from "@/models/mdas";
import Link from "next/link";
import { AllAgentType } from "@/models/agents";
import { useSuspendAgents } from "@/utils/apiHooks/agents/useSuspendAgent";
import { useFetchAgentWalletTrans } from "@/utils/apiHooks/agents/useFetchAgentWalletTrans";
import { TransactionStatus, TransactionStatusChip } from "../transactions/TransactionStatusChip";
import { Input, Spin } from "antd";
import { useFundWallet } from "@/utils/apiHooks/agents/useFundWallet";
import { RegularTextInput } from "../input/RegularTextInput";


type AgentTableProps = {
    accNumber?: string
};

type AgentTransactionTableProps = {
    createdAt: string;
    amount: string;
    category: string;
    type: string;
    status: string;
    balance_after: string;
    balance_before: string;
    total: string;
}[]

type AgentDataProps = {
    amount: number,
    accountNumber: string,
    description: string,
    vat: number,
    fee: number
}

export const FundAgentWallet = ({ accNumber }: AgentTableProps) => {
    const { fundWallet, isLoading, error, data } = useFundWallet();
    const [isDateModalOpen, setIsDateModalOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [agentData, setAgentData] = useState<AgentDataProps>({
        amount: 0,
        accountNumber: "",
        description: "",
        vat: 0,
        fee: 0
    });
    const [count, setCount] = useState<number>(0);
    const [transData, setTransData] = useState<AgentTransactionTableProps>([{
        createdAt: "",
        amount: "",
        category: "",
        type: "",
        status: "",
        balance_after: "",
        balance_before: "",
        total: "",
    }]);

    const { showSnackBar } = useContext(GlobalActionContext);

    useEffect(() => {
        if (accNumber) setAgentData({
            ...agentData,
            accountNumber: accNumber
        })
    }, [accNumber]);

    useEffect(() => {
        if (error) {
            showSnackBar({
                severity: "error",
                message: error,
            });
        }
    }, [error])

    useEffect(() => {
        if (data) {
            showSnackBar({
                severity: "success",
                message: data.message
            });
            window.location.reload();
        }
    }, [data])

    const completeFundAgentWallet = (e: any) => {
        e.preventDefault();
        if (agentData.accountNumber && agentData.amount) {
            fundWallet(agentData);
        } else {
            showSnackBar({
                severity: "error",
                message: "Please enter amount",
            });
        }
    }

    function onPageChange(selectedItem: {
        selected: number;
    }) {
        setPage(selectedItem.selected)
    }

    const updateAgentFormField = (e: any) => {
        setAgentData({
            ...agentData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                {/* <h1 className="font-medium text-xl">{props.name}</h1> */}
            </div>
            <>
                <div className="w-[70%] mx-auto">
                    <form action="" onSubmit={completeFundAgentWallet}>
                        <div className="form-group mb-5">
                            <label htmlFor="">Amount</label>
                            <Input onChange={updateAgentFormField} value={agentData.amount} name="amount" className="text-xs py-7" />
                        </div>
                        <div className="form-group mb-5">
                            <label htmlFor="">Description</label>
                            <Input.TextArea rows={5} onChange={updateAgentFormField} value={agentData.description} name="description" className="text-xs" />
                        </div>
                        <div className="mt-10 mb-10">
                            <Button className="px-5 text-sm h-[4rem] w-full"
                                isLoading={isLoading}>Fund Agent</Button>
                        </div>
                    </form>
                </div>
            </>
        </div>
    );
};


function capitalizeFirstLetter(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1);
}