import { MenuSideBar } from "./components/MenuSideBar"
import { NavBar } from "./components/NavBar"
// import Footer from "../Footer"

type LayoutProps = {
    children?: JSX.Element,
    showSearchBar?: boolean,
    rightSideBar?: JSX.Element,
    showNavBar?: boolean
}

export default function DashboardLayout(props: LayoutProps) {


    return <div className="relative max-w-[1440px] bg-r flex mx-auto">
        <div className="hidden h-screen mx-auto sticky top-0 bottom-0 w-auto md:flex lg:w-[20%]">
            <div className="w-full min-h-screen bg-black py-8 px-2 overflow-y-scroll no-scrollbar">
                <MenuSideBar />
            </div>
        </div>

        <div className="px-8 py-8 w-full relative">
            <NavBar />
            {props.children}

        </div>
    </div>
}