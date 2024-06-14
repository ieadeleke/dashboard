"use client";
import Button from "@/components/buttons";
import { ChevronDown, PlusIcon } from "lucide-react";
import { RoleItem } from "@/components/roles/RoleItem";
import { CreateRole, CreateRoleRef } from "@/components/admins/CreateRole";
import { useEffect, useRef, useState } from "react";
import { useGetRoles } from "@/utils/apiHooks/admin/useGetRoles";
import NetworkStateComponent from "@/components/network/NetworkStateComponent";
import { Role } from "@/models/profile";
import DashboardLayout from "@/components/layout/dashboard";

const AddRoleItem = (props: { onClick?: () => void }) => {
  return <div onClick={props.onClick} className="flex flex-col px-4 py-8 bg-gray-100 rounded-md justify-center items-center cursor-pointer">
    <PlusIcon className="w-8 h-8" />
    <p className="mt-3">Add New Role</p>
  </div>
}

export default function Roles() {
  const createRoleRef = useRef<CreateRoleRef>(null)
  const [roles, setRoles] = useState<Role[]>([])
  const { isLoading, error, data, getRoles } = useGetRoles()

  function openCreateRole() {
    createRoleRef.current?.open()
  }

  useEffect(() => {
    getRoles()
  }, [])

  useEffect(() => {
    setRoles(data)
  }, [data.length])

  const onNewRoleCreated = (role: Role) => {
    setRoles((roles) => [role, ...roles])
  }

  const onRoleUpdated = (role: Role) => {
    setRoles((roles) => roles.map((item) => {
      if (item._id === role._id) {
        return role
      } else return item
    }))
  }

  const handleOnEditRole = (role: Role) => {
    createRoleRef.current?.open({
      data: role
    })
  }

  return (
    <DashboardLayout>
      <main className="flex min-h-screen flex-col px-8 pt-8">
        <CreateRole ref={createRoleRef} onNewRoleCreated={onNewRoleCreated} onRoleUpdated={onRoleUpdated} />

        <NetworkStateComponent isLoading={isLoading} error={error} fetchMore={getRoles}>
          <div className="flex flex-col">
            <div className="flex items-center">
              <h1 className="font-semibold text-xl">Roles</h1>
              <div className="flex-1" />

            </div>

            <div className="flex flex-col gap-8">
              <div className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-4">
                <AddRoleItem onClick={openCreateRole} />
                {roles.map((role) => <RoleItem key={role._id} onEditRole={handleOnEditRole} data={role} />)}
              </div>
            </div>
          </div>
        </NetworkStateComponent>
      </main>
    </DashboardLayout>
  );
}
