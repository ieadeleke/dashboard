import Logo from "@/assets/icons/ic_logo.svg";
import { ChevronDown, MenuIcon, XIcon } from "lucide-react";
import Button from "../buttons";
import Link from "next/link";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { IconButton } from "../buttons/IconButton";
import { useState } from "react";

const links = [
  {
    name: "Ship Now",
    href: "#ship-now",
  },
  {
    name: "Track Now",
    href: "#track-now",
  },
  {
    name: "Services",
    href: "#services",
  },
  {
    name: "FAQs",
    href: "#faqs",
  },
  {
    name: "Support",
    href: "#support",
  },
];

export const NavBar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  function handleLinkLink() {
    setIsDrawerOpen(false);
  }

  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <div className="flex items-center p-4 px-6 justify-between">
        <Link href="/">
          <Logo className="text-white" />
        </Link>

        <div className="items-center text-white gap-8 hidden lg:flex">
          <Link
            href="#become-a-partner"
            className="flex items-center gap-1 cursor-pointer"
          >
            <p className="font-semibold">Become a Partner</p>
          </Link>

          <Link
            href="/guest-tracking"
            className="flex items-center gap-1 cursor-pointer"
          >
            <p className="font-semibold">Track Now</p>
          </Link>

          <Link
            href="#services"
            className="flex items-center gap-1 cursor-pointer"
          >
            <p className="font-semibold">Services</p>
          </Link>

          <Link href="#faqs" className="flex items-center gap-1 cursor-pointer">
            <p className="font-semibold">FAQs</p>
          </Link>

          <Link
            href="htpps://play.google.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 cursor-pointer"
          >
            <p className="font-semibold">Download App</p>
          </Link>
        </div>

        <Button className="h-[40px] rounded-lg px-6 hidden lg:flex">
          Get started
        </Button>

        <DrawerTrigger className="lg:hidden">
          <MenuIcon className="text-white" />
        </DrawerTrigger>
        <DrawerContent>
          <div className="flex flex-col gap-3 px-4 py-8">
            {links.map((item) => (
              <Link
                href={item.href}
                key={item.href}
                onClick={handleLinkLink}
                className="flex items-center gap-1 cursor-pointer"
              >
                <p className="font-semibold">{item.name}</p>
              </Link>
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
