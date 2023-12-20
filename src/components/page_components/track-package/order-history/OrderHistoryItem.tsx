import { IconButton } from "@/components/buttons/IconButton";
import { ArrowRight, CopyIcon } from "lucide-react";

export const OrderHistoryItem = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <p>Order ID</p>
        <div className="flex items-center gap-1">
          <p className="font-medium">#THJH-4565789</p>
          <IconButton className="p-1">
            <CopyIcon className="w-5 h-5 text-primary" />
          </IconButton>
        </div>
      </div>

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
    </div>
  );
};
