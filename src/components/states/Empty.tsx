

type EmptyProps = {
    title: string,
    message: string
}

export default function Empty(props: EmptyProps) {
    return <div className={"flex flex-col justify-center items-center h-full gap-2"}>
        <p className={"text-xl font-medium"}>
            {props.title}
        </p>
        <p className="text-base text-gray">
            {props.message}
        </p>
    </div>
}