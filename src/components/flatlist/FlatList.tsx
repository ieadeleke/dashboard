import { cn } from "@/lib/utils"
import { HTMLAttributes } from "react"

export type FlatListProps<T> = HTMLAttributes<HTMLDivElement> & {
    data: T[],
    renderItem: (item: T, index: number) => JSX.Element,
    ListFooterComponent?: JSX.Element | null,
    ListHeaderComponent?: JSX.Element | null
}

export const FlatList = <T,>(p: FlatListProps<T>) => {
    const { data, renderItem, className, ListFooterComponent, ListHeaderComponent, ...props } = p

    return <div className={cn("bg-red-500", className)} {...props}>
        {ListHeaderComponent}
        {data.map((item, index) => renderItem(item, index))}
        {ListFooterComponent}
    </div>
}