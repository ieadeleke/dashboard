import { Divider } from "@/components/Divider";

export const PriceDetails = () => {
  return (
    <div className="flex flex-col gap-1 bg-[#FFB60B24] rounded-lg">
      <div className="flex flex-col gap-2 p-2">
        <h1 className="font-bold text-xl">Estimated Price Details</h1>
      </div>

      <Divider />

      <div className="flex flex-col gap-2 p-2">
        <div>
            <p>Pick Up Address</p>
            <p className="font-medium">155A, Ogomboso Road, Off Ibadan Road, Lagos State</p>
        </div>

        <div>
            <p>Drop Off Address</p>
            <p className="font-medium">16B, Elegushi Road, Maryland Road, Lagos State</p>
        </div>

        <div>
            <p>Total Distance</p>
            <p className="font-medium">7000 KM</p>
        </div>

        <div>
            <p>Fees per KM</p>
            <p className="font-medium">$100.00</p>
        </div>

        <div>
            <p>Weight Fees</p>
            <p className="font-medium">$150.00</p>
        </div>

        <div>
            <p>Return Fees</p>
            <p className="font-medium">$150.00</p>
        </div>

        <div>
            <p>Total Shipping Fees</p>
            <p className="font-medium">$150.00</p>
        </div>
      </div>
    </div>
  );
};
