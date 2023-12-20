import { PackageIcon, SearchIcon } from "lucide-react";
import VanIcon from "@/assets/icons/ic_delivery_pending.svg";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { TextField } from "@/components/input/InputText";
import Button from "@/components/buttons";
import { DefaultMap } from "@/components/map/DefaultMap";
import { RecentActivity } from "./RecentActivity";

const PackageCategoryChip = () => {
  const [selectedCategory, setSelectedCategory] = useState<
    "pickup" | "delivery"
  >("pickup");

  function setAsDelivery() {
    setSelectedCategory("delivery");
  }

  function setAsPickup() {
    setSelectedCategory("pickup");
  }

  return (
    <div>
      <div className="flex items-center gap-2">
        <div
          onClick={setAsPickup}
          className={cn(
            "flex items-center gap-2 rounded-lg p-2 cursor-pointer",
            selectedCategory == "pickup"
              ? "outline outline-primary outline-1 bg-primary-100 text-primary"
              : "bg-gray-200 text-gray-500"
          )}
        >
          <PackageIcon className="" />
          <p className="">Pickup</p>
        </div>

        <div
          onClick={setAsDelivery}
          className={cn(
            "flex items-center gap-2 rounded-lg p-2 cursor-pointer",
            selectedCategory == "delivery"
              ? "outline outline-primary outline-1 bg-primary-100 text-primary"
              : "bg-gray-200 text-gray-500"
          )}
        >
          <VanIcon className="" />
          <p className="">Delivery</p>
        </div>
      </div>
    </div>
  );
};

export const TrackPackageHeader = () => {
  return (
    <div>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="font-bold text-2xl">Track your Shipment</h1>
          <p>Welcome Back!</p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-medium">Select Category</p>
          <PackageCategoryChip />
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-medium">Track your Delivery</p>
          <div className="flex items-center gap-2">
            <TextField.Container className="flex-1 bg-gray-100">
              <SearchIcon className="text-gray-200" />
              <TextField.Input placeholder="Enter tracking number" />
            </TextField.Container>

            <Button variant="contained" className="rounded-lg">
              Track
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-medium">Current Delivery</p>
          <DefaultMap className="h-[300px]" />
        </div>

        <RecentActivity />
      </div>
    </div>
  );
};
