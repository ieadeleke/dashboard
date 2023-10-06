type AuthLayoutProps = {
    children?: JSX.Element
}

export default function AuthLayout(props: AuthLayoutProps) {


    return <div className="relative max-w-[1440px] bg-r flex mx-auto">
    
        <div className="px-3 w-full relative md:px-8">
            {props.children}

        </div>
    </div>
}