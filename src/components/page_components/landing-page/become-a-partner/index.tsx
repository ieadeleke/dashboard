import Button from "@/components/buttons";
import { BuildingIcon, DollarSignIcon, HelpingHandIcon } from "lucide-react";

type PartnerItemProps = {
  title: string;
  description: string;
  icon: JSX.Element;
};

const PartnerItem = (props: PartnerItemProps) => {
  return (
    <div className="flex flex-col shadow rounded-lg p-3 gap-4 bg-white text-black">
      <div className="self-start bg-primary-50 p-1 rounded-full">
        <DollarSignIcon className="text-primary" />
      </div>

      <div>
        <h1 className="font-bold">Ready to Start Earning An Income?</h1>
        <p className="text-sm text-gray-800">
          Lorem ipsum dolor sit amet consectetur. Quis tempus velit sit iaculis
          integer diam{" "}
        </p>
      </div>
    </div>
  );
};

const data: PartnerItemProps[] = [
  {
    title: "Ready to Start Earning An Income?",
    description:
      "Lorem ipsum dolor sit amet consectetur. Quis tempus velit sit iaculis integer diam ",
    icon: <DollarSignIcon className="text-primary" />,
  },
  {
    title: "Passive Income Made Easy",
    description:
      "Lorem ipsum dolor sit amet consectetur. Dictum diam feugiat feugiat ullamcorper mi.",
    icon: <HelpingHandIcon className="text-primary" />,
  },
  {
    title: "Above 18 Years? You too can Earn",
    description:
      "Lorem ipsum dolor sit amet consectetur. Donec consequat proin eu felis odio turpis enim commodo egestas.",
    icon: <BuildingIcon className="text-primary" />,
  },
  {
    title: "Above 18 Years? You too can Earn",
    description:
      "Lorem ipsum dolor sit amet consectetur. Donec consequat proin eu felis odio turpis enim commodo egestas.",
    icon: <BuildingIcon className="text-primary" />,
  },
];

export const BecomeAPartner = () => {
  return (
    <div className="flex flex-col gap-8 bg-[#333333] text-white px-4 py-4 md:px-8 md:py-8 md:gap-16">
      <h2 className="text-primary font-bold text-center text-2xl">
        Become a Partner
      </h2>

      <div className="grid grid-cols-1 gap-16 items-center lg:grid-cols-2">
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="font-bold text-2xl">
              Unlock the Earning Potential of Logistics
            </h1>
            <p>
              Explore the possibilities of earning passive income, gaining
              valuable skills, and freelancing to earn simultaneously.
            </p>
          </div>

          <div className="grid grid-cols-1 grid-rows-2 gap-4 md:grid-cols-2">
            {data.map((item) => (
              <PartnerItem key={item.title} {...item} />
            ))}
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:w-[80%] md:gap-8">
            <Button className="flex-1">Sign Up</Button>

            <Button variant="outlined" className="flex-1">
              Sign in
            </Button>
          </div>
        </div>

        <div style={{
          backgroundImage: `url(https://res.cloudinary.com/dfzhxlgll/image/upload/v1704877549/eko%20mile/partner_phone_ftgp2u.png)`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }} className="h-[500px] bg-transparent" />
      </div>
    </div>
  );
};
