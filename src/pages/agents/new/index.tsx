'use client';

import DashboardLayout from "@/components/layout/dashboard";
import { MDATableList } from "@/components/mdas/MDATable";
import { TransactionTable } from "@/components/transactions/TransactionTable";
import { useGetMDAs } from "@/utils/apiHooks/mda/useGetMDAs";
import { GetAllMDAsResponse } from "@/utils/services/mda/types";
import { useContext, useEffect, useState } from "react";
import { Modal, Tabs, Checkbox, Select } from "antd";
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
import { useAddAgents } from "@/utils/apiHooks/agents/useAddAgent";
import { BaseSelect } from "@/components/select/BaseSelect";

interface SelectedMDAInterface {
    _id: string;
    name: string;
    email: string;
    isActive: boolean;
    createdAt: string;
    liveKey: string;
    testKey: string;
    mdaConsultant: any[]
}
interface NewAgentInterface {
    firstName: string;
    email: string;
    lastName: string;
    userName: string;
    phoneNumber: string;
    profileType: "normalAgent" | "superAgent"
}

export default function Agents() {
    const { } = useGetMDAs();

    const { addnewAgent, isLoading, error, data } = useAddAgents();
    const { showSnackBar } = useContext(GlobalActionContext);

    const [newUserData, setNewUserData] = useState<NewAgentInterface>({
        firstName: "",
        email: "",
        lastName: "",
        userName: "",
        phoneNumber: "",
        profileType: "normalAgent"
    });

    useEffect(() => {
        if (data) {
            showSnackBar({
                severity: "success",
                message: "Agent added successfully",
            });
            window.location.reload();
        }
    }, [data]);

    useEffect(() => {
        if (error) {
            showSnackBar({
                severity: "error",
                message: error,
            });
        }
    }, [error]);

    const uploadNewAgentData = () => {
        let { firstName, lastName, email, userName, phoneNumber, profileType } = newUserData;
        if (firstName.length && lastName.length && email.length && userName.length && phoneNumber.length && profileType.length) {
            addnewAgent(newUserData);
        } else {
            showSnackBar({
                severity: "error",
                message: "Please fill all fields",
            });
        }
    }

    const updateAgentFormField = (e: any) => {
        setNewUserData({
            ...newUserData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <DashboardLayout>
            <>
                <div className="flex flex-col px-4 py-8 gap-8">
                    <div>
                        <div className="flex flex-col justify-center gap-5">
                            <div className="w-full md:w-[50%] mx-auto bg-white p-10 md-px-10 rounded-[16px]">
                                <div className="mb-10 text-center">
                                    <h3 className="font-bold text-xl">Add New Agent</h3>
                                </div>
                                <div className="grid grid-cols-2 mb-5 gap-2">
                                    <div>
                                        <h4 className="text-sm">First name</h4>
                                        <RegularTextInput onChange={updateAgentFormField} value={newUserData.firstName} name="firstName" className="text-xs py-7" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm">Last name</h4>
                                        <RegularTextInput onChange={updateAgentFormField} value={newUserData.lastName} name="lastName" className="text-xs py-7" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="mb-5">
                                        <h4 className="text-sm">Email</h4>
                                        <RegularTextInput onChange={updateAgentFormField} value={newUserData.email} name="email" className="text-xs py-7" />
                                    </div>
                                    <div className="mb-5">
                                        <h4 className="text-sm">Phone number</h4>
                                        <RegularTextInput onChange={updateAgentFormField} value={newUserData.phoneNumber} name="phoneNumber" className="text-xs py-7" />
                                    </div>
                                </div>
                                <div className="mb-5">
                                    <h4 className="text-sm">Username</h4>
                                    <RegularTextInput onChange={updateAgentFormField} value={newUserData.userName} name="userName" className="text-xs py-7" />
                                </div>
                                <div className="mb-5">
                                    <h4 className="text-sm">Agent Type</h4>
                                    <Select className="text-xs block w-full h-[3.7rem]" value={newUserData.profileType} onChange={e => {
                                        setNewUserData({
                                            ...newUserData,
                                            profileType: e
                                        })
                                    }}>
                                        <Select.Option key={"normalAgent"}>Normal Agent</Select.Option>
                                        <Select.Option key={"superAgent"}>Super Agent</Select.Option>
                                    </Select>
                                </div>
                                <div className="mt-10">
                                    <Button className="px-5 h-[4rem] w-full" onClick={uploadNewAgentData}
                                        isLoading={isLoading}>Add New Agent</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </DashboardLayout>
    );
}