import {
  InputProps,
  RegularTextInput,
} from "@/components/input/RegularTextInput";
import { cn } from "@/lib/utils";
import { MailIcon } from "lucide-react";

const InputField = ({ className, ...props }: InputProps) => {
  return (
    <RegularTextInput
      className={cn(
        "outline outline-2 outline-[#FFFFFF33] border-none border-0 bg-transparent",
        className
      )}
      {...props}
    />
  );
};

export const ContactUs = () => {
  return (
    <div className="px-16 py-16">
      <div className="flex gap-32">
        <div className="flex flex-col gap-6 mt-16">
          <h1 className="font-bold text-4xl text-white">CONTACT US</h1>

          <div>
            <p className="font-semibold text-white">Global Logistics</p>
            <div className="text-[#A5A9AA]">
              <p>San Francisco, CA 94102, US 1234 Some St</p>
              <p>tel.: +1 (44) 123-45-67</p>
              <p>e-mail: info@yoursite.com</p>
            </div>
          </div>
        </div>

        <div className="-mt-16">
          <div className="w-[1px] h-52 bg-white" />
          <div className="w-3 h-3 bg-white rounded-full -ml-[5px]" />
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-[#A5A9AA]">
            Your email address will not be published. Required fields are marked
            *
          </p>
          <div className="flex flex-col gap-4">
            <InputField placeholder="Name" />
            <InputField placeholder="Email" />
            <InputField placeholder="Subject" />
            <textarea className="h-32 resize-none outline outline-2 outline-[#FFFFFF33] border-none border-0 bg-transparent" />
          </div>

          <div className="flex items-center bg-primary p-4 text-white">
            <h1>SEND MESSAGE</h1>
            <div className="flex-1" />
            <MailIcon />
          </div>
        </div>
      </div>
    </div>
  );
};
