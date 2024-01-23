import Button from "@/components/buttons";
import notFoundImage from "@/assets/images/404_image.png";
import Link from "next/link";

export default function EkoMile404Page() {
  return (
    <div className="max-w-screen min-h-screen bg-white flex flex-col justify-center items-center overflow-x-hidden py-8 px-2">
      <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2 md:max-w-[80%] lg:max-w-[90%]">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-4xl md:text-6xl">404 Error!</h1>
            <p className="font-semibold md:text-lg">
              We can’t seem to find the page you are looking for.
            </p>
          </div>
          <Link href={"/"}>
            <Button className="w-full h-11">Go Home</Button>
          </Link>
        </div>

        <div className="flex flex-col">
          <img
            className="w-[200px] self-center md:w-[400px]"
            src={notFoundImage.src}
          />
        </div>
      </div>
    </div>
  );
}
