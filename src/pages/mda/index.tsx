'use client';

import DashboardLayout from "@/components/layout/dashboard";
import { MDATableList } from "@/components/mdas/MDATable";
import { TransactionTable } from "@/components/transactions/TransactionTable";
import { useGetMDAs } from "@/utils/apiHooks/mda/useGetMDAs";
import { GetAllMDAsResponse } from "@/utils/services/mda/types";
import { useContext, useEffect, useState } from "react";
import { Modal, Tabs, Checkbox } from "antd";
import { RegularTextInput } from "@/components/input/RegularTextInput";
import { formatDate } from "@/utils/formatters/formatDate";
import { MDAConsultantTableList } from "@/components/mdas/ConsultantTable";
import Button from "@/components/buttons";
import { GlobalActionContext } from "@/context/GlobalActionContext";
import { useApproveMDA } from "@/utils/apiHooks/mda/useApproveConsultant";
import { useDisableMDASplitting } from "@/utils/apiHooks/mda/useDisableMDASplitting";
import { useAllowMDASplitting } from "@/utils/apiHooks/mda/useAllowMDASplitting";
import { useApproveMDAInternalBill } from "@/utils/apiHooks/mda/useApproveInternalBill";
import { useDisableMDAInternalBill } from "@/utils/apiHooks/mda/useDisableMDAInternalBill";
import { TextField } from "@/components/input/InputText";
import { useSearchMDA } from "@/utils/apiHooks/mda/useSearchMDA";


interface SelectedMDAInterface {
    allowInternalBilling?: boolean;
    _id: string;
    name: string;
    email: string;
    isActive: boolean;
    createdAt: string;
    liveKey: string;
    testKey: string;
    mdaConsultant: any[]
}
interface SelectedMDAConsultantInterface {
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

export default function Agents() {
    const { } = useGetMDAs();

    const [mdaList, setMDAList] = useState<any>([]);
    const { getMDAList, isLoading, error, data } = useGetMDAs();
    const { searchMDA, isLoading: loadingSearchMDA, error: searchMDAError, data: searchMDAData } = useSearchMDA();


    const { approveConsultant, isLoading: isLoadingConsultant, error: errorConsultant, data: dataConsultant } = useApproveMDA();
    const { approveMDAInternalBill, isLoading: isLoadingInternalBill, error: internalBillError, data: internalBillData } = useApproveMDAInternalBill();
    const { disableMDAInternalBill, isLoading: isLoadingDisableInternalBill, error: disableInternalBillError, data: disableInternalBillData } = useDisableMDAInternalBill();
    const { disableSpliting, isLoading: loadingDisableSpliting, error: errorDisableSpliting, data: dataDisableSpliting } = useDisableMDASplitting();
    const { allowSplitting, isLoading: isLoadingSplitting, error: errorSplitting, data: dataSplitting } = useAllowMDASplitting();

    const [searchingUser, setSearchingUser] = useState(false);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState<number>(0);
    const [openDisplayModal, setOpenDisplayModal] = useState<boolean>(false);
    const [displayConsultantViewMode, setDisplayConsultantViewMode] = useState<boolean>(false);
    const { showSnackBar } = useContext(GlobalActionContext);
    const [agentSearchValue, setAgentSearchValue] = useState<string>('');
    const [loadSearchButton, setLoadSearchButton] = useState(false);



    const [selectedMDA, setSelectedMDA] = useState<SelectedMDAInterface>({
        allowInternalBilling: false,
        _id: "",
        name: "",
        email: "",
        isActive: true,
        createdAt: "",
        liveKey: "",
        testKey: "",
        mdaConsultant: []
    });
    const [selectedMDAConsultant, setSelectedMDAConsultant] = useState<SelectedMDAConsultantInterface>({
        _id: "",
        DoNotChargeUserForTransactionFee: false,
        MDA: "",
        RevenueCode: "",
        RevenueName: "",
        SplittingPercentageForConsultant: "",
        allowPartialPayment: false,
        approve: false,
        chargeUserForAllTransactionFee: true,
        chargeUserForOnlySystemTransactionFee: false,
        createdAt: "",
        email: "",
        maxServiceCharge: 0,
        maxServiceChargeStatus: true,
        minServiceCharge: 0,
        name: "",
        settlementAccountCBNCode: "",
        settlementAccountName: "",
        settlementAccountNumber: "",
        settlementBankName: "",
        takeServiceChargeFromGovtCut: true
    });

    function handleUserDataSearch(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoadSearchButton(true);
        if (agentSearchValue.length) {
            searchMDA({
                keywords: agentSearchValue
            });
        } else {
            fetchData();
        }
    }

    function fetchData() {
        getMDAList({
            page
        });
    }

    useEffect(() => {
        if (data) {
            setSearchingUser(false);
            setMDAList(data.MDAs);
            setLoadSearchButton(false);
        }
    }, [data])

    useEffect(() => {
        if (error) {
            setLoadSearchButton(false);
        }
    }, [error])

    useEffect(() => {
        if (searchMDAData) {
            setSearchingUser(true);
            setMDAList(searchMDAData.MDAs);
            setLoadSearchButton(false);
        }
    }, [searchMDAData])

    useEffect(() => {
        if (searchMDAError) {
            showSnackBar({
                severity: "error",
                message: searchMDAError,
            });
            setLoadSearchButton(false);
        }
    }, [searchMDAError])

    useEffect(() => {
        if (errorConsultant) {
            showSnackBar({
                severity: "error",
                message: errorConsultant,
            });
        }
    }, [errorConsultant])
    useEffect(() => {
        if (dataConsultant) {
            showSnackBar({
                severity: "success",
                message: "Consultant approved successfully",
            });
            window.location.reload();
        }
    }, [dataConsultant])

    useEffect(() => {
        if (internalBillError) {
            showSnackBar({
                severity: "error",
                message: internalBillError,
            });
        }
    }, [internalBillError])
    useEffect(() => {
        if (internalBillData) {
            showSnackBar({
                severity: "success",
                message: "MDA internal bill approved successfully",
            });
            window.location.reload();
        }
    }, [internalBillData])

    useEffect(() => {
        if (disableInternalBillError) {
            showSnackBar({
                severity: "error",
                message: disableInternalBillError,
            });
        }
    }, [disableInternalBillError])
    useEffect(() => {
        if (disableInternalBillData) {
            showSnackBar({
                severity: "success",
                message: "MDA internal bill disabled successfully",
            });
            window.location.reload();
        }
    }, [disableInternalBillData])

    useEffect(() => {
        if (errorDisableSpliting) {
            showSnackBar({
                severity: "error",
                message: errorDisableSpliting,
            });
        }
    }, [errorDisableSpliting])
    useEffect(() => {
        if (dataDisableSpliting) {
            showSnackBar({
                severity: "success",
                message: "Consultant splitting disabled successfully",
            });
            window.location.reload();
        }
    }, [dataDisableSpliting])

    useEffect(() => {
        if (errorSplitting) {
            showSnackBar({
                severity: "error",
                message: errorSplitting,
            });
        }
    }, [errorSplitting])
    useEffect(() => {
        if (dataSplitting) {
            showSnackBar({
                severity: "success",
                message: "Consultant splitting enabled successfully",
            });
            window.location.reload();
        }
    }, [dataSplitting])

    useEffect(() => {
        fetchData();
    }, [page]);

    function onPageChange(selectedItem: {
        selected: number;
    }) {
        setPage(selectedItem.selected)
    }

    const toggleDisplayModal = () => {
        setOpenDisplayModal(!openDisplayModal);
    }
    const toggleConsultantDisplayModal = () => {
        setDisplayConsultantViewMode(!displayConsultantViewMode);
    }

    const handleMDASelection = (e: any) => {
        setSelectedMDA(e);
        toggleDisplayModal();
    }
    const handleMDAConsultantSelection = (e: any) => {
        setSelectedMDAConsultant(e);
        toggleConsultantDisplayModal();
    }

    const handleApproveConsultant = () => {
        approveConsultant({
            MDAConsultantId: selectedMDAConsultant._id
        });
    }

    const handleDisableSplittingConsultant = () => {
        disableSpliting({
            MDAId: selectedMDA._id
        });
    }

    const handleAllowSplittingConsultant = () => {
        allowSplitting({
            MDAId: selectedMDA._id
        });
    }

    const handleDisableInternalBill = () => {
        disableMDAInternalBill({
            MDAId: selectedMDA._id
        });
    }

    const handleAllowInternalBill = () => {
        approveMDAInternalBill({
            MDAId: selectedMDA._id
        });
    }

    const handleCancelUserSearch = () => {
        fetchData();
        setAgentSearchValue('');
    }

    return (
        <DashboardLayout>
            <>
                <div className="flex flex-col px-4 py-8 gap-8">
                    <div>
                        <div className="flex flex-col mx-auto mb-10 w-96 gap-8 self-center mt-8">
                            <form action="" onSubmit={handleUserDataSearch}>
                                <TextField.Container className="bg-gray-200 mb-5">
                                    <TextField.Input value={agentSearchValue} defaultValue={agentSearchValue} onChange={(evt) => setAgentSearchValue(evt.target.value)} />
                                </TextField.Container>

                                <Button variant="outlined" className="px-8 text-sm w-max mx-auto block" isLoading={loadSearchButton} disabled={loadSearchButton}>Search MDA</Button>
                            </form>
                        </div>
                        <MDATableList name="List of MDAs" mdaList={mdaList} cancelUserSearch={handleCancelUserSearch} searchingUser={searchingUser} isLoading={isLoading} error={error} page={page} count={count} handleClick={handleMDASelection} />
                    </div>
                </div>
                <Modal onCancel={toggleDisplayModal} footer={null} open={openDisplayModal}>
                    <Tabs type="card">
                        <Tabs.TabPane tab="MDA Details" key="item-1">
                            <div>
                                <div className="grid grid-cols-2 gap-5">
                                    <div>
                                        <p className="text-md">Name:</p>
                                        <RegularTextInput type="text" disabled placeholder="example@gmail.com" className="text-xs"
                                            value={selectedMDA.name} />
                                    </div>
                                    <div>
                                        <p className="text-md">Email Address:</p>
                                        <RegularTextInput type="text" disabled placeholder="example@gmail.com" className="text-xs"
                                            value={selectedMDA.email} />
                                    </div>
                                    <div>
                                        <p className="text-md">Date Added:</p>
                                        <RegularTextInput type="text" disabled placeholder="example@gmail.com" className="text-xs"
                                            value={formatDate(selectedMDA.createdAt)} />
                                    </div>
                                    <div>
                                        <p className="text-md">Active:</p>
                                        <RegularTextInput type="text" disabled placeholder="example@gmail.com" className="text-xs"
                                            value={selectedMDA.isActive ? "Active" : "Not Active"} />
                                    </div>
                                    <div>
                                        <p className="text-md">Live Key:</p>
                                        <RegularTextInput type="text" disabled placeholder="example@gmail.com" className="text-xs"
                                            value={selectedMDA.liveKey} />
                                    </div>
                                    <div>
                                        <p className="text-md">Test Key:</p>
                                        <RegularTextInput type="text" disabled placeholder="example@gmail.com" className="text-xs"
                                            value={selectedMDA.testKey} />
                                    </div>
                                </div>

                                <div className="mt-10 grid grid-cols-2">
                                    {
                                        !selectedMDA?.allowInternalBilling ?
                                            <Button onClick={handleAllowInternalBill} isLoading={isLoadingInternalBill}>Allow MDA Internal Bill</Button>
                                            :
                                            <Button className="bg-red-600" onClick={handleDisableInternalBill} isLoading={isLoadingDisableInternalBill}>Disable MDA Internal Bill</Button>
                                    }
                                </div>
                            </div>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="All Consultants" key="item-2">
                            {
                                !displayConsultantViewMode ?
                                    <MDAConsultantTableList name="List of Consultants" mdaList={selectedMDA.mdaConsultant} isLoading={isLoading} error={error} page={page} count={count} handleClick={handleMDAConsultantSelection} />
                                    :
                                    <div>
                                        <div className="grid grid-cols-2 gap-5">
                                            <div>
                                                <p className="text-md">Name:</p>
                                                <RegularTextInput type="text" disabled placeholder="example@gmail.com" className="text-xs"
                                                    value={selectedMDAConsultant.name} />
                                            </div>
                                            <div>
                                                <p className="text-md">Email Address:</p>
                                                <RegularTextInput type="text" disabled placeholder="example@gmail.com" className="text-xs"
                                                    value={selectedMDAConsultant.email} />
                                            </div>
                                            <div>
                                                <p className="text-md">Date Added:</p>
                                                <RegularTextInput type="text" disabled placeholder="example@gmail.com" className="text-xs"
                                                    value={formatDate(selectedMDAConsultant.createdAt)} />
                                            </div>
                                            <div>
                                                <p className="text-md">Revenue Code:</p>
                                                <RegularTextInput type="text" disabled placeholder="example@gmail.com" className="text-xs"
                                                    value={selectedMDAConsultant.RevenueCode} />
                                            </div>
                                            <div>
                                                <p className="text-md">Revenue Name:</p>
                                                <RegularTextInput type="text" disabled placeholder="example@gmail.com" className="text-xs"
                                                    value={selectedMDAConsultant.RevenueName} />
                                            </div>
                                            <div>
                                                <p className="text-md">Settlement Account Name:</p>
                                                <RegularTextInput type="text" disabled placeholder="example@gmail.com" className="text-xs"
                                                    value={selectedMDAConsultant.settlementAccountName} />
                                            </div>
                                            <div>
                                                <p className="text-md">Settlement Account Number:</p>
                                                <RegularTextInput type="text" disabled placeholder="example@gmail.com" className="text-xs"
                                                    value={selectedMDAConsultant.settlementAccountNumber} />
                                            </div>
                                            <div>
                                                <p className="text-md">Settlement Bank Name:</p>
                                                <RegularTextInput type="text" disabled placeholder="example@gmail.com" className="text-xs"
                                                    value={selectedMDAConsultant.settlementBankName} />
                                            </div>
                                            <div>
                                                <h4>Min Service Charge</h4>
                                                <RegularTextInput disabled value={selectedMDAConsultant.minServiceCharge} name="name" className="text-xs" />
                                            </div>
                                            <div>
                                                <h4>Max Service Charge</h4>
                                                <RegularTextInput disabled value={selectedMDAConsultant.maxServiceCharge} name="name" className="text-xs" />
                                            </div>
                                            <div>
                                                <h4>Splitting Percentage For Consultant</h4>
                                                <RegularTextInput disabled value={selectedMDAConsultant.SplittingPercentageForConsultant} name="name" className="text-xs" />
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap mt-8 gap-8">
                                            <div className="form-group">
                                                <Checkbox checked={selectedMDAConsultant.DoNotChargeUserForTransactionFee} disabled>Do Not Charge User For Transaction Fee</Checkbox>
                                            </div>
                                            <div className="form-group">
                                                <Checkbox checked={selectedMDAConsultant.chargeUserForOnlySystemTransactionFee} disabled>Charge User For Only System Transaction Fee</Checkbox>
                                            </div>
                                            <div className="form-group">
                                                <Checkbox checked={selectedMDAConsultant.allowPartialPayment} disabled>Allow Partial Payment</Checkbox>
                                            </div>
                                            <div className="form-group">
                                                <Checkbox checked={selectedMDAConsultant.takeServiceChargeFromGovtCut} disabled>Take Service Charge From Govt Cut</Checkbox>
                                            </div>
                                            <div className="form-group">
                                                <Checkbox checked={selectedMDAConsultant.maxServiceChargeStatus} disabled>Max Service Charge Status</Checkbox>
                                            </div>
                                        </div>
                                        <div className="mt-10 flex gap-5">
                                            <Button className="px-5" isLoading={isLoadingConsultant} onClick={handleApproveConsultant}>Approve Consultant</Button>
                                            {
                                                !selectedMDAConsultant.approve ?
                                                    <Button className="px-5" variant="outlined"
                                                        isLoading={isLoadingSplitting} onClick={handleAllowSplittingConsultant}>Approve Splitting Percentage</Button>
                                                    :
                                                    <Button className="px-5" variant="outlined"
                                                        isLoading={loadingDisableSpliting} onClick={handleDisableSplittingConsultant}>Disable Splitting Percentage</Button>
                                            }
                                        </div>
                                    </div>
                            }
                        </Tabs.TabPane>
                    </Tabs>
                </Modal>
            </>
        </DashboardLayout>
    );
}