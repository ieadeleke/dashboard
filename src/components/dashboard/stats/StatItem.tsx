
type StatItemProps = {
    color: string,
    colorAccent: string,
    name: string,
    count: string,
    icon: () => React.ReactNode
}

export const StatItem = (props: StatItemProps) => {
    const Icon = props.icon as any

    return <div className="flex bg-white rounded-md items-center justify-between">

        <div className={`flex flex-1 gap-4 items-center p-4`}>
            <div className="flex flex-1 flex-col gap-8 text-base font-semibold">
                <p style={{
                    color: props.color
                }}>{props.name}</p>

                <p style={{
                    color: props.color
                }} className="text-xl">{props.count}</p>
            </div>

            <div style={{
                backgroundColor: props.colorAccent
            }} className={`p-4 rounded-full`}>
                <Icon style={{
                    color: props.color
                }} />
            </div>
        </div>
    </div>
}