import { Divider } from "@/components/Divider";
import { Avatar } from "@/components/image/Avatar";
import RadioButtonIcon from "@/assets/icons/ic_check_location.svg";
import {
  CarIcon,
  ChevronRight,
  CreditCardIcon,
  MapPinIcon,
  PencilIcon,
  PlusCircleIcon,
} from "lucide-react";

export const ConnectRider = () => {
  return (
    <div className="flex flex-col">
      <div className="flex gap-4 h-[700px]">
        <div className="bg-red-500 flex-[0.7]" />

        <div className="flex-[0.3]">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 bg-gray-100 p-2 rounded-lg">
              <div>
                <p className="font-bold">Connecting to your rider</p>
                <p className="text-sm">
                  The rider will be on their way as soon as they confirm.
                </p>
              </div>
              <Divider className="bg-primary" />

              <div className="flex flex-col">
                <Avatar className="w-16 h-16 bg-gray-300 self-center" />
                <p className="text-center font-medium">Jasper</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 bg-gray-100 p-2 rounded-lg">
              <p className="font-bold">Route</p>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <RadioButtonIcon className="text-[#31CC41]" />
                  <p>Lekki Phase 1, lekki, Nigeria</p>
                </div>

                <div className="flex items-center gap-3">
                  <PlusCircleIcon />
                  <p className="text-gray-500">Add Stop</p>
                </div>

                <div className="flex items-center gap-3">
                  <MapPinIcon className="text-primary" />
                  <p className="text-gray-500">Osapa London, Lekki Lagos</p>
                </div>

                <div className="flex items-center gap-3">
                  <PencilIcon className="text-primary" />
                  <p className="text-primary">Edit destinations</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 bg-gray-100 p-2 rounded-lg">
              <p className="font-bold">Payment Method</p>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <CreditCardIcon className="text-primary" />
                  <p>Card </p>
                  <div className="flex-1" />
                  <p className="font-bold">#2500</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 bg-gray-100 p-2 rounded-lg">
              <p className="font-bold">More</p>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <CarIcon className="text-gray-400" />
                  <p className="text-gray-400">Cancel Order</p>
                  <div className="flex-1" />
                  <ChevronRight className="text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
