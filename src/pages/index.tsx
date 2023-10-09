import DashboardLayout from "@/components/layout/dashboard";
import { Activities } from "@/components/dashboard/Activities";
import { Fleets } from "@/components/dashboard/fleet/Fleets";
import { LifeTracking } from "@/components/dashboard/LifeTracking";
import { Stats } from "@/components/dashboard/stats/Stats";
import { IncidentAlertDialog, IncidentAlertDialogRef } from "@/components/dialogs/AlertDialog";
import { useEffect, useRef } from "react";
import SEO from "@/components/SEO";

export default function Home() {
  const alertRef = useRef<IncidentAlertDialogRef>(null)

  function showAlertDialog() {
    alertRef.current?.show({
      variant: "regular",
      data: {
        title: "Are you sure you want to approve this incident on [Fleet Name]",
        description: "",
      },
      onConfirm: () => {
        alertRef.current?.dismiss()
      },
      onCancel: () => {
        alertRef.current?.dismiss()
      }
    })
  }

  useEffect(() => {
    setTimeout(() => {
      showAlertDialog()
    }, 1000)
  }, [])

  return (
    <DashboardLayout>
      <div className="flex flex-col py-8 gap-8">
        <SEO title="Laswa | Home" />
        <Stats />
        <Activities />
        <LifeTracking />
        <Fleets />
        <IncidentAlertDialog ref={alertRef} />
      </div>
    </DashboardLayout>
  )
}
