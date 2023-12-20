import { Divider } from "@/components/Divider";
import { Avatar } from "@/components/image/Avatar";
import RadioButtonIcon from "@/assets/icons/ic_check_location.svg";
import {
  CarIcon,
  ChevronRight,
  CreditCardIcon,
  MapPinIcon,
  MessageCircleIcon,
  PencilIcon,
  PhoneIcon,
  PlusCircleIcon,
} from "lucide-react";
import { IconButton } from "@/components/buttons/IconButton";
import { DefaultMap } from "@/components/map/DefaultMap";

const RiderArriving = () => {
  return (
    <div className="flex flex-col bg-gray-200 p-3 gap-2 rounded-lg">
      <h1 className="font-bold text-lg">Rider Arriving in 7 Minutes</h1>
      <div className="flex items-center ">
        <p className="flex-1 text-sm">Suzuki Motorcycle, Black</p>

        <div className="bg-gray-300 rounded-md">
          <p className="text-sm p-1">ABC187LZ</p>
        </div>
      </div>

      <Divider />

      <div className="flex justify-around items-center gap-4">
        <div className="flex flex-col gap-1">
          <Avatar className="w-10 h-10 bg-black" />
          <p className="text-sm text-center">Jasper</p>
        </div>

        <div className="flex flex-col gap-1">
          <IconButton className="bg-gray-100 w-10 h-10 flex justify-center items-center">
            <MessageCircleIcon className="text-black" />
          </IconButton>
          <p className="text-sm text-center">Chat</p>
        </div>

        <div className="flex flex-col gap-1">
        <IconButton className="bg-gray-100 w-10 h-10 flex justify-center items-center">
            <PhoneIcon className="text-black" />
          </IconButton>
          <p className="text-sm text-center">Call</p>
        </div>
      </div>
    </div>
  );
};

export const ConnectRider = () => {
  return (
    <div className="flex flex-col">
      <div className="flex gap-4 h-[700px]">
        <div className="bg-gray-500 flex-[0.7]">
          <DefaultMap className="w-full h-full" />
        </div>

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

            <div>
              <RiderArriving />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
