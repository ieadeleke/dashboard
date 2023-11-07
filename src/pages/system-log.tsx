import DashboardLayout from "@/components/layout/dashboard";
import { useEffect, useMemo } from "react";
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
import { CalendarIcon, PlusIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import moment from "moment";
import { CalendarRange, DateRange } from "@/components/calendar/CalendarRange";
import Empty from "@/components/states/Empty";

export default function PassengersPage() {
  const [page, setPage] = useState(0)
  const { isLoading, error, data: adminActivities, count, fetchAdminActivities } = useFetchAdminActivities()
  const [date, setDate] = useState<DateRange>()
  const [isDateModalOpen, setIsDateModalOpen] = useState(false)

  const formatDateRange = useMemo(() => {
    if (!date) return 'Tap to filter by date range'
    const start = moment(date.from).format("MMM D, YYYY")
    const end = moment(date.to).format("MMM D, YYYY")
    return `From ${start} - ${end}`
  }, [JSON.stringify(date)])

  function fectchData() {
    fetchAdminActivities({ page })
  }

  function onPageChange(selectedItem: {
    selected: number;
  }) {
    setPage(selectedItem.selected)
  }

  function onDateRangeSelected(date: DateRange) {
    if (date) {
      setDate(prevDate => Object.assign({}, prevDate, { from: date.from || new Date(), to: date.to || new Date() }))
    }
    setIsDateModalOpen(false)
  }

  useEffect(() => {
    fectchData()
  }, [page])

  const data = useMemo(() => {
    if (!date) {
      return adminActivities
    }
    return adminActivities.filter((item) => {
      return moment(item.createdAt).isBetween(moment(date.from), moment(date.to))
    })
  }, [date, JSON.stringify(adminActivities)])

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

          <div className="flex flex-1">
            <Popover modal open={isDateModalOpen} onOpenChange={setIsDateModalOpen}>
              <PopoverTrigger className="flex-1">
                <div className="flex flex-1 items-center gap-4 border py-2 px-3 -mx-2">
                  <CalendarIcon className="h-4 w-4 opacity-50 text-gray-500" />
                  <p className="text-gray-500 text-sm line-clamp-1">{formatDateRange}</p>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarRange showOutsideDays onNewDateApplied={onDateRangeSelected} />
              </PopoverContent>
            </Popover>
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

            {data.length == 0 && <Empty title="Nothing to show" message="No logs found" />}
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
