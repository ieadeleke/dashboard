import { IconButton } from "@/components/buttons/IconButton";
import { TextField } from "@/components/input/InputText";
import DashboardLayout from "@/components/layout/dashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronDown, MoreHorizontalIcon, PlusIcon, SearchIcon } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { CheckBox } from "@/components/buttons/CheckBox";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import SEO from "@/components/SEO";
import { IncidentAlertDialog, IncidentAlertDialogRef } from "@/components/dialogs/AlertDialog";
import { useFetchAllFleets } from "@/utils/apiHooks/fleets/useFetchAllFleets";
import { Fleet } from "@/models/fleets";
import Loading from "@/components/states/Loading";
import Error from "@/components/states/Error";
import { AddFleetModal, AddFleetModalRef } from "@/components/dashboard/fleet/AddFleetModal";
import { useRouter } from "next/router";
import { useVerifyFleet } from "@/utils/apiHooks/fleets/useVerifyFleet";
import CircularProgress from "@mui/material/CircularProgress";
import { GlobalActionContext } from "@/context/GlobalActionContext";
import { fleetActions } from "@/redux/reducers/fleets";
import { useFleetsSelector } from "@/redux/selectors/fleets.selector";
import { BoatDetailModal, BoatDetailModalRef } from "@/components/dashboard/fleet/FleetDetail";
import { Trip } from "@/models/trips";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import ReactPaginate from 'react-paginate';
import { TablePagination } from "@/components/pagination/TablePagination";

type TableDataListProps = {
    data: Fleet,
    onViewBoatDetails?: (data: Fleet) => void,
    onVerifyError?: (error: string) => void,
    onVerifySuccess?: (fleet: Fleet) => void
}

type TabBodyProps = {
    tab: "active" | "all" | "suspended" | "pending",
    addFleet?: () => void,
    updateSize?: (size: number) => void
}

const tabs = [
    {
        name: "All",
        value: "all"
    },
    {
        name: "Active",
        value: "active"
    },
    {
        name: "Suspended",
        value: "suspended"
    },
    {
        name: "Pending",
        value: "pending"
    }
]


export const FleetTableDataList = (props: TableDataListProps) => {
    const { data } = props
    const { isLoading, error, verifyFleet, data: verifyData } = useVerifyFleet()

    const alertRef = useRef<IncidentAlertDialogRef>(null)

    useEffect(() => {
        if (error) {
            props.onVerifyError?.(error)
        }
    }, [error])

    useEffect(() => {
        if (verifyData) {
            const updatedFleet = Object.assign({}, data, { status: "active" })
            fleetActions.updateFleet({
                fleet_id: data._id,
                data: updatedFleet
            })
            props.onVerifySuccess?.(updatedFleet)
        }
    }, [verifyData])

    function handleVerifyFleet() {
        alertRef.current?.show({
            variant: "regular",
            data: {
                title: "Are you sure you want to verify this fleet?",
                description: "",
            },
            onConfirm: () => {
                alertRef.current?.dismiss()
                verifyFleet({ boatId: data._id })
            },
            onCancel: () => {
                alertRef.current?.dismiss()
            }
        })
    }

    function handleViewBoatDetails() {
        props.onViewBoatDetails?.(data)
    }

    const statusLabel = useMemo(() => {
        switch (data.status) {
            case "active":
                return "Active"
            case "pending":
                return "Pending"
            default:
                return "Suspended"
        }
    }, [data.status])

    const statusStyles = useMemo(() => {
        switch (data.status) {
            case "active":
                return {
                    container: 'bg-pattens-blue-100',
                    label: 'text-pattens-blue-950'
                }
            case "pending":
                return {
                    container: 'bg-barley-white-100',
                    label: 'text-barley-white-900'
                }
            default:
                return {
                    container: 'bg-we-peep-200',
                    label: 'text-we-peep-900'
                }
        }
    }, [data.status])

    return <TableBody className="bg-white">
        <IncidentAlertDialog ref={alertRef} />
        <TableRow>
            <TableCell className="flex font-medium"><CheckBox /></TableCell>
            <TableCell>
                <div className="flex items-center gap-4">
                    <img src={data.imgUrl} className="bg-gray-200 h-10 w-10 object-cover object-center" />
                    <p>{data.model}</p>
                </div>
            </TableCell>
            <TableCell>{data.capacity}</TableCell>
            <TableCell className="flex">
                <div className={`${statusStyles.container} p-2 rounded-md`}>
                    <p className={`${statusStyles.label} text-sm`}>{statusLabel}</p>
                </div>
            </TableCell>
            <TableCell>{data.User.firstName} {data.User.lastName}</TableCell>
            <TableCell>
                {isLoading ? <CircularProgress size={24} /> :
                    <Popover>
                        <PopoverTrigger>
                            <IconButton className="text-primary border border-primary rounded-sm">
                                <MoreHorizontalIcon />
                            </IconButton>
                        </PopoverTrigger>

                        <PopoverContent className="w-auto px-0 py-1">
                            {data.status != 'active' ? <p className="text-sm cursor-pointer py-1 hover:bg-gray-50 px-2" onClick={handleVerifyFleet}>Approve Fleet</p> : <p className="text-sm cursor-pointer py-2 hover:bg-gray-50 px-2">Suspend Fleet</p>}
                            <p className="text-sm cursor-pointer py-1 hover:bg-gray-50 px-2" onClick={handleViewBoatDetails}>Fleet Details</p>
                        </PopoverContent>
                    </Popover>
                    // <DropdownMenu>
                    //     <DropdownMenuTrigger>

                    //     </DropdownMenuTrigger>
                    //     <DropdownMenuContent>
                    //         {data.status != 'active' ? <DropdownMenuItem onClick={handleVerifyFleet}>Approve Fleet</DropdownMenuItem> : <DropdownMenuItem>Suspend Fleet</DropdownMenuItem>}
                    //         <DropdownMenuItem onClick={handleViewBoatDetails}>Fleet Details</DropdownMenuItem>
                    //     </DropdownMenuContent>
                    // </DropdownMenu>
                }

            </TableCell>
        </TableRow>
    </TableBody>
}

const TabBody = (props: TabBodyProps) => {
    const { isLoading, error, count, fetchAllFleets } = useFetchAllFleets()
    const _data = useFleetsSelector()
    const [page, setPage] = useState(0)
    const { showSnackBar } = useContext(GlobalActionContext)
    const { tab } = props
    const BoatDetailModalRef = useRef<BoatDetailModalRef>(null)

    const data = useMemo(() => _data.filter((item) => {
        if (tab == 'active') {
            return item.status == 'active'
        } else if (tab == 'pending') {
            return item.status == 'pending'
        } else if (tab == 'suspended') {
            return item.status == 'suspended'
        } else return true
    }), [JSON.stringify(_data)])

    useEffect(() => {
        fetchAllFleets({ page })
    }, [page])

    function onPageChange(selectedItem: {
        selected: number;
    }) {
        setPage(selectedItem.selected)
    }


    function onViewBoatDetails(fleet: Fleet) {
        BoatDetailModalRef.current?.open({
            data: fleet
        })
    }

    // useEffect(() => {
    //     if (error == 'Unauthorized' || error == 'Not authenticated') {
    //         showSnackBar({ severity: 'error', message: error })
    //     }
    // }, [error])

    useEffect(() => {
        props.updateSize?.(data.length)
    }, [data.length])

    function onVerifyError(error: string) {
        showSnackBar({ severity: 'error', message: error })
    }

    function onVerifySuccess(fleet: Fleet) {
        showSnackBar({ severity: 'success', message: 'Fleet verified successfully' })
    }

    return <div>
        <BoatDetailModal ref={BoatDetailModalRef} />
        <div className="flex flex-col items-start p-4 bg-white gap-4 md:flex-row md:items-center">
            <TextField.Container className="flex-1 border border-gray-200">
                <TextField.Input className="h-10" placeholder="Search" />

                <IconButton className="text-gray-200">
                    <SearchIcon />
                </IconButton>
            </TextField.Container>

            <div onClick={props.addFleet} className="cursor-pointer flex items-center gap-1 text-text-normal font-semibold border rounded-md py-2 px-2">
                <PlusIcon className="text-gray-500 w-4 h-4" />
                <p className="text-sm">Add New Fleet</p>
            </div>


            <div className="border rounded-md">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <div className="flex items-center gap-3 text-text-normal font-semibold">
                            <p className="text-sm">Filter</p>
                            <ChevronDown className="text-gray-500" />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Action 1</DropdownMenuLabel>
                        <DropdownMenuItem>Action 2</DropdownMenuItem>
                        <DropdownMenuItem>Action 3</DropdownMenuItem>
                        <DropdownMenuItem>Action 4</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>

        <div className="min-h-[500px]">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">
                            <div className="flex items-center">
                                <CheckBox />
                            </div>
                        </TableHead>
                        <TableHead>Boat Name</TableHead>
                        <TableHead>Seats</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>{`Owner's`} Name</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>

                {data.map((item, index) => <FleetTableDataList key={index} data={item} onViewBoatDetails={onViewBoatDetails} onVerifyError={onVerifyError} onVerifySuccess={onVerifySuccess} />)}
            </Table>
            {isLoading ? <Loading className="h-[400px]" /> : error ? <Error onRetry={fetchAllFleets} className="h-[400px]" /> : null}
        </div>

        <div className="flex mt-4 justify-center">
            <TablePagination
                breakLabel="..."
                nextLabel=">"
                onPageChange={onPageChange}
                pageRangeDisplayed={5}
                currentPage={page}
                pageCount={Math.max(0, data.length / 20)}
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
    </div>
}

export default function Fleets() {
    const [size, setSize] = useState(0)
    const addFleetModalRef = useRef<AddFleetModalRef>(null)
    const router = useRouter()
    const [activeTab, setActiveTab] = useState<string>()

    useEffect(() => {
        const tab = router.query.tab as string | undefined
        if (!tab) {
            setActiveTab(`active`)
        } else setActiveTab(tab)
    }, [router.query])

    function onTabValueChanged(value: string) {
        router.push(`/fleets?tab=${value}`)
    }

    function addFleet() {
        addFleetModalRef.current?.open()
    }

    function onNewFleetAdded(fleet: Fleet) {
        addFleetModalRef.current?.close()
        router.push(`/fleets?tab=${fleet.status}`)
    }

    return (
        <DashboardLayout>
            <Tabs value={activeTab} onValueChange={onTabValueChanged} className="flex flex-col py-8">

                <div className="flex flex-col gap-6">
                    <SEO title="Laswa | Fleets" />
                    <AddFleetModal ref={addFleetModalRef} onNewFleetAdded={onNewFleetAdded} />
                    <h1 className="text-2xl font-bold">All Fleets <span className="text-primary">({size})</span></h1>

                    <div>
                        <TabsList className="flex flex-wrap justify-start bg-white h-auto py-0 px-0">
                            {tabs.map((item) => <div className={``} key={item.value}>
                                <TabsTrigger className="mx-0 w-36 py-4 data-[state=active]:bg-[#F9F9FE] text-gray-500 rounded-none data-[state=active]:text-primary data-[state=active]:border-b-2 border-b-primary" value={item.value}>{item.name}</TabsTrigger>
                            </div>)}
                        </TabsList>
                    </div>

                    <div className="mt-4">
                        <TabsContent value="active">
                            <TabBody addFleet={addFleet} tab="active" updateSize={setSize} />
                        </TabsContent>

                        <TabsContent value="all">
                            <TabBody addFleet={addFleet} tab="all" updateSize={setSize} />
                        </TabsContent>

                        <TabsContent value="suspended">
                            <TabBody addFleet={addFleet} tab="suspended" updateSize={setSize} />
                        </TabsContent>

                        <TabsContent value="pending">
                            <TabBody addFleet={addFleet} tab="pending" updateSize={setSize} />
                        </TabsContent>
                    </div>

                </div>

            </Tabs>
        </DashboardLayout>
    )
}
