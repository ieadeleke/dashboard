import DashboardLayout from "@/components/layout/dashboard";
import { ConnectRider } from "@/components/page_components/dashboard/send-package/ConnectRider";
import { DeliverySummary } from "@/components/page_components/dashboard/send-package/DeliverySummary";
import PackageDetailsForm from "@/components/page_components/dashboard/send-package/PackageDetailsForm";
import { useState } from "react";

export default function SendPackage() {
  const [page, setPage] = useState<"default" | "summary" | "rider">("default");

  function showDeliverySummary() {
    setPage("summary")
  }

  function connectToRider() {
    setPage("rider")
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col px-3">
        {page == "rider" ? (
          <ConnectRider />
        ) : page == "summary" ? (
          <DeliverySummary showRider={connectToRider} />
        ) : (
          <PackageDetailsForm showSummary={showDeliverySummary} />
        )}
      </div>
    </DashboardLayout>
  );
}
