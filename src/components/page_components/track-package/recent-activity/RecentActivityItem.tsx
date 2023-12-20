import { Divider } from "@/components/Divider";
import { Avatar } from "@/components/image/Avatar";
import { ArrowRight } from "lucide-react";

export const RecentActivityItem = () => {
  return (
    <div className="bg-white rounded-lg">
      <div className="p-4">
        <div className="flex items-center">
          <div className="flex flex-col gap-1">
            <p>Order ID</p>
            <p className="font-medium">#THJH-4565789</p>
          </div>

          <div className="flex-1" />

          <div className="flex flex-col gap-1">
            <p className="bg-[#73D37133] outline outline-1 outline-[#73D371] p-1 rounded-xl text-sm">
              Completed
            </p>
            <p className="text-sm">08/09/2023</p>
          </div>
        </div>
      </div>
      <Divider />

      <div className="flex flex-col gap-4 p-4">
        <div className="flex items-center">
          <div className="flex flex-col gap-1">
            <p>From</p>
            <p className="font-medium">Bimbo Apparel</p>
          </div>

          <div className="flex-1" />
          <ArrowRight />
          <div className="flex-1" />

          <div className="flex flex-col gap-1">
            <p className="text-sm">To</p>
            <p className="text-sm font-medium">08/09/2023</p>
          </div>
        </div>

        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <Avatar className="bg-black w-10 h-10" />
            <div>
              <p className="font-bold text-sm">Joseph Maroon</p>
              <p className="text-sm">Delivery driver</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
