import { useRouter } from "next/router";
import Button from "../buttons";

type ErrorProps = {
    message?: string,
    onRetry?: () => void
}

export default function Error(props: ErrorProps) {
    const router = useRouter()

    function handleRetry() {
        props.onRetry?.()
    }
    return <div className="w-full h-full flex flex-col justify-center items-center gap-4">
        <div className="flex flex-col gap-0 text-center">
            <p className={"text-xl font-medium"}>
                Oops!
            </p>
            <p className="text-base text-gray">
                {props.message || `Something went wrong!`}
            </p>
        </div>
        <Button variant="contained" className="rounded-full h-8" onClick={handleRetry}>Try Again</Button>
    </div>
}