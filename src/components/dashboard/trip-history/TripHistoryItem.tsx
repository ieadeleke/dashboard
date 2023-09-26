import DiscIcon from '@/assets/icons/ic_history_disc.svg'
import { StatusChip } from '@/components/chips/StatusChip'
import { Divider } from '@/components/Divider'
import { useMemo } from 'react'

type TripHistoryProps = {
    status: "active" | "complete" | "canceled"
}

export const TripHistoryItem = (props: TripHistoryProps) => {
    const { status } = props

    const statusStyles = useMemo(() => {
        switch (status) {
            case "complete":
                return {
                    container: 'bg-blue-100',
                    label: 'text-blue-800'
                }
            case "canceled":
                return {
                    container: 'bg-red-100',
                    label: 'text-red-800'
                }
            default:
                return {
                    container: 'bg-yellow-100',
                    label: 'text-yellow-800'
                }
        }
    }, [status])

    return <div className="flex flex-col rounded-xl border bg-white px-6 py-6">

        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-8">
                <div className="flex items-center gap-4">
                    <DiscIcon className="w-7 h-7 text-text-normal" />
                    <p>1397  Walnut Street, Jackson</p>
                </div>

                <div className="flex items-center gap-4">
                    <DiscIcon className="w-7 h-7 text-primary" />
                    <p>345 Hardesty Street, 368972</p>
                </div>
            </div>

            <Divider className="bg-gray-200" />

            <div className="flex items-center">
                <p>Ship ID</p>
                <div className="flex-1" />
                <StatusChip.Container className={statusStyles.container}>
                    <StatusChip.Label className={statusStyles.label}>
                        Active
                    </StatusChip.Label>
                </StatusChip.Container>
            </div>
        </div>
    </div>
}