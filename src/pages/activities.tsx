import DashboardLayout from "@/components/layout/dashboard";
import { useEffect, useState } from "react";
import { getPassengersData, Passenger } from "@/utils/data/passengers";
import SEO from "@/components/SEO";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableHead, TableHeader } from "@/components/ui/table"
import {
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { TextField } from "@/components/input/InputText";
import { ChevronDown, MoreHorizontalIcon, PlusIcon, SearchIcon } from "lucide-react";
import { IconButton } from "@/components/buttons/IconButton";
import { CheckBox } from "@/components/buttons/CheckBox";
import { AdminActivity } from "@/models/activities/AdminActivity";
import { useFetchAdminActivities } from "@/utils/apiHooks/admins/useFetchAdminActivities";
import Loading from "@/components/states/Loading";
import Error from "@/components/states/Error";


export default function PassengersPage() {
  const {isLoading, error, data, fetchAdminActivities} = useFetchAdminActivities()

  useEffect(() => {
    fetchAdminActivities()
  }, [])

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <SEO title="Laswa | Passengers" />
        <div className="mt-4 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Activities</h1>

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
                  <TableHead>Staff ID</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Event</TableHead>
                </TableRow>
              </TableHeader>

              {data.map((data) => <TableBody className="bg-white">
                <TableRow>
                  <TableCell className="flex font-medium"><CheckBox /></TableCell>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <img className="bg-gray-200 h-10 w-10 object-cover object-center" src={data.profile_image} alt={data.firstname} />
                      <p>{data.firstname} {data.lastname}</p>
                    </div>
                  </TableCell>
                  <TableCell>{data.staffId}</TableCell>
                  <TableCell>{data.email}</TableCell>
                  <TableCell>
                  <TableCell>{data.event}</TableCell>
                  </TableCell>
                </TableRow>
              </TableBody>
              )}
            </Table>
          </div>
        </div>

        {isLoading ? <Loading className="h-[400px]" /> : error ? <Error onRetry={fetchAdminActivities} className="h-[400px]" /> : null}
      </div>
    </DashboardLayout>
  )
}
