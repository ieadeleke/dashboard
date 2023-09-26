import { IconButton } from "@/components/buttons/IconButton";
import { TextField } from "@/components/input/InputText";
import DashboardLayout from "@/components/layout/dashboard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeftRightIcon, ChevronDown, SearchIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TripHistoryItem } from "@/components/dashboard/trip-history/TripHistoryItem";

const tabs = [
  {
    name: "Active",
    value: "active"
  },
  {
    name: "All",
    value: "all"
  },
  {
    name: "Cancelled",
    value: "cancelled"
  },
  {
    name: "Complete",
    value: "complete"
  }
]


export default function Home() {
  return (
    <DashboardLayout>
      <Tabs defaultValue="active" className="flex flex-col py-8">

        <div className="flex flex-col gap-6">
          <h1 className="text-2xl font-bold">Trip History <span className="text-primary">(50)</span></h1>

          <div>
            <TabsList className="bg-white h-auto py-0 px-0">
              {tabs.map((item) => <div className={``} key={item.value}>
                <TabsTrigger className="mx-0 w-36 py-4 data-[state=active]:bg-[#F9F9FE] text-gray-500 rounded-none data-[state=active]:text-primary data-[state=active]:border-b-2 border-b-primary" value={item.value}>{item.name}</TabsTrigger>
              </div>)}
            </TabsList>
          </div>

          <div className="flex flex-col items-start p-4 bg-white gap-4 md:flex-row md:items-center">
            <TextField.Container className="flex-1 border border-gray-200">
              <TextField.Input placeholder="Search" />

              <IconButton className="text-gray-200">
                <SearchIcon />
              </IconButton>
            </TextField.Container>

            <div className="border rounded-md py-2">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="flex items-center gap-3 text-sm text-text-normal font-semibold">
                    <ArrowLeftRightIcon className="text-gray-300" />
                    <p>Initiate Trip</p>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Action 1</DropdownMenuLabel>
                  <DropdownMenuItem>Action 2</DropdownMenuItem>
                  <DropdownMenuItem>Action 3</DropdownMenuItem>
                  <DropdownMenuItem>Action 4</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="border rounded-md py-2">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="flex items-center gap-3 text-text-normal font-semibold">
                    <p>Filter</p>
                    <ChevronDown className="text-gray-300" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Action 1</DropdownMenuLabel>
                  <DropdownMenuItem>Action 2</DropdownMenuItem>
                  <DropdownMenuItem>Action 3</DropdownMenuItem>
                  <DropdownMenuItem>Action 4</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <TripHistoryItem status="active" />
            <TripHistoryItem status="complete" />
            <TripHistoryItem status="canceled" />
            <TripHistoryItem status="active" />
            <TripHistoryItem status="canceled" />
            <TripHistoryItem status="complete" />
          </div>
        </div>


        <div>

        </div>
      </Tabs>
    </DashboardLayout>
  )
}
