import Button from "@/components/buttons";
import DashboardLayout from "@/components/layout/dashboard";
import { DefaultMap } from "@/components/map/DefaultMap";
import { PackageStatus } from "@/components/page_components/track-package/PackageStatus";
import { RecentActivity } from "@/components/page_components/track-package/RecentActivity";
import { TrackPackageHeader } from "@/components/page_components/track-package/TrackPackageHeader";
import { useState } from "react";

export default function TrackPackage() {
  const [status, setStatus] = useState<"pending" | "started">("pending");
  return (
    <DashboardLayout>
      <div className="flex flex-col px-3 gap-8 pb-8">
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
    </DashboardLayout>
  );
}
