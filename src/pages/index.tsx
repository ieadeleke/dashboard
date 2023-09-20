import DashboardLayout from "@/components/layout/dashboard";
import { Activities } from "@/components/dashboard/Activities";
import { Fleets } from "@/components/dashboard/fleet/Fleets";
import { LifeTracking } from "@/components/dashboard/LifeTracking";
import { Stats } from "@/components/dashboard/stats/Stats";

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
