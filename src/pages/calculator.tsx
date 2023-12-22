import Button from "@/components/buttons";
import { CheckBox } from "@/components/buttons/CheckBox";
import DashboardLayout from "@/components/layout/dashboard";
import { CalculatorForm } from "@/components/page_components/dashboard/calculator/CalculatorForm";
import { PriceDetails } from "@/components/page_components/dashboard/calculator/PriceDetails";
import { useState } from "react";

export default function FundWallet() {
  const [showPrice, setShowPrice] = useState(false);

  return (
    <DashboardLayout>
      <div className="flex flex-col px-4 py-8 gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-xl">Service Calculator</h1>
          <p>
            Enter the following details to calculate the rate of your delivery.
          </p>
        </div>

        {showPrice ? (
          <PriceDetails />
        ) : (
          <CalculatorForm calculate={() => setShowPrice(true)} />
        )}
      </div>
    </DashboardLayout>
  );
}
