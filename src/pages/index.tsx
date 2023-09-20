import DashboardLayout from "@/components/layout/dashboard";
import { Activities } from "@/components/layout/dashboard/components/Activities";
import { Fleets } from "@/components/layout/dashboard/components/fleet/Fleets";
import { LifeTracking } from "@/components/layout/dashboard/components/LifeTracking";
import { Stats } from "@/components/layout/dashboard/components/Stats";

export default function Home() {
  return (
    <DashboardLayout>
      <div className="flex flex-col py-8 gap-8">
        <Stats />
        <Activities />
        <LifeTracking />
        <Fleets />
      </div>
    </DashboardLayout>
  )
}
