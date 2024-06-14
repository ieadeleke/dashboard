import styles from './styles/empty.module.css'
import { useRouter } from "next/navigation";

type EmptyProps = {
    title: string,
    message: string
}

export default function Empty(props: EmptyProps) {
    const router = useRouter()

    function refreshPage() {
        router.refresh()
    }

    return <div className={styles.container}>
        <p className={"text-xl font-medium"}>
            {props.title}
        </p>
        <p className="text-base text-mountain-mist-400">
            {props.message}
        </p>
    </div>
}