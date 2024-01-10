import Button from "@/components/buttons";
import { AppleIcon } from "lucide-react";
import PlaystoreIcon from "@/assets/icons/ic_playstore.svg";
import Link from "next/link";

export const DownloadApp = () => {
  return (
    <div className="flex flex-col px-3 md:px-8 lg:px-16">
      <div className="grid grid-cols-1 gap-8 items-center md:grid-cols-2">
        <div style={{
          backgroundImage: `url(https://res.cloudinary.com/dfzhxlgll/image/upload/v1704877835/eko%20mile/appstores_landing_page_i83lxr.png)`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain'
        }} className="bg-transparent h-[400px]" />

        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <div className="self-start rounded-none p-2 text-sm bg-primary">
              Download the App now
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="font-bold text-2xl md:text-4xl md:leading-[40px]">
                Experience the convenience of our app
              </h1>
              <p className="text-gray-800">
                Get instant access to our services and stay connected on-the-go.
                Unlock a world of possibilities at your fingertips
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 md:gap-8 lg:flex-row lg:items-center">
            <Link href="https://play.google.com" target="_blank" rel="noreferrer" className="flex items-center gap-5 bg-primary px-5 py-2 rounded-lg cursor-pointer">
              <AppleIcon />
              <div className="bg-white w-[0.5px] h-8" />
              <p className="text-sm text-[#333333]">
                Download on the{" "}
                <span className="block font-bold">Apple Store</span>
              </p>
            </Link>

            <Link href="https://appstoreconnect.com" target="_blank" rel="noreferrer" className="flex items-center gap-5 bg-primary px-5 py-2 rounded-lg cursor-pointer">
              <PlaystoreIcon />
              <div className="bg-white w-[0.5px] h-8" />
              <p className="text-sm text-[#333333]">
                Get it on <span className="block font-bold">Google Play</span>
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
