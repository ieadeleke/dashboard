import { StatusChip } from "@/components/chips/StatusChip"
import { FleetStatus } from "@/models/fleets"
import { parseFleetStatus } from "@/utils/data/fleets"
import { useMemo } from "react"

type FleetStatusChipProps = {
    status: FleetStatus
}

export const FleetStatusChip = (props: FleetStatusChipProps) => {
    const { status } = props

    const statusStyles = useMemo(() => {
        switch (status) {
            case "active":
                return {
                    container: 'bg-pattens-blue-100',
                    label: 'text-pattens-blue-950'
                }
            case "suspended":
                return {
                    container: 'bg-we-peep-200',
                    label: 'text-we-peep-900'
                }
            default:
                return {
                    container: 'bg-barley-white-100',
                    label: 'text-barley-white-900'
                }
        }
    }, [status])

    const statusText = useMemo(() => {
        return parseFleetStatus(status)
    }, [status])

    return <StatusChip.Container className={statusStyles.container}>
        <StatusChip.Label className={statusStyles.label}>
            {statusText}
        </StatusChip.Label>
    </StatusChip.Container>
}