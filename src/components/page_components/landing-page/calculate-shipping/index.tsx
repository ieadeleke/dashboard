import Button from "@/components/buttons";
import { TextField } from "@/components/input/InputText";
import { Checkbox } from "@/components/ui/checkbox";
import calculatorImage from "@/assets/images/service_calculator.png";

export const CalculateShipping = () => {
  return (
    <div className="flex flex-col px-3 py-16 gap-4 md:px-16 md:gap-16">
      <h2 className="text-primary font-bold text-center text-2xl">
        Calculate Shipping
      </h2>

      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[65%,35%]">
        <div
          style={{
            backgroundImage: `url(${calculatorImage.src})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: "center",
          }}
          className="h-[500px] bg-transparent"
        />

        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold md:text-4xl">Service Calculator</h1>
          <p className="text-sm font-semibold">
            Starting form. Basic calculated fields sample.
          </p>

          <div className="flex flex-col gap-6">
            <div>
              <p className="text-sm">Pickup Address</p>
              <TextField.Container className="flex flex-col justify-start outline outline-1 outline-gray-200">
                <TextField.Input placeholder="" />
              </TextField.Container>
            </div>

            <div>
              <p className="text-sm">Dropoff Address</p>
              <TextField.Container className="flex flex-col justify-start outline outline-1 outline-gray-200">
                <TextField.Input placeholder="" />
              </TextField.Container>
            </div>

            <div>
              <p className="text-sm">Weight</p>
              <TextField.Container className="flex flex-col justify-start outline outline-1 outline-gray-200">
                <TextField.Input placeholder="" />
              </TextField.Container>
            </div>

            <div className="flex items-center gap-4">
              <div>
                <p className="text-sm">Length</p>
                <TextField.Container className="flex flex-col justify-start outline outline-1 outline-gray-200">
                  <TextField.Input placeholder="" />
                </TextField.Container>
              </div>

              <div>
                <p className="text-sm">Width</p>
                <TextField.Container className="flex flex-col justify-start outline outline-1 outline-gray-200">
                  <TextField.Input placeholder="" />
                </TextField.Container>
              </div>

              <div>
                <p className="text-sm">Height</p>
                <TextField.Container className="flex flex-col justify-start outline outline-1 outline-gray-200">
                  <TextField.Input placeholder="" />
                </TextField.Container>
              </div>
            </div>

            <div>
              <p className="text-sm">Fragile</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Checkbox />
                  <p>Yes</p>
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox />
                  <p>No</p>
                </div>
              </div>
            </div>

            <Button>Calculate</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
