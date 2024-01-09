import Logo from "@/assets/icons/ic_logo.svg";
import { ChevronDown, MenuIcon, XIcon } from "lucide-react";
import Button from "../buttons";
import Link from "next/link";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { IconButton } from "../buttons/IconButton";

const links = ["Ship Now", "Track Now", "Services", "FAQs", "Support"];
export const NavBar = () => {
  return (
    <Drawer>
      <div className="flex items-center p-4 px-6 justify-between">
        <Link href="/">
          <Logo />
        </Link>

        <div className="items-center text-white gap-8 hidden lg:flex">
          <div className="flex items-center gap-1 cursor-pointer">
            <p className="font-semibold">Ship Now</p>
            <ChevronDown />
          </div>

          <div className="flex items-center gap-1 cursor-pointer">
            <p className="font-semibold">Track Now</p>
            <ChevronDown />
          </div>

          <div className="flex items-center gap-1 cursor-pointer">
            <p className="font-semibold">Services</p>
            <ChevronDown />
          </div>

          <div className="flex items-center gap-1 cursor-pointer">
            <p className="font-semibold">FAQs</p>
            <ChevronDown />
          </div>

          <div className="flex items-center gap-1 cursor-pointer">
            <p className="font-semibold">Support</p>
          </div>
        </div>

        <Button className="h-[40px] rounded-lg px-6 hidden lg:flex">
          Get started for free
        </Button>

        <DrawerTrigger>
          <MenuIcon className="text-white" />
        </DrawerTrigger>
        <DrawerContent>
          <div className="flex flex-col gap-3 px-4 py-8">
            {links.map((item) => (
              <div
                key={item}
                className="flex items-center gap-1 cursor-pointer"
              >
                <p className="font-semibold">{item}</p>
              </div>
            ))}
          </div>
          <DrawerClose className="flex justify-center">
            <IconButton>
              <XIcon className="text-black" />
            </IconButton>
          </DrawerClose>
        </DrawerContent>
      </div>
    </Drawer>
  );
};
