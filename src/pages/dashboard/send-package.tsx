import DashboardLayout from "@/components/layout/dashboard";
import { ConnectRider } from "@/components/page_components/dashboard/send-package/ConnectRider";
import { DeliverySummary } from "@/components/page_components/dashboard/send-package/DeliverySummary";
import PackageDetailsForm from "@/components/page_components/dashboard/send-package/PackageDetailsForm";

export default function SendPackage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col px-3">
        {/* <PackageDetailsForm /> */}
        {/* <DeliverySummary /> */}
        <ConnectRider />
      </div>
    </DashboardLayout>
  );
}
