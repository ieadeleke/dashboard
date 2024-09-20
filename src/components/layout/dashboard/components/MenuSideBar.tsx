import DashboardIcon from "@/assets/icons/ic_compass.svg";
import AgencyIcon from "@/assets/icons/ic_agency.svg";
import TransactionIcon from "@/assets/icons/ic_transactions.svg";
import LogOutIcon from "@/assets/icons/ic_logout.svg";
import MenuIcon from "@/assets/icons/ic_main.svg";
import { ListItem } from "./ListItem";
import Link from "next/link";
import { Divider } from "@/components/Divider";
import {
  ConfirmationAlertDialog,
  ConfirmationAlertDialogRef,
} from "@/components/dialogs/ConfirmationAlertDialog";
import { useRef } from "react";
import { RecycleIcon, SearchIcon, Settings2Icon, UserIcon, UserSquareIcon, SquareGantt } from "lucide-react";
import { logOut } from "@/utils/auth/logout";

export const MenuSideBar = () => {
  const confirmationDialogRef = useRef<ConfirmationAlertDialogRef>(null);

  function handleLogout() {
    confirmationDialogRef.current?.show({
      data: {
        title: "Are you sure you want to logout?",
        description: "Your active session will be removed from this device",
        label: {
          confirm: "Yes",
          cancel: "No",
        },
      },
      onCancel: () => {
        confirmationDialogRef.current?.dismiss();
      },
      onConfirm: () => {
        confirmationDialogRef.current?.dismiss();
        logOut();
        location.href = "/login";
      },
    });
  }

  return (
    <div className="w-full h-full flex flex-col gap-8 items-center bg-white overflow-y-scroll no-scrollbar px-0 py-6 lg:px-2 lg:items-start">
      <ConfirmationAlertDialog ref={confirmationDialogRef} />
      <Link className="mx-auto flex items-center gap-8" href="/" passHref>
        <MenuIcon className="text-primary" />
        <h1 className="font-bold">Pay4It</h1>
      </Link>

      <div className="flex flex-col gap-5 mt-4 lg:w-full">
        <ListItem
          isActive
          startIcon={<DashboardIcon />}
          name="Dashboard"
          href="/"
        />
        {/* <ListItem startIcon={<AgentsIcon />} name="Agents" href="/agents" /> */}
        <ListItem startIcon={<AgencyIcon />} name="Agency" href="/agency" />
        <ListItem
          startIcon={<SearchIcon />}
          name="Payment Reference"
          href="/web-transactions"
        />
        <ListItem
          startIcon={<RecycleIcon />}
          name="Settlement Accounts"
          href="/settlement-accounts"
        />
        <ListItem
          startIcon={<TransactionIcon />}
          name="Transactions"
          href="/transactions"
        />

        <ListItem startIcon={<UserIcon />} name="Admins" href="/admins" />
        <ListItem startIcon={<SquareGantt />} name="MDA" href="/mda" />
        <ListItem startIcon={<UserSquareIcon />} name="Agents" href="/agents" />
        <ListItem startIcon={<Settings2Icon />} name="Roles" href="/roles" />
        <Divider />
        <div
          onClick={handleLogout}
          className={`flex cursor-pointer rounded-md items-center gap-4 px-3 py-3 hover:bg-primary-20`}
        >
          <LogOutIcon />
          <p className={`hidden text-sm lg:block`}>Log Out</p>
        </div>
      </div>
    </div>
  );
};
