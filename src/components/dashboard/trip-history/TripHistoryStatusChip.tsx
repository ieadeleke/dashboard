import { StatusChip } from "@/components/chips/StatusChip"
import { parseTripStatus, TripStatus } from "@/utils/data/trip"
import { useMemo } from "react"

type TripHistoryStatusChipProps = {
    status: TripStatus
}

export const TripHistoryStatusChip = (props: TripHistoryStatusChipProps) => {
    const { status } = props

    const statusStyles = useMemo(() => {
        switch (status) {
            case "complete":
                return {
                    container: 'bg-pattens-blue-100',
                    label: 'text-pattens-blue-950'
                }
            case "canceled":
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
        return parseTripStatus(status)
    }, [status])

    return <StatusChip.Container className={statusStyles.container}>
        <StatusChip.Label className={statusStyles.label}>
            {statusText}
        </StatusChip.Label>
    </StatusChip.Container>
}