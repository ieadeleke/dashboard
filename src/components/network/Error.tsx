'use client'

import Button from '../buttons';
import styles from './styles/error.module.css'
import { useRouter } from "next/navigation";

type ErrorProps = {
    message?: string,
    onRetry?: () => void
}

export default function Error(props: ErrorProps) {
    const router = useRouter()

    function handleRetry() {
        if (props.onRetry) {
            props.onRetry()
        } else router.refresh()
    }
    return <div className={styles.container}>
        <p className={"text-xl font-medium"}>
            Oops!
        </p>
        <p className="text-base text-mountain-gray-400">
            {props.message || `Something went wrong!`}
        </p>
        <Button className='h-9 rounded-full px-7 mt-4' onClick={handleRetry}>Try Again</Button>
    </div>
}