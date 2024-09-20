import { MenuSideBar } from "./components/MenuSideBar";
import { NavBar } from "./components/NavBar";
// import Footer from "../Footer"

type LayoutProps = {
  children?: JSX.Element;
  showSearchBar?: boolean;
  rightSideBar?: JSX.Element;
  showNavBar?: boolean;
};

export default function DashboardLayout(props: LayoutProps) {
  return (
    <div className="relative max-w-[2000px] fle mx-auto">
      <div className="hidden h-screen sticky top-0 bottom-0 w-auto md:flex md:w-[20%] md:max-w-[20%] md:float-left">
        <div className="w-full h-screen max-h-[1000px] overflow-y-hidden">
          <MenuSideBar />
        </div>
      </div>

      <div className="relative md:w-[80%] md:ml-[20%]">
        <NavBar />
        {props.children}
      </div>
    </div>
  );
}
