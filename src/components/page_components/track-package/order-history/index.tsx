import { ArrowRight } from "lucide-react";
import { OrderHistoryItem } from "./OrderHistoryItem";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OrderHistoryTabs } from "./tabs";

const tabs = [
  {
    name: "General Information",
    value: "general",
  },
  {
    name: "Documents",
    value: "documents",
  },
  {
    name: "Invoice",
    value: "invoice",
  },
];

export const OrderHistory = () => {
  return (
    <div className="px-3">
      <div className="flex flex-col gap-8">
        <h1 className="font-bold text-xl">Order History</h1>

        <OrderHistoryItem />
      </div>

      <div>
        <OrderHistoryTabs />
      </div>
    </div>
  );
};
