import { Divider } from "@/components/Divider";
import Button from "@/components/buttons";
import { IconButton } from "@/components/buttons/IconButton";
import { PenIcon, TrashIcon } from "lucide-react";

type DeliverySummaryItemLabelProps = {
  name: string;
  description: string;
};

const DeliverySummaryItemLabel = (props: DeliverySummaryItemLabelProps) => {
  return (
    <div className="flex flex-col">
      <p>{props.name}</p>
      <p className="font-medium">{props.description}</p>
    </div>
  );
};

const DeliverySummaryItem = () => {
  return (
    <div className="flex flex-col bg-[#f7f4d5ff] rounded-lg">
      <div className="flex flex-col py-4">
        <div className="flex items-center px-2">
          <p>16th Feburary, 2023</p>
          <div className="flex-1" />

          <div className="flex items-center">
            <IconButton>
              <TrashIcon />
            </IconButton>

            <IconButton>
              <PenIcon />
            </IconButton>
          </div>
        </div>
        <Divider />
      </div>

      <div className="flex flex-col gap-4 px-4">
        <DeliverySummaryItemLabel
          name="Pick Up Address"
          description="155A, Ogomboso Road, Off Ibadan Road, Lagos State"
        />

        <DeliverySummaryItemLabel
          name="Drop Off Address"
          description="16B, Elegushi Road, Maryland Road, Lagos State"
        />

        <DeliverySummaryItemLabel
          name="Receiver’s Phone Number"
          description="09046786789"
        />

        <DeliverySummaryItemLabel
          name="Package Type"
          description="Parcel (Non Fragile)"
        />

        <DeliverySummaryItemLabel
          name="Package Size"
          description="10cmx10cm(30lbs)"
        />

        <DeliverySummaryItemLabel name="Order ID" description="#RDG6789909" />
      </div>
    </div>
  );
};

type DeliverySummaryProps = {
  showRider?: () => void
}

export const DeliverySummary = (props: DeliverySummaryProps) => {
  return (
    <div className="flex flex-col gap-8 py-8">
      <h1 className="font-bold text-2xl">Delivery Summary</h1>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <DeliverySummaryItem />
          <DeliverySummaryItem />
        </div>

        <div className="flex items-center px-2">
          <p className="font-bold">Total Price</p>
          <div className="flex-1" />
          <p className="font-bold">#12000</p>
        </div>
      </div>

      <Button onClick={props.showRider} variant="contained"> Make Payment</Button>
    </div>
  );
};
