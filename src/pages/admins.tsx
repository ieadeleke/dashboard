import { IconButton } from "@/components/buttons/IconButton";
import { TextField } from "@/components/input/InputText";
import DashboardLayout from "@/components/layout/dashboard";
import { ChevronDown, PlusIcon, SearchIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useContext, useEffect, useRef, useState } from "react";
import { AdminItem } from "@/components/dashboard/admins/AdminItem";
import { AddAdminsModal, AddAdminsModalRef } from "@/components/dashboard/admins/AddAdminModal";
import Button from "@/components/buttons";
import { CreateRoleModal, CreateRoleModalRef } from "@/components/dashboard/admins/CreateRoleModal";
import SEO from "@/components/SEO";
import { useFetchAdmins } from "@/utils/apiHooks/admins/useFetchAdmins";
import Loading from "@/components/states/Loading";
import Error from "@/components/states/Error";
import { ConfirmationAlertDialog, ConfirmationAlertDialogRef } from "@/components/dialogs/ConfirmationAlertDialog";
import { Admin } from "@/models/admins";
import { useSuspendAdmin } from "@/utils/apiHooks/admins/useSuspendAdmins";
import { useUnSuspendAdmin } from "@/utils/apiHooks/admins/useUnSuspendAdmin";
import { GlobalActionContext } from "@/context/GlobalActionContext";
import { LoadingModal } from "@/components/states/LoadingModal";
import { TablePagination } from "@/components/pagination/TablePagination";

export default function AdminsPage() {
  const { isLoading: isFetchLoading, count, error: isFetchError, data, fetchAdmins } = useFetchAdmins()
  const [page, setPage] = useState(0)
  const addAdminsRef = useRef<AddAdminsModalRef>(null)
  const addRoleRef = useRef<CreateRoleModalRef>(null)
  const confirmationDialogRef = useRef<ConfirmationAlertDialogRef>(null)
  const { isLoading: isSuspendLoading, error: suspendError, data: suspendData, suspendAdmin } = useSuspendAdmin()
  const { isLoading: isUnSuspendLoading, error: unSuspendError, data: unSuspendData, unSuspendAdmin } = useUnSuspendAdmin()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { showSnackBar } = useContext(GlobalActionContext)
  const [admins, setAdmins] = useState<Admin[]>([])

  useEffect(() => {
    if (error) {
      showSnackBar({ severity: 'error', message: error })
    }
  }, [error])

  useEffect(() => {
    setAdmins([...data])
  }, [JSON.stringify(data)])

  useEffect(() => {
    setIsLoading(isUnSuspendLoading || isSuspendLoading)
  }, [isUnSuspendLoading, isSuspendLoading])

  useEffect(() => {
    setError(suspendError || unSuspendError)
  }, [suspendError, unSuspendError])

  useEffect(() => {
    if (suspendData) {
      showSnackBar({ severity: 'success', message: `${suspendData.personalInfo.firstName} ${suspendData.personalInfo.lastName} has been suspended` })
      setAdmins((prevAdmins) => prevAdmins.map((admin) => admin._id == suspendData._id ? suspendData : admin))
    }
  }, [suspendData])

  useEffect(() => {
    if (unSuspendData) {
      showSnackBar({ severity: 'success', message: `${unSuspendData.personalInfo.firstName} ${unSuspendData.personalInfo.lastName} has been unsuspended` })
      setAdmins((prevAdmins) => prevAdmins.map((admin) => admin._id == unSuspendData._id ? unSuspendData : admin))
    }
  }, [unSuspendData])

  function addAdmin() {
    addAdminsRef.current?.open({
      onNewAdminAdded: () => {
        fetchAdmins()
        addAdminsRef.current?.close()
        showSnackBar({ severity: 'success', message: "New admin added succesfully" })
      }
    })
  }

  function addRole() {
    addRoleRef.current?.open()
  }

  function onSuspendAdmin(admin: Admin) {
    confirmationDialogRef.current?.show({
      data: {
        title: "Are you sure you want to suspend this admin?",
        description: "They won't have access to the admin dashboard once it is complete"
      },
      onConfirm: () => {
        confirmationDialogRef.current?.dismiss()
        suspendAdmin({ userId: admin._id })
      },
      onCancel: () => {
        confirmationDialogRef.current?.dismiss()
      }
    })
  }

  function onUnSuspendAdmin(admin: Admin) {
    confirmationDialogRef.current?.show({
      data: {
        title: "Are you sure you want to unsuspend this admin?",
        description: "They will have access to the admin dashboard once it is complete"
      },
      onConfirm: () => {
        confirmationDialogRef.current?.dismiss()
        unSuspendAdmin({ userId: admin._id })
      },
      onCancel: () => {
        confirmationDialogRef.current?.dismiss()
      }
    })
  }

  function onPageChange(selectedItem: {
    selected: number;
  }) {
    setPage(selectedItem.selected)
  }

  useEffect(() => {
    fetchAdmins({ page })
  }, [page])

  return (
    <DashboardLayout>
      <div className="flex flex-col py-8">
        <ConfirmationAlertDialog ref={confirmationDialogRef} />
        <SEO title="Laswa | Admin" />

        <AddAdminsModal ref={addAdminsRef} />
        <CreateRoleModal ref={addRoleRef} />
        <LoadingModal isVisible={isLoading} />

        <div className="flex flex-col gap-6">
          <h1 className="text-2xl font-bold">Admins <span className="text-primary">({data.length})</span></h1>

          <div className="flex flex-col items-start p-4 bg-white gap-4 md:flex-row md:items-center">

            <TextField.Container className="flex-1 border border-gray-200">
              <TextField.Input placeholder="Search" />

              <IconButton className="text-gray-200">
                <SearchIcon />
              </IconButton>
            </TextField.Container>

            <Button variant="contained" onClick={addRole}>
              Add New Roles
            </Button>

            <Button variant="contained" onClick={addAdmin}>
              Add New Admin
            </Button>

            <div className="border rounded-md py-2">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="flex items-center gap-3 text-sm text-text-normal font-semibold">
                    <p>Filter</p>
                    <ChevronDown className="text-gray-300" />
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
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {admins.map((item) => <AdminItem key={item._id} data={item} onSuspendAdmin={onSuspendAdmin} onUnSuspendAdmin={onUnSuspendAdmin} />)}
            </div>
          </div>
          {isFetchLoading ? <Loading /> : isFetchError ? <Error /> : null}
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
    </DashboardLayout>
  )
}
