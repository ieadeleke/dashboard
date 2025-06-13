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
import { IconButton } from "../buttons/IconButton";
import { CalendarIcon, DownloadIcon } from "lucide-react";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { CalendarRange, DateRange } from "../calendar/CalendarRange";
import moment from "moment";
import Loading from "../states/Loading";
import Error from "../states/Error";
import { TransactionDetails, TransactionDetailsRef } from "./TransactionDetails";
import { useDownloadReport } from "@/utils/apiHooks/transactions/useDownloadReport";
import { LoadingModal } from "../states/LoadingModal";
import { GlobalActionContext } from "@/context/GlobalActionContext";
import { convertDateToFormat, convertToDate } from "@/utils/data/getDefaultDate";
import { TransactionStatus, TransactionStatusChip } from "./TransactionStatusChip";
import Button from "../buttons";
import { formatAmount } from "@/utils/formatters/formatAmount";
import { formatDate } from "@/utils/formatters/formatDate";
import { DatePicker, DatePickerInput } from "@carbon/react";
import { TablePagination } from "../pagination/TablePagination";
import dayjs from "dayjs";
import { ConsultantDetails } from "./ConsultantDetails";
import { Collapse } from "antd";


type TransactionTableProps = {
    data: any[];
};

export const ConsultantInnerSuperAgentTable = (props: TransactionTableProps) => {

    const { Panel } = Collapse;

    return (
        <div className="flex flex-col gap-4">
            <h4 className="text-lg">Super Agents</h4>
            <Collapse defaultActiveKey={['0']}>
                {props.data.map((item, index: number) => (
                    <Panel header={`${item.superAgentName} -- ${formatAmount(item?.totalAmount)} -- ${item?.transactionCount} total transactions`} key={+index}>
                        <Table>
                            <TableHeader className="bg-primary rounded-xl">
                                <TableRow>
                                    <TableHead className="text-white"></TableHead>
                                    <TableHead className="text-white">Agent Name</TableHead>
                                    <TableHead className="text-white">Total Amount</TableHead>
                                    <TableHead className="text-white">Transaction Count</TableHead>
                                </TableRow>
                            </TableHeader>

                            {item?.agents?.map((item: any, index: number) => (
                                <TableBody key={index} className="bg-white cursor-pointer">
                                    <TableRow>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{item.agentName}</TableCell>
                                        <TableCell>{formatAmount(item?.totalAmount)}</TableCell>
                                        <TableCell><div className="text-center">{item?.transactionCount}</div></TableCell>
                                    </TableRow>
                                </TableBody>
                            ))}
                        </Table>
                    </Panel>
                ))}
            </Collapse>
        </div>
    );
};


function capitalizeFirstLetter(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1);
}