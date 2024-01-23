
type LayoutProps = {
    children?: JSX.Element
}

export function Layout(props: LayoutProps) {
    return <div className="relative max-w-[2000px] flex flex-col mx-auto">
        {props.children}
    </div>
}