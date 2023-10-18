import { cn } from "@/lib/utils"
import { HTMLAttributes, useMemo } from "react"
import Error from "../states/Error"
import Loading from "../states/Loading"
import { FlatList, FlatListProps } from "./FlatList"

type DefaultFlatListProps<T> = FlatListProps<T> & {
    isLoading?: boolean,
    error?: string | null,
    containerProps?: HTMLAttributes<HTMLDivElement>
}

export const DefaultFlatListImpl = <T,>(p: DefaultFlatListProps<T>) => {
    const { renderItem, isLoading, error, data, className, containerProps: cProps, ...props } = p

    const { className: containerClassName, ...containerProps } = cProps || {}

    const FooterComponent = useMemo(() => {
        if (isLoading) {
            return <div className="h-[200px]">
                <Loading />
            </div>
        } else if (error) {
            return <div className="h-[200px]">
                <Error message={error} />
            </div>
        } else return null
    }, [isLoading, error])

    return <div className={cn("", containerClassName)} {...containerProps}>
        <FlatList data={data} renderItem={renderItem} className={className} ListFooterComponent={FooterComponent} {...props} />
    </div>
}