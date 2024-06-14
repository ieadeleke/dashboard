import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useContext } from "react";
import { SettlementAccount } from "@/models/settlements";
import Loading from "../states/Loading";
import Error from "../states/Error";
import { GlobalActionContext } from "@/context/GlobalActionContext";
import { TablePagination } from "../pagination/TablePagination";
import Link from "next/link";

type SettlementAccountTableProps = {
  name: string;
  settlementAccounts: SettlementAccount[];
  isLoading?: boolean;
  error?: string | null;
  fetchData?: () => void;
  onPageChange?: (value: { selected: number }) => void;
  page: number;
  count: number;
  dateRange?: {
    startDate: string;
    endDate: string;
  };
};

export const SettlementAccountTable = (props: SettlementAccountTableProps) => {
  const { settlementAccounts } = props;

  const { showSnackBar } = useContext(GlobalActionContext);

  function showSettlementAccountDetails(settlementAccount: SettlementAccount) {
    //   settlementAccountDetailsRef.current?.open?.({
    //     data: settlementAccount
    //   })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center">
        <h1 className="font-medium text-xl">{props.name}</h1>
        <div className="flex-1" />
      </div>

      <Table>
        <TableHeader className="bg-primary rounded-xl">
          <TableRow>
            <TableHead className="text-white">Account Number</TableHead>
            <TableHead className="text-white">Sort Code</TableHead>
            <TableHead className="text-white">Full Name</TableHead>
            <TableHead className="text-white">Bank</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>

        {settlementAccounts.map((item) => (
          <TableBody
            onClick={() => showSettlementAccountDetails(item)}
            key={item.id}
            className="bg-white cursor-pointer"
          >
            <TableRow>
              <TableCell>{item.account_number}</TableCell>
              <TableCell>{item.account_bank}</TableCell>
              <TableCell>{item.full_name}</TableCell>
              <TableCell>{item.bank_name}</TableCell>
              <TableCell>
                <Link
                  className="bg-black text-white rounded-sm px-2 py-2 text-xs"
                  href={`/settlement-accounts/${item.account_number}`}
                >
                  View Details
                </Link>
              </TableCell>
            </TableRow>
          </TableBody>
        ))}
      </Table>

      <div className="flex justify-center">
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
      </div>
      {props.isLoading ? (
        <Loading />
      ) : (
        props.error && <Error onRetry={props.fetchData} message={props.error} />
      )}
    </div>
  );
};
