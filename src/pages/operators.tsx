import { IconButton } from "@/components/buttons/IconButton";
import { TextField } from "@/components/input/InputText";
import DashboardLayout from "@/components/layout/dashboard";
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
import { AddOperatorsModal, AddOperatorsModalRef } from "@/components/dashboard/operators/AddOperatorsModal";
import { ChangeEvent, useContext, useEffect, useMemo, useRef, useState } from "react";
import SEO from "@/components/SEO";
import { useFetchOperators } from "@/utils/apiHooks/operators/useFetchOperators";
import Loading from "@/components/states/Loading";
import Error from "@/components/states/Error";
import { useSuspendOperator } from "@/utils/apiHooks/operators/useSuspendOperator";
import { useUnSuspendOperator } from "@/utils/apiHooks/operators/useUnSuspendOperator";
import { ConfirmationAlertDialog, ConfirmationAlertDialogRef } from "@/components/dialogs/ConfirmationAlertDialog";
import { Operator } from "@/models/operators";
import { GlobalActionContext } from "@/context/GlobalActionContext";
import { LoadingModal } from "@/components/states/LoadingModal";

export default function Operators() {
  const addOperatorsRef = useRef<AddOperatorsModalRef>(null)
  const { isLoading:isFetchLoading, error: isFetchError, data: _data, fetchOperators } = useFetchOperators()
  const confirmationDialogRef = useRef<ConfirmationAlertDialogRef>(null)
  const [searchWord, setSearchWord] = useState('')
  const { isLoading: isSuspendLoading, error: suspendError, data: suspendData, suspendOperator } = useSuspendOperator()
  const { isLoading: isUnSuspendLoading, error: unSuspendError, data: unSuspendData, unSuspendOperator } = useUnSuspendOperator()
  const { showSnackBar } = useContext(GlobalActionContext)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [operators, setOperators] = useState<Operator[]>([])

  useEffect(() => {
    setOperators(_data)
  }, [JSON.stringify(_data)])

  useEffect(() => {
    fetchOperators()
  }, [])

  useEffect(() => {
    if (error) {
      showSnackBar({ severity: 'error', message: error })
    }
  })

  useEffect(() => {
    setIsLoading(isUnSuspendLoading || isSuspendLoading)
  }, [isUnSuspendLoading, isSuspendLoading])

//   useEffect(() => {
//     if (isFetchError == 'Unauthorized' || isFetchError == 'Not authenticated') {
//         showSnackBar({ severity: 'error', message: isFetchError })
//     }
// }, [isFetchError])

  useEffect(() => {
    if (unSuspendData) {
      showSnackBar({ severity: 'success', message: `${unSuspendData.firstName} ${unSuspendData.lastName} has been unsuspended` })
      setOperators((prevAdmins) => prevAdmins.map((admin) => admin._id == unSuspendData._id ? unSuspendData : admin))
    }
  }, [unSuspendData])

  useEffect(() => {
    setError(suspendError || unSuspendError)
  }, [suspendError, unSuspendError])

  function addOperator() {
    addOperatorsRef.current?.open()
  }

  function onChangeText(event: ChangeEvent<HTMLInputElement>) {
    setSearchWord(event.target.value)
  }

  const operatorData = useMemo(() => {
    const word = searchWord.toLowerCase()
    if (word.trim().length == 0) {
      return operators
    }
    return operators.filter((item) => item.firstName.toLowerCase().includes(word) || item.lastName.toLowerCase().includes(word) || item.email.toLowerCase().includes(word))
  }, [searchWord, JSON.stringify(operators)])


  function onSuspendAdmin(operator: Operator) {
    confirmationDialogRef.current?.show({
      data: {
        title: "Are you sure you want to suspend this operator?",
        description: "They won't have access to the app once it is complete"
      },
      onConfirm: () => {
        confirmationDialogRef.current?.dismiss()
        suspendOperator({ userId: operator._id })
      },
      onCancel: () => {
        confirmationDialogRef.current?.dismiss()
      }
    })
  }

  function onUnSuspendOperator(operator: Operator) {
    confirmationDialogRef.current?.show({
      data: {
        title: "Are you sure you want to unsuspend this operator?",
        description: "They will have access to the dashboard once it is complete"
      },
      onConfirm: () => {
        confirmationDialogRef.current?.dismiss()
        unSuspendOperator({ userId: operator._id })
      },
      onCancel: () => {
        confirmationDialogRef.current?.dismiss()
      }
    })
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col py-8">
        <SEO title="Laswa | Operators" />
        <AddOperatorsModal ref={addOperatorsRef} />
        <ConfirmationAlertDialog ref={confirmationDialogRef} />
        <LoadingModal isVisible={isLoading} />

        <div className="flex flex-col gap-6">
          <h1 className="text-2xl font-bold">Operators <span className="text-primary">({operatorData.length})</span></h1>

          <div className="flex flex-col items-start p-4 bg-white gap-4 md:flex-row md:items-center">
            <TextField.Container className="flex-1 border border-gray-200">
              <TextField.Input onChange={onChangeText} placeholder="Search" />

              <IconButton className="text-gray-200">
                <SearchIcon />
              </IconButton>
            </TextField.Container>

            <div onClick={addOperator} className="border cursor-pointer rounded-md py-2 px-2 pr-3">
              <div className="flex items-center gap-2 text-sm text-text-normal font-semibold">
                <PlusIcon className="text-gray-300" />
                <p>Add Operators</p>
              </div>
            </div>

            <div className="border rounded-md py-2">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="flex items-center gap-3 text-sm text-text-normal font-semibold">
                    <p>Filter</p>
                    <ChevronDown className="text-gray-300" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Suspend Admin</DropdownMenuLabel>
                  <DropdownMenuItem>Action 2</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div>
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
                  <TableHead></TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>

              {operatorData.map((item) => <TableBody key={item._id} className="bg-white">
                <TableRow>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <CheckBox />
                    </div>
                  </TableCell>
                  <TableCell>
                    {item.firstName}
                  </TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>
                    {item.lastName}
                  </TableCell>
                  <TableCell>Lorem</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <div className="flex">
                          <IconButton className="text-primary border border-primary rounded-sm">
                            <MoreHorizontalIcon />
                          </IconButton>
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => onSuspendAdmin(item)}>Suspend Operator</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onUnSuspendOperator(item)}>Unsuspend Operator</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>

              </TableBody>)}
            </Table>
            {isFetchLoading ? <Loading className="h-[400px]" /> : isFetchError ? <Error onRetry={fetchOperators} className="h-[400px]" /> : null}
          </div>
        </div>


        <div>

        </div>
      </div>
    </DashboardLayout>
  )
}
