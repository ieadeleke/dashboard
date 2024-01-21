import Button from "@/components/buttons";
import { NavBar } from "@/components/navbar/NavBar";
import Link from "next/link";

export const TrackHero = () => {
  return (
    <div
      style={{
        backgroundImage:
          "url(https://res.cloudinary.com/dfzhxlgll/image/upload/v1705863268/eko%20mile/tracking_hero_rxxhmt.png)",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className="flex flex-col bg-black h-[550px]"
    >
      <NavBar />
    </div>
  );
};
