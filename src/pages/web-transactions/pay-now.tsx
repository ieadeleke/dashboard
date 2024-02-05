
import logo from "@/assets/images/lagos_govt_logo.png";
import {
  InputProps,
  RegularTextInput,
} from "@/components/input/RegularTextInput";
import { cn } from "@/lib/utils";
import Button from "@/components/buttons";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/dashboard";

const TextInput = ({ className, ...props }: InputProps) => (
  <RegularTextInput className={cn("w-96", className)} {...props} />
);

export default function PayNow() {
  const router = useRouter();
  const [formFields, setFormFields] = useState({
    reference: "",
    name: "",
    amount: "",
  });

  useEffect(() => {
    const { reference, name, amount } = router.query;
    if (!reference || !name || !amount) {
      alert("invalid session");
      router.push("/web-transactions");
      return;
    }
    setFormFields({
      reference: reference as string,
      amount: amount as string,
      name: name as string,
    });
  }, [router.query]);

  return (
    <DashboardLayout>
      <div className="mt-12 min-h-[500px] flex flex-col items-center">
        <div className="flex flex-col">
          <img src={logo.src} className="w-12 self-center" />

          <div className="flex flex-col">
            <h1 className="font-bold text-2xl text-primary text-center">
              Lagos State Internal Revenue Service
            </h1>

            <div className="flex flex-col gap-6 mt-8">
              <div className="flex flex-col gap-2">
                <p className="font-medium">Billing Reference *</p>
                <TextInput disabled defaultValue={formFields.reference} placeholder="" />
              </div>

              <div className="flex flex-col gap-2">
                <p className="font-medium">Revenue Name *</p>
                <TextInput disabled defaultValue={formFields.name} placeholder="" />
              </div>

              <div className="flex flex-col gap-2">
                <p className="font-medium">Service Charge *</p>
                <TextInput disabled defaultValue={formFields.amount} placeholder="" />
              </div>
            </div>

            <Button className="w-60 h-12 mt-8 self-center" variant="contained">
              Pay Now
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
