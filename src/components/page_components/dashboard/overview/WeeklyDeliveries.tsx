import { IconButton } from "@/components/buttons/IconButton";
import { ListFilterIcon } from "lucide-react";

export const WeeklyDeliveries = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center">
        <p className="flex-1">
          Total Weekly Deliveries: <span className="font-bold ml-3">50</span>
        </p>

        <IconButton className="bg-primary">
          <ListFilterIcon />
        </IconButton>
      </div>

      <div className="h-[300px] bg-black">
        
      </div>
    </div>
  );
};
