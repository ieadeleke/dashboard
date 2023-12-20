import { ArrowRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { General } from "./General";

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

export const OrderHistoryTabs = () => {
  return (
    <Tabs defaultValue="general" className="flex flex-col py-8">
      <div className="flex flex-col px-3">
        <TabsList className="flex-wrap justify-start bg-white h-auto py-0 px-0">
          {tabs.map((item) => (
            <div className={`flex-1 border-b-[1px]`} key={item.value}>
              <TabsTrigger
                className="mx-0 w-full py-4 data-[state=active]:bg-[#F9F9FE] text-gray-500 rounded-none data-[state=active]:text-primary data-[state=active]:border-b-2 border-b-primary"
                value={item.value}
              >
                {item.name}
              </TabsTrigger>
            </div>
          ))}
        </TabsList>

        <TabsContent value="general">
          <General />
        </TabsContent>
      </div>
    </Tabs>
  );
};
