"use client";
import Button from "@/components/buttons";
import { ChevronDown, PlusIcon } from "lucide-react";
import { AdminItem } from "@/components/admins/AdminItem";
import { AdminInfo, AdminInfoRef } from "@/components/admins/AdminInfo";
import { CreateRole } from "@/components/admins/CreateRole";
import { AssignRole } from "@/components/admins/AssignRole";
import { AddAdmin, AddAdminRef } from "@/components/admins/AddAdmin";
import { useContext, useEffect, useRef, useState } from "react";
import { useGetAdmins } from "@/utils/apiHooks/admin/useGetAdmins";
import { Admin } from "@/models/profile";
import { TablePagination } from "@/components/pagination/TablePagination";
import { useSuspendAdmin } from "@/utils/apiHooks/admin/useSuspendAdmin";
import { useUnSuspendAdmin } from "@/utils/apiHooks/admin/useUnsuspendAdmin";
import {
  ConfirmationDialog,
  ConfirmationDialogRef,
} from "@/components/ConfirmationDialog";
import { GlobalActionContext } from "@/context/GlobalActionContext";
import { LoadingModal } from "@/components/states/LoadingModal";
import Loading from "@/components/states/Loading";
import Error from "@/components/states/Error";
import DashboardLayout from "@/components/layout/dashboard";

const AddAdminItem = (props: { onClick: () => void }) => {
  return (
    <div
      onClick={props.onClick}
      className="flex flex-col px-4 py-8 bg-gray-100 rounded-md justify-center items-center cursor-pointer"
    >
      <PlusIcon className="w-8 h-8" />
      <p className="mt-3">Add New Admin</p>
    </div>
  );
};

export default function Admins() {
  const { isLoading, error, data, count, getAdmins } = useGetAdmins();
  const [admins, setAdmins] = useState<Admin[]>([]);
  const adminInfoRef = useRef<AdminInfoRef>(null);
  const [page, setPage] = useState(0);
  const {
    suspendAdmin,
    data: suspendedUser,
    isLoading: isSuspendingUser,
    error: suspendError,
  } = useSuspendAdmin();
  const {
    unSuspendAdmin,
    data: unSuspendedUser,
    isLoading: isUnSuspendingUser,
    error: unSuspendError,
  } = useUnSuspendAdmin();
  const { showSnackBar } = useContext(GlobalActionContext);
  const confirmationDialogRef = useRef<ConfirmationDialogRef>(null);

  useEffect(() => {
    setAdmins(data);
  }, [data.length]);

  function fetchData() {
    getAdmins({
      page: page + 1,
    });
  }

  useEffect(() => {
    fetchData();
  }, [page]);

  function onPageChange(selectedItem: { selected: number }) {
    setPage(selectedItem.selected);
  }

  const addAdminRef = useRef<AddAdminRef>(null);

  function handleAddAdmin() {
    addAdminRef.current?.open();
  }

  function onMorePressed(admin: Admin) {
    adminInfoRef.current?.open({
      data: admin,
    });
  }

  useEffect(() => {
    if (suspendError) {
      showSnackBar({
        severity: "error",
        message: suspendError,
      });
    }
  }, [suspendError]);

  useEffect(() => {
    if (unSuspendError) {
      showSnackBar({
        severity: "error",
        message: unSuspendError,
      });
    }
  }, [unSuspendError]);

  useEffect(() => {
    if (suspendedUser) {
      showSnackBar({
        severity: "success",
        message: "Admin has been suspended",
      });
      setAdmins((admins) =>
        admins.map((admin) =>
          admin._id === suspendedUser._id
            ? {
                ...admin,
                isActive: false,
              }
            : admin
        )
      );
    }
  }, [suspendedUser]);

  useEffect(() => {
    if (unSuspendedUser) {
      showSnackBar({
        severity: "success",
        message: "Admin has been unsuspended",
      });
      setAdmins((admins) =>
        admins.map((admin) =>
          admin._id === unSuspendedUser._id
            ? {
                ...admin,
                isActive: true,
              }
            : admin
        )
      );
    }
  }, [unSuspendedUser]);

  function handleViewAdmin(admin: Admin) {
    adminInfoRef.current?.open({
      data: admin,
    });
  }

  function handleSuspendAdmin(admin: Admin) {
    confirmationDialogRef.current?.showConfirmationDialog({
      data: {
        title: "Are you sure you want to suspend this admin?",
        description: "Their profile would become inactive after this",
      },
      onConfirm() {
        confirmationDialogRef.current?.closeConfirmationDialog();
        suspendAdmin({
          userId: admin._id,
        });
      },
      onCancel() {
        confirmationDialogRef.current?.closeConfirmationDialog();
      },
    });
  }

  function handleUnSuspendAdmin(admin: Admin) {
    confirmationDialogRef.current?.showConfirmationDialog({
      data: {
        title: "Are you sure you want to unsuspend this admin?",
        description: "Their profile would become active again after this",
      },
      onConfirm() {
        confirmationDialogRef.current?.closeConfirmationDialog();
        unSuspendAdmin({
          userId: admin._id,
        });
      },
      onCancel() {
        confirmationDialogRef.current?.closeConfirmationDialog();
      },
    });
  }

  return (
    <DashboardLayout>
      <main className="flex min-h-screen flex-col px-8 pt-8">
        <AdminInfo ref={adminInfoRef} />
        <ConfirmationDialog ref={confirmationDialogRef} />
        <CreateRole />
        <LoadingModal isVisible={isUnSuspendingUser || isSuspendingUser} />
        <AddAdmin ref={addAdminRef} />
        <AssignRole />
        <div className="flex items-center">
          <h1 className="font-semibold text-xl">Admins</h1>
          <div className="flex-1" />
        </div>

        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-2 lg:grid-cols-4">
            <AddAdminItem onClick={handleAddAdmin} />
            {admins.map((admin) => (
              <AdminItem
                data={admin}
                viewAdmin={handleViewAdmin}
                suspendAdmin={handleSuspendAdmin}
                unSuspendAdmin={handleUnSuspendAdmin}
                key={admin._id}
              />
            ))}
          </div>

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

          {isLoading ? (
            <Loading />
          ) : (
            error && <Error onRetry={fetchData} message={error} />
          )}
        </div>
      </main>
    </DashboardLayout>
  );
}
