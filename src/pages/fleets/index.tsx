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
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import SEO from "@/components/SEO";
import { IncidentAlertDialog, IncidentAlertDialogRef } from "@/components/dialogs/AlertDialog";
import { useFetchAllFleets } from "@/utils/apiHooks/fleets/useFetchAllFleets";
import { Fleet } from "@/models/fleets";
import Loading from "@/components/states/Loading";
import Error from "@/components/states/Error";
import { AddFleetModal, AddFleetModalRef } from "@/components/dashboard/fleet/AddFleetModal";

type TableDataListProps = {
    data: Fleet
}

type TabBodyProps = {
    tab: "active" | "all" | "suspended" | "pending",
    addFleet?: () => void,
    updateSize?: (size: number) => void
}

const tabs = [
    {
        name: "Active",
        value: "active"
    },
    {
        name: "All",
        value: "all"
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

    const alertRef = useRef<IncidentAlertDialogRef>(null)

    function showAlertDialog() {
        alertRef.current?.show({
            variant: "regular",
            data: {
                title: "Are you sure you want to approve this incident on [Fleet Name]",
                description: "",
            },
            onConfirm: () => {
                alertRef.current?.dismiss()
            },
            onCancel: () => {
                alertRef.current?.dismiss()
            }
        })
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
                    <img src={data.image} className="bg-gray-200 h-10 w-10 object-cover object-center" />
                    <p>{data._id}</p>
                </div>
            </TableCell>
            <TableCell>{5}</TableCell>
            <TableCell className="flex">
                <div className={`${statusStyles.container} p-2 rounded-md`}>
                    <p className={`${statusStyles.label} text-sm`}>{statusLabel}</p>
                </div>
            </TableCell>
            <TableCell>Lorem</TableCell>
            <TableCell>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <IconButton className="text-primary border border-primary rounded-sm">
                            <MoreHorizontalIcon />
                        </IconButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={showAlertDialog}>Approve Incident</DropdownMenuItem>
                        <DropdownMenuItem>Action 2</DropdownMenuItem>
                        <DropdownMenuItem>Action 3</DropdownMenuItem>
                        <DropdownMenuItem>Action 4</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
    </TableBody>
}

const TabBody = (props: TabBodyProps) => {
    const { isLoading, error, fetchAllFleets, data: _data } = useFetchAllFleets()
    const { tab } = props

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
        fetchAllFleets()
    }, [])

    useEffect(() => {
        props.updateSize?.(data.length)
    }, [data.length])

    return <div>
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

        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">
                            <div className="flex items-center">
                                <CheckBox />
                            </div>
                        </TableHead>
                        <TableHead>Fleet ID</TableHead>
                        <TableHead>Seats</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>

                {data.map((item, index) => <FleetTableDataList key={index} data={item} />)}
            </Table>
            {isLoading ? <Loading className="h-[400px]" /> : error ? <Error onRetry={fetchAllFleets} className="h-[400px]" /> : null}
        </div>
    </div>
}

export default function Home() {
    const [size, setSize] = useState(0)
    const addFleetModalRef = useRef<AddFleetModalRef>(null)

    function addFleet(){
        addFleetModalRef.current?.open()
    }

    function onNewFleetAdded(fleet: Fleet){
        
    }

    return (
        <DashboardLayout>
            <Tabs defaultValue="active" className="flex flex-col py-8">

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
