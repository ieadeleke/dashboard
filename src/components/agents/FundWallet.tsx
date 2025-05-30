import { useEffect, useState } from "react";
import { RegularTextInput } from "../input/RegularTextInput";
import { formatDate } from "@/utils/formatters/formatDate";

interface WalletInterface {
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
}

const FundAgentWallet = (props: { agent: SelectedAgentInterface }) => {
    const [selectedAgent, setSelectedAgent] = useState<SelectedAgentInterface>({
        _id: "",
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        createdAt: "",
        isActive: true
    });
    useEffect(() => {
        setSelectedAgent(props.agent);
    }, [props.agent]);
    return (
        <div>
            <div className="grid grid-cols-2 gap-5">
                <div>
                    <p className="text-md">Amount:</p>
                    <RegularTextInput type="text" disabled className="text-xs"
                        value={selectedAgent.firstName} />
                </div>
                <div>
                    <p className="text-md">Last name:</p>
                    <RegularTextInput type="text" disabled className="text-xs"
                        value={selectedAgent.lastName} />
                </div>
                <div>
                    <p className="text-md">Email Address:</p>
                    <RegularTextInput type="text" disabled className="text-xs"
                        value={selectedAgent.email} />
                </div>
            </div>
        </div>
    )
}

export default FundAgentWallet;