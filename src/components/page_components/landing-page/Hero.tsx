import Button from "@/components/buttons";
import { NavBar } from "@/components/navbar/NavBar";
import Link from "next/link";

export const Hero = () => {
  return (
    <div style={{
      backgroundImage: 'url(https://res.cloudinary.com/dfzhxlgll/image/upload/v1704877044/eko%20mile/hero_image_fq87if.png)',
      backgroundPosition: 'center',
      backgroundSize: 'cover'
    }} className="flex flex-col bg-black h-[550px]">
      <NavBar />
      <div className="flex flex-col justify-center md:justify-normal">
        <div className="px-4 pt-[10%] text-white text-center md:px-[10%] lg:px-[20%]">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl font-bold md:4xl lg:5xl">
                Experience Convenience at your Fingertips
              </h1>
              <p className="text-base md:text-xl">
                Experience hassle-free and affordable deliveries that keep you
                connected to what matters the most.{" "}
              </p>
            </div>

            <div className="flex flex-col gap-2 justify-center md:flex-row md:items-center">
              <Link href="/dashboard">
                <Button className="px-8 text-black">Get Started</Button>
              </Link>
              <Link href="/login">
                <Button variant="outlined">Become a Rider</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
