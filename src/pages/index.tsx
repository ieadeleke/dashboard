import DashboardLayout from "@/components/layout/dashboard";
import { Activities } from "@/components/dashboard/Activities";
import { Fleets } from "@/components/dashboard/fleet/Fleets";
import { LifeTracking } from "@/components/dashboard/LifeTracking";
import { Stats } from "@/components/dashboard/stats/Stats";
import SEO from "@/components/SEO";

export default function Home() {

  return (
    <DashboardLayout>
      <div className="flex flex-col py-8 gap-8">
        <SEO title="Laswa | Home" />
        <Stats />
        <Activities />
        <LifeTracking />
        <Fleets />
      </div>
    </DashboardLayout>
  )
}
