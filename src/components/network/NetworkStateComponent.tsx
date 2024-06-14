import { useMeasure } from 'react-use'
import { useEffect, useState } from "react";
import styles from './styles/networkStateComponent.module.css'
import Loading from './Loading';
import Error from './Error';
import Empty from './Empty';
import Button from '../buttons';

type NetworkStateComponentProps = {
    children?: React.ReactNode,
    isLoading: boolean,
    isEmpty?: boolean,
    error: string | null | undefined,
    hasMore?: boolean,
    emptyProps?: {
        title: string,
        message: string
    },
    fetchMore?: () => void,
    containerPadding?: number,
    boxSpacing?: number
}

export default function NetworkStateComponent(props: NetworkStateComponentProps) {
    const { isEmpty, isLoading, error, hasMore, fetchMore } = props
    const [containerWidth, setContainerWidth] = useState(0)
    const [ref, { width }] = useMeasure<HTMLDivElement>()
    const targetRowHeight = {
        targetRowHeight: containerWidth < 800 ? 250 : 320
    }


    useEffect(() => {
        setContainerWidth(width)
    }, [width])

    function LoadingBtnComponent() {
        return (!isLoading && !error) &&
            <div className={styles.loadMoreContainer}>
                <Button onClick={fetchMore}>Load More</Button>
            </div>
    }

    function NetworkStateComponent() {
        return isLoading ? <Loading /> : error ? <Error onRetry={fetchMore} /> :
            null
    }

    function EmptyComponent() {
        return (!isLoading && !error && isEmpty) && <Empty title={props.emptyProps && props.emptyProps.title || "Nothing to show"} message={props.emptyProps && props.emptyProps.message || "Could not find any data to render"} />
    }


    return <div>
        {props.children}
        {EmptyComponent()}
        {NetworkStateComponent()}
        {hasMore && LoadingBtnComponent()}
    </div>
}
