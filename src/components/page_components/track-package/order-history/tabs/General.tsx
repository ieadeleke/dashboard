import { Divider } from "@/components/Divider";
import { ChevronDown } from "lucide-react";

export const General = () => {
  return (
    <div className="flex flex-col gap-3 py-3">
      <div className="flex flex-col gap-2">
        <p className="text-sm">Shipped April 2nd, 2023</p>
        <p className="font-bold text-sm">Delivered on April 2nd, 2023</p>
      </div>

      <div className="flex flex-col gap-6">
        <p>Product</p>

        <div className="flex flex-col gap-4 rounded-lg p-3 bg-white">
          <div className="">
            <div className="flex items-center">
              <p>Gift Box</p>
              <div className="flex-1" />
              <ChevronDown />
            </div>
          </div>

          <Divider />

          <div className="flex flex-col gap-3">
            {Array(3)
              .fill(0)
              .map((_, index) => {
                return <li key={index} className="text-sm">Iphone 15 Pro Max</li>;
              })}
          </div>
        </div>

        <div className="flex items-center bg-white p-2">
          <p className="text-sm">Total Price</p>
          <div className="flex-1" />
          <p className="font-bold text-sm">#60.00</p>
        </div>

        <div className="flex items-center bg-white p-2">
          <p className="text-sm">Dropoff Address</p>
          <div className="flex-1" />
          <p className="font-bold text-sm">134 Barrydowne, Rd</p>
        </div>

        <div className="flex items-center bg-white p-2">
          <p>Status</p>
          <div className="flex-1" />
          <p className="bg-[#73D37133] outline outline-1 outline-[#73D371] p-1 rounded-xl text-sm">
            Completed
          </p>
        </div>
      </div>
    </div>
  );
};
