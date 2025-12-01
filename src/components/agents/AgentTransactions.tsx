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
import { Spin } from "antd";
import { useFetchAgentTrans } from "@/utils/apiHooks/agents/useFetchAgentTrans";
import { DateRange } from "../calendar/CalendarRange";
import { convertDateToFormat, convertToDate, getDefaultDateAsString } from "@/utils/data/getDefaultDate";
import { Transaction } from "@/models/transactions";
import { TransactionDetails, TransactionDetailsRef } from "../agents/AgentTransactionDetails";
import { DatePicker, DatePickerInput } from "@carbon/react";
import dayjs from "dayjs";


type AgentTableProps = {
    userId?: string
};

type AgentTransactionTableProps = {
    createdAt: string;
    amount: string;
    category: string;
    type: string;
    Status: string;
    balance_after: string;
    balance_before: string;
    total: string;
}[]

export const AgentTotalTransactionList = ({ userId }: AgentTableProps) => {
    const { fetchWalletTrans, isLoading, error, data } = useFetchAgentTrans();
    const [isDateModalOpen, setIsDateModalOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [date, setDate] = useState(getDefaultDateAsString())
    const [defaultDate, setDefaultDate] = useState<any>([
        convertToDate(getDefaultDateAsString().startDate),
        convertToDate(getDefaultDateAsString().endDate),
    ]);
    const [count, setCount] = useState<number>(0);
    const [transData, setTransData] = useState<Transaction[]>([]);
    const transactionDetailsRef = useRef<TransactionDetailsRef>(null)
    const tableRef = useRef<HTMLTableElement>(null)


    const { showSnackBar } = useContext(GlobalActionContext);

    const handleClick = (e: any) => {
        // props.handleClick(e);
    }

    function onNewDateApplied(dates: any, dateStrings: any) {
        if (dates && dates.length === 2) {
            const from = dayjs(dates[0]).toDate();
            const to = dayjs(dates[1]).toDate();
            setDefaultDate([from, to]);
            setDate({
                startDate: convertDateToFormat(from),
                endDate: convertDateToFormat(to || new Date()),
            });
            setPage(0);
        }
    }

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
            setTransData(data.Transaction);
            setCount(data.count)
        }
    }, [data])

    useEffect(() => {
        if (userId) {
            fetchWalletTrans({
                userId,
                page: page + 1,
                ...date
            });
        }
    }, [userId, page, date])

    function onPageChange(selectedItem: {
        selected: number;
    }) {
        setPage(selectedItem.selected)
    }
    function showTransactionDetails(transaction: Transaction) {
        transactionDetailsRef.current?.open?.({
            data: transaction
        })
    }

    function generatePrintableHTML() {
        const start = (date as any)?.startDate || "";
        const end = (date as any)?.endDate || "";
        const header = `
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
                <h1 style="font-size:18px;margin:0;">Agent Transaction History</h1>
                <div style="text-align:right;font-size:12px;color:#555;">
                    <div>Date range: ${start} — ${end}</div>
                    <div>Generated: ${new Date().toLocaleString()}</div>
                </div>
            </div>
        `;

        const tableHead = `
            <thead>
                <tr>
                    <th>Date Added</th>
                    <th>Amount Paid</th>
                    <th>Payment Channel</th>
                    <th>Payer Name</th>
                    <th>Status</th>
                </tr>
            </thead>
        `;

        const tableRows = transData.map((item) => `
            <tr>
                <td>${item.createdAt ?? ""}</td>
                <td>${formatAmount(item.amountPaid)}</td>
                <td>${item.PaymentChannel ?? ""}</td>
                <td>${capitalizeFirstLetter(item.PayerName ?? "")}</td>
                <td>${item.Status ?? ""}</td>
            </tr>
        `).join("");

        const emptyRow = transData.length === 0 ? `
            <tr>
                <td colspan="5" style="text-align:center;color:#666;padding:12px;">No transactions found for the selected range.</td>
            </tr>
        ` : "";

        const table = `
            <table>
                ${tableHead}
                <tbody>
                    ${tableRows}
                    ${emptyRow}
                </tbody>
            </table>
        `;

        const styles = `
            * { box-sizing: border-box; }
            body { font-family: Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Noto Sans, "Apple Color Emoji", "Segoe UI Emoji"; padding: 24px; }
            h1 { font-weight: 600; }
            table { width: 100%; border-collapse: collapse; }
            thead th { background: #0d60d8; color: #fff; text-align: left; padding: 10px; font-size: 12px; }
            tbody td { border-bottom: 1px solid #e5e7eb; padding: 10px; font-size: 12px; }
            tr:nth-child(even) td { background: #fafafa; }
            @media print {
                body { padding: 0; }
            }
        `;

        return `<!doctype html>
            <html>
                <head>
                    <meta charset="utf-8" />
                    <title>Agent Transaction History</title>
                    <style>${styles}</style>
                </head>
                <body>
                    ${header}
                    ${table}
                </body>
            </html>`;
    }

    function handleDownloadPDF() {
        try {
            const html = generatePrintableHTML();
            const printWin = window.open("", "_blank", "width=1200,height=800");
            if (!printWin) return;
            printWin.document.open();
            printWin.document.write(html);
            printWin.document.close();
            printWin.focus();
            printWin.onload = () => {
                printWin.print();
                printWin.close();
            };
        } catch (e) {
            console.error(e);
            showSnackBar({ severity: "error", message: "Failed to generate PDF" });
        }
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <Button variant="outlined" className="h-10 px-4" onClick={handleDownloadPDF}>Download PDF</Button>
                <DatePicker datePickerType="range" onChange={onNewDateApplied} value={defaultDate}>
                    <DatePickerInput id="agent-transactions-date-start" placeholder="mm/dd/yyyy" labelText="Start date" size="lg" />
                    <DatePickerInput id="agent-transactions-date-end" placeholder="mm/dd/yyyy" labelText="End date" size="lg" />
                </DatePicker>
            </div>
            <TransactionDetails ref={transactionDetailsRef} />
            {
                isLoading ?
                    <Spin spinning={isLoading} />
                    :
                    <>
                        <Table ref={tableRef}>
                            <TableHeader className="bg-primary rounded-xl">
                                <TableRow>
                                    <TableHead className="text-white">Date Added</TableHead>
                                    <TableHead className="text-white">Amount Paid</TableHead>
                                    <TableHead className="text-white">Payment Channel</TableHead>
                                    <TableHead className="text-white">Payer Name</TableHead>
                                    {/* <TableHead className="text-white">Category</TableHead> */}
                                    <TableHead className="text-white">Status</TableHead>
                                    <TableHead className="text-white">Type</TableHead>
                                </TableRow>
                            </TableHeader>

                            {transData.map((item, index) => (
                                <TableBody onClick={() => showTransactionDetails(item)} key={index} className="bg-white cursor-pointer">
                                    <TableRow>
                                        <TableCell>{item.createdAt}</TableCell>
                                        <TableCell>{formatAmount(item.amountPaid)}</TableCell>
                                        <TableCell>{item.PaymentChannel}</TableCell>
                                        <TableCell>{capitalizeFirstLetter(item.PayerName)}</TableCell>
                                        {/* <TableCell>{item.ca}</TableCell> */}
                                        <TableCell>
                                            <TransactionStatusChip status={item.Status as TransactionStatus} />
                                        </TableCell>
                                        <TableCell><Button className="text-xs w-24 h-8 bg-gray-800">View Details</Button></TableCell>
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
                                currentPage={page}
                                pageCount={Math.max(0, count / 20)}
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
                    </>
            }
        </div >
    );
};


function capitalizeFirstLetter(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1);
}
