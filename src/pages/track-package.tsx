import DashboardLayout from "@/components/layout/dashboard";
import { TrackPackageHeader } from "@/components/page_components/track-package/TrackPackageHeader";

export default function TrackPackage() {
    return (
      <DashboardLayout>
        <div className="flex flex-col px-3">
          <TrackPackageHeader />
        </div>
      </DashboardLayout>
    );
  }
  