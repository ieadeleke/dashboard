import Button from "@/components/buttons";
import DashboardLayout from "@/components/layout/dashboard";
import { DefaultMap } from "@/components/map/DefaultMap";
import { PackageStatus } from "@/components/page_components/track-package/PackageStatus";
import { RecentActivity } from "@/components/page_components/track-package/RecentActivity";
import { TrackPackageHeader } from "@/components/page_components/track-package/TrackPackageHeader";
import { OrderHistory } from "@/components/page_components/track-package/order-history";
import { useState } from "react";

const Track = () => {
  const [status, setStatus] = useState<"pending" | "started">("pending");

  return (
    <div className="flex flex-col px-3 gap-8">
      <TrackPackageHeader />
      <div className="flex flex-col gap-2">
        <p className="font-medium">Current Delivery</p>
        <DefaultMap className="h-[300px]" />
      </div>

      {status != "pending" ? (
        <RecentActivity />
      ) : (
        <div className="flex flex-col gap-8">
          <PackageStatus />
          <Button variant="contained">Confirm Delivery</Button>
        </div>
      )}
    </div>
  );
};

export default function TrackPackage() {
  return (
    <DashboardLayout>
      <div className="pb-8">
        {/* <Track /> */}
        <OrderHistory />
      </div>
    </DashboardLayout>
  );
}
