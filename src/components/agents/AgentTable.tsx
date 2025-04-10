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
<<<<<<< HEAD
import { useGetAgents } from "@/utils/apiHooks/agents/useGetAgents";
=======
import { Input, Modal, Select } from "antd";
import { useGetAgents } from "@/utils/apiHooks/agents/useGetAgents";
import { useGetConsultants } from "@/utils/apiHooks/agents/useGetConsultants";
import { useAddConsultants } from "@/utils/apiHooks/agents/useAddConsultant";
import { useUpdateAgentConsultants } from "@/utils/apiHooks/agents/useUpdateAgentConsultant";
>>>>>>> 21b36fc9be02eff22a1c002a84632c77183b4ad8

type WalletType = {
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

type AgentTableProps = {
    name: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    mdaList: AllAgentType[];
    isLoading?: boolean;
    error?: string | null;
    fetchData?: () => void,
    onPageChange?: (value: {
        selected: number;
    }) => void,
    page: number,
    count: number,
    handleClick: (e: any) => void
};

interface ConsultantInterface {
    _id: string
    name: string
}

export const AgentTableList = (props: AgentTableProps) => {

<<<<<<< HEAD
=======
    const { getConsultantList, isLoading, error, data } = useGetConsultants();
    const { addNewConsultant, isLoading: addConsultantLoading, error: addConsultantError, data: addConsultantData } = useAddConsultants();
    const { updateAgentConsultant, isLoading: updateAgentConsultantLoading, error: updateAgentConsultantError, data: updateConsultantData } = useUpdateAgentConsultants();

>>>>>>> 21b36fc9be02eff22a1c002a84632c77183b4ad8
    const { mdaList } = props;
    const { getAgentList, isLoading, error, data } = useGetAgents();

    const [page, setPage] = useState<number>(0);
    const [count, setCount] = useState<number>(1);
    const [filterEnabled, setFilterEnabled] = useState(false);
    const [isDateModalOpen, setIsDateModalOpen] = useState(false);
    const [consultantList, setConsultantList] = useState<ConsultantInterface[]>([]);
    const [consultantTitle, setConsultantTitle] = useState<string>("");
    const [openConsultantDisplayModal, setOpenConsultantModal] = useState<boolean>(false);
    const [openNewConsultantDisplayModal, setOpenNewConsultantModal] = useState<boolean>(false);
    const [selectedConsultantId, setSelectedConsultantId] = useState<string>("");
    const [selectedAgent, setSelectedAgent] = useState({
        _id: "",
        ConsultantCompany: ""
    });

    const { showSnackBar } = useContext(GlobalActionContext);
    const [filteredTransactions, setFilteredTransactions] = useState<any>([]);

    function fetchData() {
        getConsultantList();
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (data) {
            setConsultantList(data.AgentConsultantCompany);
            // setMDAList(data.Agents);
        }
    }, [data])


    useEffect(() => {
        if (error) {
            showSnackBar({
                severity: "error",
                message: error,
            });
        }
    }, [error])

    const handleClick = (e: any) => {
        props.handleClick(e);
    }

<<<<<<< HEAD
    useEffect(() => {
        if (mdaList) {
            setCount(props.count);
            setFilteredTransactions(mdaList);
        }
    }, [mdaList])
    useEffect(() => {
        if (data && filterEnabled) {
            setCount(data.count)
            setFilteredTransactions(data.Agents);
        }
    }, [data])

    useEffect(() => {
        if (error) {
            showSnackBar({
                severity: "error",
                message: error,
            });
        }
    }, [error])

    function onPageChange(selectedItem: {
        selected: number;
    }) {
        getAgentList({
            page: selectedItem.selected + 1,
        });
        setFilterEnabled(true);
        setPage(selectedItem.selected);
    }

=======
    const toggleDisplayConsultantModal = () => {
        setOpenConsultantModal(!openConsultantDisplayModal);
    }

    const toggleNewConsultantModal = () => {
        setOpenNewConsultantModal(!openNewConsultantDisplayModal);
    }

    const saveNewConsultant = (e: any) => {
        e.preventDefault();
        addNewConsultant({ name: consultantTitle });
    }

    const handleUpdateAgentConsultant = (e: any) => {
        e.preventDefault(selectedConsultantId);
        if (selectedConsultantId && selectedAgent?._id) {
            updateAgentConsultant({
                agentId: selectedAgent?._id,
                agentConsultantCompanyId: selectedConsultantId
            });
        } else {
            showSnackBar({
                severity: "error",
                message: "Please select consultant",
            });
        }
    }

    const selectConsultantToDisplay = (e: any) => {
        setSelectedAgent({
            _id: e._id,
            ConsultantCompany: e.ConsultantCompany
        });
        setOpenConsultantModal(!openConsultantDisplayModal);
    }

    useEffect(() => {
        if (addConsultantData) {
            showSnackBar({
                severity: "success",
                message: "Consultant saved successfully",
            });
            toggleNewConsultantModal();
        }
    }, [addConsultantData])
    useEffect(() => {
        if (addConsultantError) {
            showSnackBar({
                severity: "error",
                message: addConsultantError,
            });
        }
    }, [addConsultantError])


    useEffect(() => {
        if (updateConsultantData) {
            showSnackBar({
                severity: "success",
                message: "Consultant updated successfully",
            });
            toggleDisplayConsultantModal();
        }
    }, [updateConsultantData])
    useEffect(() => {
        if (updateAgentConsultantError) {
            showSnackBar({
                severity: "error",
                message: updateAgentConsultantError,
            });
        }
    }, [updateAgentConsultantError])

>>>>>>> 21b36fc9be02eff22a1c002a84632c77183b4ad8
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h1 className="font-medium text-xl">{props.name}</h1>
<<<<<<< HEAD
                <div>
=======
                <div className="flex gap-4">
                    <button onClick={toggleNewConsultantModal} className="text-primary bg-transparent border-2 border-solid border-primary px-4 py-3 text-sm rounded-lg">Add New Consultant</button>
>>>>>>> 21b36fc9be02eff22a1c002a84632c77183b4ad8
                    <Link className="bg-primary px-4 py-4 text-white rounded-lg" href="/agents/new">Add New Agent</Link>
                </div>
            </div>

            <Table>
                <TableHeader className="bg-primary rounded-xl">
                    <TableRow>
                        <TableHead className="text-white">Date Added</TableHead>
                        <TableHead className="text-white">Name</TableHead>
                        <TableHead className="text-white">Consultant</TableHead>
                        <TableHead className="text-white">Email Address</TableHead>
                        <TableHead className="text-white">Phone Number</TableHead>
                        <TableHead className="text-white">Verified</TableHead>
                        <TableHead className="text-white">Consultant</TableHead>
                        <TableHead className="text-white"></TableHead>
                    </TableRow>
                </TableHeader>

                {filteredTransactions.map((item: any, index: number) => (
                    <TableBody key={index} className="bg-white cursor-pointer">
                        <TableRow>
                            <TableCell>{formatDate(item.createdAt)}</TableCell>
                            <TableCell>{`${item.firstName} ${item.lastName}`}</TableCell>
                            <TableCell>{item?.ConsultantCompany?.name}</TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell>{item.phoneNumber}</TableCell>
                            <TableCell>{item?.wallet?.accountName ? <div className="w-3 h-3 rounded-full bg-[#00ff00]"></div> : <div className="w-3 h-3 rounded-full bg-[#ff0000]"></div>}</TableCell>
                            <TableCell><Button onClick={() => selectConsultantToDisplay(item)} className="text-xs w-full h-8 bg-gray-800">Update Consultant</Button></TableCell>
                            <TableCell><Button onClick={() => handleClick(item)} className="text-xs w-24 h-8 bg-gray-800">View Details</Button></TableCell>
                        </TableRow>
                    </TableBody>
                ))}
            </Table>

            <div className="flex justify-center">
                <TablePagination
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={onPageChange}
                    pageRangeDisplayed={5}
<<<<<<< HEAD
                    currentPage={page}
                    pageCount={Math.max(0, count / 20)}
=======
                    currentPage={props.page - 1}
                    pageCount={Math.max(0, props.count / 20)}
>>>>>>> 21b36fc9be02eff22a1c002a84632c77183b4ad8
                    // pageCount={1}
                    className="flex gap-4"
                    nextClassName="text-gray-500"
                    previousClassName="text-gray-500"
                    pageClassName="flex w-8 h-7 bg-white justify-center items-center text-sm text-gray-500 rounded-sm outline outline-2 outline-gray-100 text-center"
                    activeClassName="!bg-primary text-white !outline-none"
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                />
            </div>
<<<<<<< HEAD
            {props.isLoading || isLoading ? <Loading /> : props.error && <Error onRetry={props.fetchData} message={props.error} />}
=======
            {props.isLoading ? <Loading /> : props.error && <Error onRetry={props.fetchData} message={props.error} />}

            <Modal onCancel={toggleDisplayConsultantModal} className="unset-width" footer={null} open={openConsultantDisplayModal}>
                <div className="md:min-w-[25rem] mx-auto">
                    <h4 className="text-center text-xl mb-2 font-bold">Edit Agent Assigned Consultant</h4>
                    <form action="" className="mt-6" onSubmit={handleUpdateAgentConsultant}>
                        <label htmlFor="" className="mb-2">Consultant Name</label>
                        <Select className="w-full h-[3.5rem]" onChange={e => setSelectedConsultantId(e)} defaultValue={selectedAgent.ConsultantCompany}>
                            {
                                consultantList.map((consultant, index) => (
                                    // <Select.Option key={index} value="">damdam</Select.Option>
                                    <Select.Option key={index} value={consultant._id}>{consultant?.name}</Select.Option>
                                ))
                            }
                        </Select>
                        <Button type="submit" isLoading={updateAgentConsultantLoading} className="mt-5 text-sm w-full py-6 pb-10 bg-gray-800">Update Consultant</Button>
                    </form>
                </div>
            </Modal>
            <Modal onCancel={toggleNewConsultantModal} className="unset-width" footer={null} open={openNewConsultantDisplayModal}>
                <div className="md:min-w-[25rem] mx-auto">
                    <h4 className="text-center text-xl mb-2 font-bold">Add New Consultant</h4>
                    <form action="" className="mt-6" onSubmit={saveNewConsultant}>
                        <div>
                            <label htmlFor="" className="mb-2">Consultant Name</label>
                            <Input value={consultantTitle} onChange={e => setConsultantTitle(e.target.value)} className="py-4" />
                        </div>
                        <Button type="submit" isLoading={addConsultantLoading}
                            className="mt-5 text-sm w-full py-6 pb-10 bg-gray-800">Add Consultant</Button>
                    </form>
                </div>
            </Modal>
>>>>>>> 21b36fc9be02eff22a1c002a84632c77183b4ad8
        </div>
    );
};


function capitalizeFirstLetter(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1);
}