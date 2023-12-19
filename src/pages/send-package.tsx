import { RegularTextInput } from "@/components/input/RegularTextInput";
import DashboardLayout from "@/components/layout/dashboard";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { CalendarPicker } from "@/components/calendar/CalendarPicker";
import moment from "moment";
import { CalendarIcon, HistoryIcon, PlusIcon } from "lucide-react";
import Button from "@/components/buttons";
import { IconButton } from "@/components/buttons/IconButton";

type FormItemProps = {
  name: string;
};

const FormItem = (props: FormItemProps) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-semibold text-sm">{props.name}</p>
      <RegularTextInput />
    </div>
  );
};
export default function SendPackage() {
  const [value, setValue] = useState("10:00");
  const [date, setDate] = useState<Date>();
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);

  return (
    <DashboardLayout>
      <div className="flex flex-col px-4 py-8 gap-8">
        <div className="flex flex-col">
          <h1 className="font-bold text-2xl">Enter Package Details</h1>
          <p>Kindly Fill in the package details </p>
        </div>

        <div className="flex items-center">
          <div>
            <p className="text-sm">
              Order Counter{" "}
              <span className="border border-gray-500 px-2 py-1 rounded-md">
                2
              </span>{" "}
              of{" "}
              <span className="border border-gray-500 px-2 py-1 rounded-md">
                10
              </span>
            </p>
          </div>

          <div className="flex-1" />

          <IconButton className="relative bg-[#f7f4dfff] rounded-full">
            <HistoryIcon />
            <p className="absolute -top-1 -right-0 bg-red-500 rounded-full px-[6px] py-[2px] text-[8px] text-white">
              2
            </p>
          </IconButton>
        </div>

        <form className="flex flex-col gap-6">
          <FormItem name="Pickup Address" />

          <div className="flex items-center gap-4">
            <div className="w-full">
              <p className="font-semibold text-sm">Pickup Time</p>
              <div className="w-full border border-gray-200 py-1">
                <TimePicker
                  autoFocus={false}
                  clearIcon={null}
                  disableClock
                  onChange={setValue}
                  value={value}
                />
              </div>
            </div>

            <div className="w-full">
              <p className="font-semibold text-sm">Pickup Date</p>
              <Popover
                modal
                open={isDateModalOpen}
                onOpenChange={setIsDateModalOpen}
              >
                <PopoverTrigger className="flex-1 w-full">
                  <div className="flex flex-1 items-center gap-4 border py-1 px-3 -mx-2">
                    <p className="text-black text-start text-sm line-clamp-1 flex-1">
                      {moment(date).format("DD/MM/YYYY")}
                    </p>

                    <CalendarIcon className="h-8 w-8 opacity-50 text-gray-600 bg-gray-300 p-2 rounded-full" />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarPicker showOutsideDays onNewDateApplied={setDate} />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <FormItem name="Receiver's Address" />

          <FormItem name="Receiver's Name" />

          <FormItem name="Receiver's Phone Number" />

          <FormItem name="Package Type" />

          <FormItem name="Weight (kg)" />

          <div className="flex items-center text-primary">
            <PlusIcon className="text-primary" />
            <p>Add new delivery</p>
          </div>

          <Button variant="contained" className="text-black">
            Continue
          </Button>
        </form>
      </div>
    </DashboardLayout>
  );
}
