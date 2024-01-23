import { NavBar } from "@/components/navbar/NavBar";
import { HeroCalculator } from "./HeroCalculator";

export const Hero = () => {
  return (
    <div
      style={{
        backgroundImage:
          "url(https://res.cloudinary.com/dfzhxlgll/image/upload/v1704877044/eko%20mile/hero_image_fq87if.png)",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className="flex flex-col bg-black h-[650px] md:h-[550px]"
    >
      <NavBar />
      <div className="flex flex-col justify-center md:justify-normal">
        <div className="px-4 pt-[5%] text-white text-center md:px-[10%] lg:px-[20%]">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-6">
              <h1 className="text-2xl font-bold md:text-4xl lg:text-5xl">
                Know how much it cost before you ship.
              </h1>
              <p className="text-base md:text-xl">
                Experience hassle-free and affordable deliveries that keep you
                connected to what matters the most.{" "}
              </p>
            </div>

            <div className="flex flex-col gap-2 justify-center md:flex-row md:items-center">
              <HeroCalculator />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
