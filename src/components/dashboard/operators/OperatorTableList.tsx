import { CheckBox } from "@/components/buttons/CheckBox";
import { IconButton } from "@/components/buttons/IconButton";
import {
  ConfirmationAlertDialog,
  ConfirmationAlertDialogRef,
} from "@/components/dialogs/ConfirmationAlertDialog";
import { TextField } from "@/components/input/InputText";
import { TablePagination } from "@/components/pagination/TablePagination";
import Error from "@/components/states/Error";
import Loading from "@/components/states/Loading";
import { LoadingModal } from "@/components/states/LoadingModal";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GlobalActionContext } from "@/context/GlobalActionContext";
import { Operator } from "@/models/operators";
import { useFetchOperators } from "@/utils/apiHooks/operators/useFetchOperators";
import { useSuspendOperator } from "@/utils/apiHooks/operators/useSuspendOperator";
import { useUnSuspendOperator } from "@/utils/apiHooks/operators/useUnSuspendOperator";
import { ChevronDown, MoreHorizontalIcon, SearchIcon } from "lucide-react";
import {
  ChangeEvent,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  FilterOperatorModal,
  FilterOperatorModalRef,
  FilterOperatorOption,
} from "./FilterOperatorModal";
import { FleetStatusChip } from "../fleet/FleetStatusChip";
import { OperatorInfoModal, OperatorInfoModalRef } from "./OperatorInfo";

type OperatorTableListProps = {
  isFetchLoading: boolean;
  isFetchError: string | null;
  onRetry?: () => void;
  page: number;
  count: number;
  onPageChange?: (selectedItem: { selected: number }) => void;
  data: Operator[];
};

export const OperatorTableList = (props: OperatorTableListProps) => {
  const { isFetchError, isFetchLoading, onRetry, count, page, onPageChange } =
    props;
  const confirmationDialogRef = useRef<ConfirmationAlertDialogRef>(null);
  const [searchWord, setSearchWord] = useState("");
  const {
    isLoading: isSuspendLoading,
    error: suspendError,
    data: suspendData,
    suspendOperator,
  } = useSuspendOperator();
  const {
    isLoading: isUnSuspendLoading,
    error: unSuspendError,
    data: unSuspendData,
    unSuspendOperator,
  } = useUnSuspendOperator();
  const { showSnackBar } = useContext(GlobalActionContext);
  const [isLoading, setIsLoading] = useState(false);
  const [filterOption, setFilterOption] = useState<FilterOperatorOption>();
  const [error, setError] = useState<string | null>(null);
  const [operators, setOperators] = useState<Operator[]>([]);
  const filterOperatorRef = useRef<FilterOperatorModalRef>(null);
  const operatorInfoModalRef = useRef<OperatorInfoModalRef>(null);

  useEffect(() => {
    setOperators(props.data);
  }, [JSON.stringify(props.data)]);

  useEffect(() => {
    if (error) {
      showSnackBar({ severity: "error", message: error });
    }
  });

  useEffect(() => {
    setIsLoading(isUnSuspendLoading || isSuspendLoading);
  }, [isUnSuspendLoading, isSuspendLoading]);

  useEffect(() => {
    if (unSuspendData) {
      showSnackBar({
        severity: "success",
        message: `${unSuspendData.firstName} ${unSuspendData.lastName} has been unsuspended`,
      });
      setOperators((prevAdmins) =>
        prevAdmins.map((admin) =>
          admin._id == unSuspendData._id ? unSuspendData : admin
        )
      );
    }
  }, [unSuspendData]);

  useEffect(() => {
    if (suspendData) {
      showSnackBar({
        severity: "success",
        message: `${suspendData.firstName} ${suspendData.lastName} has been suspended`,
      });
      setOperators((prevAdmins) =>
        prevAdmins.map((admin) =>
          admin._id == suspendData._id ? suspendData : admin
        )
      );
    }
  }, [suspendData]);

  useEffect(() => {
    setError(suspendError || unSuspendError);
  }, [suspendError, unSuspendError]);

  function onChangeText(event: ChangeEvent<HTMLInputElement>) {
    setSearchWord(event.target.value);
  }

  const operatorData = useMemo(() => {
    const word = searchWord.toLowerCase();
    if (word.trim().length == 0) {
      return operators;
    }
    return operators.filter(
      (item) =>
        item.firstName.toLowerCase().includes(word) ||
        item.lastName.toLowerCase().includes(word) ||
        item.email.toLowerCase().includes(word)
    );
  }, [searchWord, JSON.stringify(operators)]);

  function onSuspendAdmin(operator: Operator) {
    confirmationDialogRef.current?.show({
      data: {
        title: "Are you sure you want to suspend this operator?",
        description: "They won't have access to the app once it is complete",
      },
      onConfirm: () => {
        confirmationDialogRef.current?.dismiss();
        suspendOperator({ userId: operator._id });
      },
      onCancel: () => {
        confirmationDialogRef.current?.dismiss();
      },
    });
  }

  function onUnSuspendOperator(operator: Operator) {
    confirmationDialogRef.current?.show({
      data: {
        title: "Are you sure you want to unsuspend this operator?",
        description:
          "They will have access to the dashboard once it is complete",
      },
      onConfirm: () => {
        confirmationDialogRef.current?.dismiss();
        unSuspendOperator({ userId: operator._id });
      },
      onCancel: () => {
        confirmationDialogRef.current?.dismiss();
      },
    });
  }

  function handleViewMoreInfo(operator: Operator) {
    operatorInfoModalRef.current?.open({
      data: operator,
    });
  }

  function openFilterModal() {
    filterOperatorRef.current?.open({
      selectedOption: filterOption,
      onOptionSelected: (option) => {
        setFilterOption(option);
        filterOperatorRef.current?.close();
      },
    });
  }

  function onOperatorDataChanged(operator: Operator) {
    setOperators((operators) =>
      operators.map((currentOperator) =>
        currentOperator._id == operator._id ? operator : currentOperator
      )
    );
  }

  return (
    <div className="flex flex-col">
      <ConfirmationAlertDialog ref={confirmationDialogRef} />
      <FilterOperatorModal ref={filterOperatorRef} />
      <OperatorInfoModal
        ref={operatorInfoModalRef}
        onOperatorDataChanged={onOperatorDataChanged}
      />
      <LoadingModal isVisible={isLoading} />

      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-start p-4 bg-white gap-4 md:flex-row md:items-center">
          <TextField.Container className="flex-1 border border-gray-200">
            <TextField.Input onChange={onChangeText} placeholder="Search" />

            <IconButton className="text-gray-200">
              <SearchIcon />
            </IconButton>
          </TextField.Container>

          <div
            onClick={openFilterModal}
            className="cursor-pointer border rounded-md px-2 py-2"
          >
            <div className="flex items-center gap-3 text-sm text-text-normal font-semibold">
              <p>Filter</p>
              <ChevronDown className="text-gray-300" />
            </div>
          </div>
        </div>

        <div className="min-h-[500px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">
                  <div className="flex">
                    <CheckBox />
                  </div>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>{`Owner's Name`}</TableHead>
                <TableHead>Status</TableHead>
                {/* <TableHead></TableHead>
                <TableHead></TableHead> */}
              </TableRow>
            </TableHeader>

            {operatorData.map((item) => (
              <TableBody key={item._id} className="bg-white">
                <TableRow>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <CheckBox />
                    </div>
                  </TableCell>
                  <TableCell>{item.firstName}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.lastName}</TableCell>
                  <TableCell>
                    <div className="flex">
                      <FleetStatusChip
                        status={item.isActive ? "active" : "suspended"}
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Popover>
                      <PopoverTrigger>
                        <IconButton className="text-primary border border-primary rounded-sm">
                          <MoreHorizontalIcon />
                        </IconButton>
                      </PopoverTrigger>

                      <PopoverContent className="w-auto px-0 py-1">
                        <p
                          className="text-sm cursor-pointer py-1 hover:bg-gray-50 px-2"
                          onClick={() => handleViewMoreInfo(item)}
                        >
                          More Options
                        </p>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
          {isFetchLoading ? (
            <Loading className="h-[400px]" />
          ) : isFetchError ? (
            <Error onRetry={onRetry} className="h-[400px]" />
          ) : null}
        </div>
      </div>

      <div className="flex mt-8 justify-center">
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
    </div>
  );
};
