import { IconButton } from "@/components/buttons/IconButton";
import { TextField } from "@/components/input/InputText";
import DashboardLayout from "@/components/layout/dashboard";
import { ChevronDown, MoreHorizontalIcon, PlusIcon, SearchIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CheckBox } from "@/components/buttons/CheckBox";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const tabs = [
  {
    name: "Active",
    value: "active"
  },
  {
    name: "All",
    value: "all"
  }
]


export default function Home() {
  return (
    <DashboardLayout>
      <Tabs defaultValue="active" className="flex flex-col py-8">

        <div className="flex flex-col gap-6">
          <h1 className="text-2xl font-bold">Passengers <span className="text-primary">(50)</span></h1>

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
                    <PlusIcon className="text-gray-300" />
                    <p>Add Passengers</p>
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

          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">
                    <div className="flex items-center">
                      <CheckBox />
                    </div>
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Seats</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>

              {Array(3).fill(0).map((item, index) => <TableBody key={index} className="bg-white">
                <TableRow>
                  <TableCell className="flex font-medium"><CheckBox /></TableCell>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <div className="bg-gray-200 h-10 w-10" />
                      <p>John Doe</p>
                    </div>
                  </TableCell>
                  <TableCell>10</TableCell>
                  <TableCell className="flex">
                    Lorem
                  </TableCell>
                  <TableCell>Lorem</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <IconButton className="text-primary border border-primary rounded-sm">
                          <MoreHorizontalIcon />
                        </IconButton>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>Action 1</DropdownMenuLabel>
                        <DropdownMenuItem>Action 2</DropdownMenuItem>
                        <DropdownMenuItem>Action 3</DropdownMenuItem>
                        <DropdownMenuItem>Action 4</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              </TableBody>)}
            </Table>
          </div>
        </div>


        <div>

        </div>
      </Tabs>
    </DashboardLayout>
  )
}
