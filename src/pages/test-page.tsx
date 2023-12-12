import { AddIncidentWithVesselModal } from '@/components/dashboard/incidents/AddIncidentWithVesselModal'
import DashboardLayout from '@/components/layout/dashboard/index'

export default function TestPage() {
    return <DashboardLayout>
        <div>
            <AddIncidentWithVesselModal />
        </div>
    </DashboardLayout>
}