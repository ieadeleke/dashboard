import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useContext, useEffect, useState } from "react";
import { SettlementAccount } from "@/models/settlements";
import Loading from "../states/Loading";
import Error from "../states/Error";
import { GlobalActionContext } from "@/context/GlobalActionContext";
import { TablePagination } from "../pagination/TablePagination";
import Link from "next/link";
import { formatAmount } from "@/utils/formatters/formatAmount";
import { DatePicker, DatePickerInput } from "@carbon/react";
import { useInitiateSettlement } from "@/utils/apiHooks/settlements/useInitiateSettlement";
import Button from "../buttons";
import { useFinalizeSettlement } from "@/utils/apiHooks/settlements/useFinalizeSettlement";
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';


type SettlementAccountTableProps = {
    name: string;
    settlementAccounts: SettlementAccount[];
    isLoading?: boolean;
    error?: string | null;
    fetchData: (params: any) => void;
    onPageChange?: (value: { selected: number }) => void;
    page: number;
    count: number;
    dateToUse?: string
};

export const CalculatedSettlementAccountTable = (props: SettlementAccountTableProps) => {

    const { settlementAccounts } = props;

    const { showSnackBar } = useContext(GlobalActionContext);
    const {
        isLoading,
        data,
        error,
        initiateSettlement
    } = useInitiateSettlement();

    const {
        isLoading: finalizeSettlementLoader,
        data: finalizeSettlementData,
        error: finalizeSettlementError,
        finalizeSettlement
    } = useFinalizeSettlement();

    const [pageSpinner, setPageSpinner] = useState<boolean>(false);
    const [defaultDate, setDefaultDate] = useState(props.dateToUse && new Date(props.dateToUse));
    const [formattedDate, setFormattedDate] = useState<any>(props.dateToUse);

    function showSettlementAccountDetails(settlementAccount: SettlementAccount) { };

    const onNewDateApplied = (date: any) => {
        const selectedDate = date[0];
        if (selectedDate instanceof Date) {
            const year = selectedDate.getFullYear();
            const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
            const day = String(selectedDate.getDate()).padStart(2, '0');

            const formattedDate = `${year}-${month}-${day}`;
            setDefaultDate(new Date(formattedDate));
            setFormattedDate(formattedDate);
            props.fetchData(formattedDate);
        }
    }

    useEffect(() => {
        if (error) {
            showSnackBar({
                severity: 'error',
                message: error
            })
            setPageSpinner(false);
        }
    }, [error])
    useEffect(() => {
        if (data) {
            let settlementId = data?.Settlement?._id;
            finalizeSettlement({ settlementId });
        }
    }, [data])

    useEffect(() => {
        if (finalizeSettlementError) {
            showSnackBar({
                severity: 'error',
                message: finalizeSettlementError
            })
            setPageSpinner(false)
        }
    }, [finalizeSettlementError])
    useEffect(() => {
        if (finalizeSettlementData) {
            showSnackBar({
                severity: 'error',
                message: 'Settlement successful'
            })
            window.location.reload();
        }
    }, [finalizeSettlementData])

    const handleSettlementInitiation = (item: any) => {
        if (formattedDate) {
            initiateSettlement({
                Date: formattedDate,
                account_number: item.account_number
            })
            setPageSpinner(true);
        }
    }

    return (
        <Spin spinning={pageSpinner} indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}>
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <div></div>
                    <div>
                        <DatePicker datePickerType="single" onChange={onNewDateApplied} value={defaultDate}>
                            <DatePickerInput id="date-picker-input-id-start" placeholder="mm/dd/yyyy" labelText="Date" size="lg" />
                        </DatePicker>
                    </div>
                </div>

                <Table>
                    <TableHeader className="bg-primary rounded-xl">
                        <TableRow>
                            <TableHead className="text-white"></TableHead>
                            <TableHead className="text-white">Account Number</TableHead>
                            <TableHead className="text-white">Bank Name</TableHead>
                            <TableHead className="text-white">Number of transactions</TableHead>
                            <TableHead className="text-white">Amount To Settle</TableHead>
                            <TableHead className="text-white">Amount Paid</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>

                    {settlementAccounts.map((item, index: number) => (
                        <TableBody
                            // onClick={() => showSettlementAccountDetails(item)}
                            key={index}
                            className="bg-white cursor-pointer"
                        >
                            <TableRow>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{item.account_number}</TableCell>
                                <TableCell>{item.bank_name}</TableCell>
                                <TableCell>{item.numberOfTransaction}</TableCell>
                                <TableCell>{formatAmount(item.amountSettle)}</TableCell>
                                <TableCell>{item?.amountPaid && formatAmount(+item.amountPaid)}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleSettlementInitiation(item)}
                                        className="bg-black text-white rounded-sm px-2 py-2 text-xs">
                                        Finalize Settlement
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    ))}
                </Table>

                {/* <div className="flex justify-center">
        <TablePagination
          breakLabel="..."
          nextLabel=">"
          onPageChange={props.onPageChange}
          pageRangeDisplayed={5}
          currentPage={props.page}
          pageCount={Math.max(0, props.count / 20)}
          // pageCount={1}
          className="flex gap-4"
          nextClassName="text-gray-500"
          previousClassName="text-gray-500"
          pageClassName="flex w-8 h-7 bg-white justify-center items-center text-sm text-gray-500 rounded-sm outline outline-2 outline-gray-100 text-center"
          activeClassName="!bg-primary text-white !outline-none"
          previousLabel="<"
          renderOnZeroPageCount={null}
        />
      </div> */}
                {props.isLoading && (
                    <Loading />
                )}
            </div>
        </Spin>
    );
};