import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import StepContent from "@mui/material/StepContent";
import { CheckIcon } from "lucide-react";

const steps = [
  {
    title: "Parcel ready for pickup",
    description: "155A, Ibadan Road, Lagos State",
    timestamp: "10th June 9:24AM",
  },
  {
    title: "Parcel Enroute to Hub",
    description: "155A, Ibadan Road, Lagos State",
    timestamp: "10th June 9:24AM",
  },
  {
    title: "Parcel at Hub",
    description: "155A, Ibadan Road, Lagos State",
    timestamp: "10th June 12:47AM",
  },
  {
    title: "Parcel on Transit to Customer",
    description: "16B, Maryland Road, Lagos State",
    timestamp: "10th June 05:22PM",
  },
  {
    title: "Parcel Delivered",
    description: "16B, Maryland Road, Lagos State",
    timestamp: "10th June 05:22PM",
  },
];

export const PackageStatus = () => {
  return (
    <div>
      <Stepper activeStep={2} orientation="vertical">
        {steps.map((step) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          return (
            <Step key={step.title} active>
              <div className="flex">
                <div className="rounded-full outline outline-2 outline-[#0169AF] p-[2px]">
                  <CheckIcon className="w-4 h-4 text-[#0169AF]" />
                </div>
              </div>
              <StepContent>
                <div className="flex flex-col gap-2">
                  <h1 className="font-bold">{step.title}</h1>
                  <div className="flex items-center">
                    <p className="text-sm">{step.description}</p>
                    <div className="flex-1" />
                    <p className="text-sm">{step.timestamp}</p>
                  </div>
                </div>
              </StepContent>
            </Step>
          );
        })}
      </Stepper>
    </div>
  );
};
