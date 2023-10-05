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
import { useRef } from "react";
import { AdminItem } from "@/components/admins/AdminItem";
import { AddAdminsModal, AddAdminsModalRef } from "@/components/admins/AddAdminModal";

export default function AdminsPage() {
  const addAdminsRef = useRef<AddAdminsModalRef>(null)

  function addAdmin() {
    addAdminsRef.current?.open()
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col py-8">

        <AddAdminsModal ref={addAdminsRef} />

        <div className="flex flex-col gap-6">
          <h1 className="text-2xl font-bold">Admins <span className="text-primary">(5)</span></h1>

          <div className="flex flex-col items-start p-4 bg-white gap-4 md:flex-row md:items-center">
            <TextField.Container className="flex-1 border border-gray-200">
              <TextField.Input placeholder="Search" />

              <IconButton className="text-gray-200">
                <SearchIcon />
              </IconButton>
            </TextField.Container>

            <div onClick={addAdmin} className="border cursor-pointer rounded-md py-2 px-2 pr-3">
              <div className="flex items-center gap-2 text-sm text-text-normal font-semibold">
                <PlusIcon className="text-gray-300" />
                <p>Add New Admin</p>
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
              <AdminItem />
              <AdminItem />
              <AdminItem />
              <AdminItem />
              <AdminItem />
              <AdminItem />
              <AdminItem />
              <AdminItem />
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  )
}
