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
import { useEffect, useRef, useState } from "react";
import { AdminItem } from "@/components/dashboard/admins/AdminItem";
import { AddAdminsModal, AddAdminsModalRef } from "@/components/dashboard/admins/AddAdminModal";
import Button from "@/components/buttons";
import { CreateRoleModal, CreateRoleModalRef } from "@/components/dashboard/admins/CreateRoleModal";
import { Admin, getAdminData } from "@/utils/data/admins";
import SEO from "@/components/SEO";
import { useFetchAdmins } from "@/utils/apiHooks/admins/useFetchAdmins";
import Loading from "@/components/states/Loading";
import Error from "@/components/states/Error";

export default function AdminsPage() {
  const { isLoading, error, data, fetchAdmins } = useFetchAdmins()
  const addAdminsRef = useRef<AddAdminsModalRef>(null)
  const addRoleRef = useRef<CreateRoleModalRef>(null)

  function addAdmin() {
    addAdminsRef.current?.open()
  }

  function addRole() {
    addRoleRef.current?.open()
  }

  useEffect(() => {
    fetchAdmins()
  }, [])

  return (
    <DashboardLayout>
      <div className="flex flex-col py-8">
        <SEO title="Laswa | Admin" />

        <AddAdminsModal ref={addAdminsRef} />
        <CreateRoleModal ref={addRoleRef} />

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
              {data.map((item) => <AdminItem key={item._id} data={item} />)}
            </div>
          </div>
          {isLoading ? <Loading /> : error ? <Error /> : null}
        </div>

      </div>
    </DashboardLayout>
  )
}
