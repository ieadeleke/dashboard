import { Divider } from "@/components/Divider";
import Button from "@/components/buttons";
import { Layout } from "@/components/layout";
import { DefaultMap } from "@/components/map/DefaultMap";
import StatIcon1 from "@/assets/icons/ic_delivery_stat_1.svg";
import StatIcon2 from "@/assets/icons/ic_delivery_stat_2.svg";
import StatIcon3 from "@/assets/icons/ic_delivery_stat_3.svg";
import StatIcon4 from "@/assets/icons/ic_delivery_stat_4.svg";

export default function GuestTracking() {
  return (
    <Layout>
      <div className="flex flex-col h-screen overflow-hidden">
        <div className="w-full h-full grid grid-cols-2">
          <div className="flex flex-col bg-[#FFB60B33] h-full justify-center items-center">
            <img src="https://res.cloudinary.com/dfzhxlgll/image/upload/v1705318673/eko%20mile/out_for_delivery_y7oita.png" />
            <h1 className="font-bold text-2xl mt-4">
              Your Order is on the way!
            </h1>
          </div>

          <div className="flex flex-col overflow-y-scroll h-full">
            <DefaultMap className="h-[300px]" />

            <div className="flex flex-col gap-5 p-4 h-0">
              <div>
                <h1 className="font-bold text-xl">Order Picked</h1>
                <p className="text-sm text-gray-700">
                  Bimbo’s Apparel . 11/10/23. 13.50 WAT-4 arrival
                </p>

                <div className="flex items-center gap-3 mt-4">
                  <StatIcon1 className="text-primary" />
                  <div className="h-2 w-32 bg-gray-400 rounded-full" />
                  <StatIcon2 className="text-gray-400" />
                  <div className="h-2 w-32 bg-gray-400 rounded-full" />
                  <StatIcon3 className="text-gray-400" />
                  <div className="h-2 w-32 bg-gray-400 rounded-full" />
                  <StatIcon4 className="text-gray-400" />
                </div>
              </div>

              <Divider />

              <div className="flex flex-col gap-2">
                <h1 className="font-medium text-lg">See your order details</h1>
                <p className="text-sm text-gray-700">
                  You can see the content of your order or keep it a surprise
                  until it arrives.
                </p>
                <Button className="rounded-full self-start h-10 text-sm">
                  Reveal order details
                </Button>
              </div>

              <Divider />

              <div className="flex flex-col gap-2">
                <h1 className="font-medium text-lg">Delivery Address</h1>
                <p className="text-sm text-gray-700">
                  155A Ralph J Karieren Crescent, Lekki Pennisula Scheme 2,
                  Ogombo, Lagos.
                </p>
              </div>

              <Divider />

              <div className="flex flex-col gap-2">
                <h1 className="font-medium text-lg">
                  Need help with your order?
                </h1>
                <p className="text-sm text-gray-700">
                  If something isn’t right, we’ll help you out.
                </p>
                <Button
                  variant="text"
                  className="rounded-full self-start h-10 text-sm"
                >
                  Get help
                </Button>
              </div>

              <Divider />

              <div className="flex flex-col gap-2">
                <h1 className="font-medium text-sm">
                  How was your experience?
                </h1>
                <Button
                  variant="text"
                  className="rounded-full self-start h-10 text-sm"
                >
                  Share feedback
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
