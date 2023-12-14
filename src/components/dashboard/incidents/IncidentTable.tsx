import { Incident } from "@/models/incidents";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckBox } from "@/components/buttons/CheckBox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { EyeIcon, MoreHorizontalIcon } from "lucide-react";
import { IconButton } from "@/components/buttons/IconButton";
import { TripHistoryStatusChip } from "../trip-history/TripHistoryStatusChip";
import { useEffect, useRef, useState } from "react";
import { IncidentInfoModal, IncidentInfoModalRef } from "./IncidentInfo";

type IncidentTableProps = {
  data: Incident[];
};

export const IncidentTable = (props: IncidentTableProps) => {
  const [data, setData] = useState(props.data);
  const incidentInfoModalRef = useRef<IncidentInfoModalRef>(null);

  useEffect(() => {
    setData(props.data);
  }, [JSON.stringify(props.data)]);

  function handleReportIncident(incident: Incident) {
    incidentInfoModalRef.current?.open({ data: incident });
  }

  function onIncidentDataChanged(incident: Incident) {
    setData((data) =>
      data.map((item) => (item._id == incident._id ? incident : item))
    );
  }
  return (
    <Table>
      <IncidentInfoModal
        onIncidentDataChanged={onIncidentDataChanged}
        ref={incidentInfoModalRef}
      />
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">
            <div className="flex items-center">
              <CheckBox />
            </div>
          </TableHead>
          <TableHead>Boat Name</TableHead>
          <TableHead>Number of Injury</TableHead>
          <TableHead>Number of Missing</TableHead>
          <TableHead>Boat capacity</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>

      {data.map((item) => (
        <TableBody key={item.BoatName} className="bg-white">
          <TableRow>
            <TableCell className="flex font-medium">
              <CheckBox />
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-4">
                <p>{item.BoatName}</p>
              </div>
            </TableCell>
            {/* <TableCell>{item.status}</TableCell> */}
            <TableCell>{item.NumberOfInjury}</TableCell>

            <TableCell>{item.MissingPerson}</TableCell>
            <TableCell>{item.BoatCapacity}</TableCell>
            <TableCell>
              <div className="flex">
                <TripHistoryStatusChip
                  status={item.ConfirmStatus ? "complete" : "pending"}
                />
              </div>
            </TableCell>
            <TableCell>
              <Popover>
                <PopoverTrigger>
                  <IconButton className="text-primary border border-primary rounded-sm">
                    <MoreHorizontalIcon />
                  </IconButton>
                </PopoverTrigger>

                <PopoverContent className="w-auto px-0 py-1">
                  <div
                    onClick={() => handleReportIncident(item)}
                    className="flex items-center gap-4 px-4 py-4 cursor-pointer hover:bg-gray-100"
                  >
                    <EyeIcon className="text-gray-500" />
                    <p className="text-sm cursor-pointer">Review</p>
                  </div>
                </PopoverContent>
              </Popover>
            </TableCell>
          </TableRow>
        </TableBody>
      ))}
    </Table>
  );
};
