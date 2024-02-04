import { IconButton } from "@/components/buttons/IconButton";
import { ListFilterIcon } from "lucide-react";
import { BarChart } from "@mui/x-charts/BarChart";
import { ChartContainer, BarPlot } from "@mui/x-charts";

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const xLabels = ["M", "T", "W", "T", "F", "S", "S"];

export const WeeklyDeliveries = () => {
  return (
    <div className="flex flex-col gap-4 bg-white rounded-lg p-4">
      <div className="flex items-center">
        <p className="flex-1">
          Total Weekly Transactions: <span className="font-bold ml-3">50</span>
        </p>

        <IconButton className="bg-primary">
          <ListFilterIcon />
        </IconButton>
      </div>

      <div className="h-[300px]">
        <ChartContainer
          width={500}
          height={300}
          series={[
            {
              data: uData,
              label: "NUMBER OF DELIVERIES",
              type: "bar",
              color: "#6A22B2",
            },
          ]}
          xAxis={[
            {
              scaleType: "band",
              data: xLabels,
              label: "Lol",
              labelStyle: {
                color: "red",
                backgroundColor: "red",
              },
            },
          ]}
        >
          <BarPlot />
        </ChartContainer>
      </div>
    </div>
  );
};
