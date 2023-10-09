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
import { AddOperatorsModal, AddOperatorsModalRef } from "@/components/dashboard/operators/AddOperatorsModal";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { getOperatorsData, Operator } from "@/utils/data/operators";
import SEO from "@/components/SEO";

export default function Home() {
  const [_data, setData] = useState<Operator[]>([])
  const addOperatorsRef = useRef<AddOperatorsModalRef>(null)
  const [searchWord, setSearchWord] = useState('')

  useEffect(() => {
    setData(getOperatorsData(50))
  }, [])

  function addOperator() {
    addOperatorsRef.current?.open()
  }

  function onChangeText(event: ChangeEvent<HTMLInputElement>) {
    setSearchWord(event.target.value)
  }

  const data = useMemo(() => {
    const word = searchWord.toLowerCase()
    if (word.trim().length == 0) {
      return _data
    }
    return _data.filter((item) => item.name.toLowerCase().includes(word) || item.email.toLowerCase().includes(word) || item.owners_name.toLowerCase().includes(word))
  }, [searchWord, JSON.stringify(_data)])

  return (
    <DashboardLayout>
      <div className="flex flex-col py-8">
      <SEO title="Laswa | Operators" />
        <AddOperatorsModal ref={addOperatorsRef} />

        <div className="flex flex-col gap-6">
          <h1 className="text-2xl font-bold">Operators <span className="text-primary">(50)</span></h1>

          <div className="flex flex-col items-start p-4 bg-white gap-4 md:flex-row md:items-center">
            <TextField.Container className="flex-1 border border-gray-200">
              <TextField.Input onChange={onChangeText} placeholder="Search" />

              <IconButton className="text-gray-200">
                <SearchIcon />
              </IconButton>
            </TextField.Container>

            <div onClick={addOperator} className="border cursor-pointer rounded-md py-2 px-2 pr-3">
              <div className="flex items-center gap-2 text-sm text-text-normal font-semibold">
                <PlusIcon className="text-gray-300" />
                <p>Add Operators</p>
              </div>
            </div>

            <div className="border rounded-md py-2">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="flex items-center gap-3 text-sm text-text-normal font-semibold">
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
                    <div className="flex">
                      <CheckBox />
                    </div>
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Owner's Name</TableHead>
                  <TableHead></TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>

              {data.map((item) => <TableBody key={item.id} className="bg-white">
                <TableRow>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <CheckBox />
                    </div>
                  </TableCell>
                  <TableCell>
                    {item.name}
                  </TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>
                    {item.owners_name}
                  </TableCell>
                  <TableCell>Lorem</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <div className="flex">
                          <IconButton className="text-primary border border-primary rounded-sm">
                            <MoreHorizontalIcon />
                          </IconButton>
                        </div>
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
      </div>
    </DashboardLayout>
  )
}
