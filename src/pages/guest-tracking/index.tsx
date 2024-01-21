import Button from "@/components/buttons";
import { RegularTextInput } from "@/components/input/RegularTextInput";
import { Layout } from "@/components/layout";
import { TrackHero } from "@/components/page_components/track-package/TrackHero";
import { useRouter } from "next/router";

export default function Track() {
  const router = useRouter();

  return (
    <Layout>
      <div>
        <TrackHero />
        <div className="flex flex-col bg-white -mt-8 h-80 rounded-t-3xl items-center px-2 py-8">
          <div className="text-center">
            <h1 className="text-3xl">
              Track Your <span className="font-bold">Shipment</span>
            </h1>
            <p className="font-light">Find the status of your package</p>

            <div className="flex items-center mt-8 w-full md:w-[500px]">
              <RegularTextInput
                placeholder="Enter your tracking number"
                className="border-r-0 outline-none"
              />
              <Button
                onClick={() => router.push("/guest-tracking/8764898765456")}
                className="w-32 h-10"
              >
                Track
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
