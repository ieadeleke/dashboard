import Button from "@/components/buttons";
import { RegularTextInput } from "@/components/input/RegularTextInput";

export const HeroCalculator = () => {
  return (
    <div className="flex flex-col gap-4 py-2 px-2 bg-white text-black text-start rounded-lg md:flex-row md:items-center">
      <div className="border-r">
        <h1 className="font-bold">Pickup Address</h1>
        <RegularTextInput
          placeholder="Enter Address"
          className="border-none text-sm"
        />
      </div>
      <div className="border-r">
        <h1 className="font-bold">Dropoff Address</h1>
        <RegularTextInput
          placeholder="Enter Address"
          className="border-none text-sm"
        />
      </div>
      <div className="border-r">
        <h1 className="font-bold">Weight</h1>
        <RegularTextInput placeholder="0kg" className="border-none text-sm" />
      </div>

      <Button className="px-6">Calculate</Button>
    </div>
  );
};
