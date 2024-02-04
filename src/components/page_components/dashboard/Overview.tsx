import { cn } from "@/lib/utils";
import { ListIcon } from "lucide-react";
import CompletedDeliveryIcon from "@/assets/icons/ic_delivery_complete.svg";
import PendingDeliveryIcon from "@/assets/icons/ic_delivery_pending.svg";
import ScooterIcon from "@/assets/icons/ic_scooter.svg";
import { WeeklyDeliveries } from "./overview/WeeklyDeliveries";
import { DailyAnalytics } from "./overview/DailyAnalytics";
import { DeliveryDetails } from "./overview/DeliveryDetails";

type OverviewItemProps = {
  title: string;
  description: string;
  icon?: JSX.Element;
  iconClassName?: string;
};

const OverviewItem = (props: OverviewItemProps) => {
  return (
    <div className="flex items-center bg-white rounded-lg p-4 py-10">
      <div className="flex flex-col flex-1">
        <p className="font-medium">{props.title}</p>
        <p className="font-bold">{props.description}</p>
      </div>

      <div className={cn("rounded-full p-2", props.iconClassName)}>
        {props.icon}
      </div>
    </div>
  );
};

export const Overview = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-4">
        <h1 className="font-medium text-2xl">Overview</h1>

        <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-2 lg:grid-cols-4">
          <OverviewItem
            title="Agents"
            description="10K"
            iconClassName="text-blue-800 bg-blue-300"
            icon={<ListIcon />}
          />
          <OverviewItem
            title="All Transcations"
            description="100K"
            iconClassName="text-[#147D77] bg-[#c9f2f0ff]"
            icon={<ScooterIcon />}
          />
          <OverviewItem
            title="Declined Transactions"
            description="21K"
            iconClassName="text-[#FF0000] bg-[#ffededff]"
            icon={<PendingDeliveryIcon />}
          />
          <OverviewItem
            title="Completed Transactions"
            description="40"
            iconClassName="text-[#23A321] bg-[#D9F7D8]"
            icon={<CompletedDeliveryIcon />}
          />

          <OverviewItem
            title="Today's Transactions"
            description="21K"
            iconClassName="text-[#FF0000] bg-[#ffededff]"
            icon={<PendingDeliveryIcon />}
          />
          <OverviewItem
            title="Revenu"
            description="40"
            iconClassName="text-[#23A321] bg-[#D9F7D8]"
            icon={<CompletedDeliveryIcon />}
          />
          <OverviewItem
            title="Tax Payers"
            description="21K"
            iconClassName="text-[#FF0000] bg-[#ffededff]"
            icon={<PendingDeliveryIcon />}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 my-4 md:grid-cols-2">
        <WeeklyDeliveries />
        <DailyAnalytics />
      </div>
      <DeliveryDetails />
    </div>
  );
};
