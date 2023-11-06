import DashboardLayout from "@/components/layout/dashboard";
import { useEffect } from "react";
import SEO from "@/components/SEO";
import { Table, TableHead, TableHeader } from "@/components/ui/table"
import {
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { CheckBox } from "@/components/buttons/CheckBox";
import { useFetchAdminActivities } from "@/utils/apiHooks/admins/useFetchAdminActivities";
import Loading from "@/components/states/Loading";
import Error from "@/components/states/Error";
import { useState } from "react";
import { TablePagination } from "@/components/pagination/TablePagination";


export default function PassengersPage() {
  const [page, setPage] = useState(0)
  const { isLoading, error, data, count, fetchAdminActivities } = useFetchAdminActivities()

  function fectchData() {
    fetchAdminActivities({ page })
  }

  function onPageChange(selectedItem: {
    selected: number;
  }) {
    setPage(selectedItem.selected)
  }

  useEffect(() => {
    fectchData()
  }, [page])

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <SEO title="Laswa | Passengers" />
        <div className="mt-4 flex flex-col gap-4">
          <h1 className="text-2xl font-bold">System Log</h1>

          {/* <div className="flex flex-col items-start p-4 bg-white gap-4 md:flex-row md:items-center">
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
          </div> */}

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

                  <TableHead>Email</TableHead>
                  <TableHead>Event</TableHead>
                </TableRow>
              </TableHeader>

              {data.map((data) => <TableBody key={data.id} className="bg-white">
                <TableRow>
                  <TableCell className="flex font-medium"><CheckBox /></TableCell>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <img className="bg-gray-200 h-10 w-10 object-cover object-center" src={data.profile_image} alt={data.firstname} />
                      <p>{data.firstname} {data.lastname}</p>
                    </div>
                  </TableCell>

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

        {isLoading ? <Loading className="h-[400px]" /> : error ? <Error onRetry={fectchData} className="h-[400px]" /> : null}

        <div className="flex mt-8 justify-center">
          <TablePagination
            breakLabel="..."
            nextLabel=">"
            onPageChange={onPageChange}
            pageRangeDisplayed={5}
            currentPage={page}
            pageCount={Math.max(0, count / 20)}
            // pageCount={1}
            className="flex gap-4"
            nextClassName="text-gray-500"
            previousClassName="text-gray-500"
            pageClassName="flex w-8 h-7 bg-white justify-center items-center text-sm text-gray-500 rounded-sm outline outline-2 outline-gray-100 text-center"
            activeClassName="!bg-primary text-white !outline-none"
            previousLabel="<"
            renderOnZeroPageCount={null}
          />
        </div>
      </div>
    </DashboardLayout>
  )
}
