import { BuildingIcon, CalculatorIcon, SendIcon } from "lucide-react";

export const HeroOptions = () => {
  return (
    <div className="flex flex-col gap-12 bg-white shadow p-8 rounded-2xl md:flex-row md:gap-4">
      <div className="flex flex-col flex-1 text-center md:border-r md:pr-2">
        <SendIcon className="self-center text-primary" />
        <h2 className="font-bold text-lg">Ship Now</h2>
        <p className="text-gray-700 mt-4">Send your package with ease</p>
      </div>

      <div className="flex flex-col flex-1 text-center px-0 md:border-r md:pr-2">
        <CalculatorIcon className="self-center text-primary" />
        <h2 className="font-bold text-lg">Calculate Price</h2>
        <p className="text-gray-700 mt-4">Get a cost estimate </p>
      </div>

      <div className="flex flex-col flex-1 text-center">
        <BuildingIcon className="self-center text-primary" />
        <h2 className="font-bold text-lg">Register as a Business</h2>
        <p className="text-gray-700 mt-4">
          Create a business account today and enjoy amazing benefits
        </p>
      </div>
    </div>
  );
};
