import Button from "@/components/buttons"
import { BuildingIcon, DollarSignIcon, HelpingHandIcon } from "lucide-react"

type PartnerItemProps = {
    title: string,
    description: string,
    icon: JSX.Element
}

const PartnerItem = (props: PartnerItemProps) => {
    return <div className="flex flex-col shadow rounded-lg p-3 gap-4 bg-white text-black">
        <div className="self-start bg-primary-50 p-1 rounded-full">
            <DollarSignIcon className='text-primary' />
        </div>

        <div>
            <h1 className="font-bold">Ready to Start Earning An Income?</h1>
            <p className="text-sm text-gray-800">Lorem ipsum dolor sit amet consectetur. Quis tempus velit sit iaculis integer diam </p>
        </div>
    </div>
}

const data: PartnerItemProps[] = [
    {
        title: "Ready to Start Earning An Income?",
        description: "Lorem ipsum dolor sit amet consectetur. Quis tempus velit sit iaculis integer diam ",
        icon: <DollarSignIcon className="text-primary" />
    },
    {
        title: "Passive Income Made Easy",
        description: "Lorem ipsum dolor sit amet consectetur. Dictum diam feugiat feugiat ullamcorper mi.",
        icon: <HelpingHandIcon className="text-primary" />
    },
    {
        title: "Above 18 Years? You too can Earn",
        description: "Lorem ipsum dolor sit amet consectetur. Donec consequat proin eu felis odio turpis enim commodo egestas.",
        icon: <BuildingIcon className="text-primary" />
    },
    {
        title: "Above 18 Years? You too can Earn",
        description: "Lorem ipsum dolor sit amet consectetur. Donec consequat proin eu felis odio turpis enim commodo egestas.",
        icon: <BuildingIcon className="text-primary" />
    },
]

export const BecomeAPartner = () => {
    return <div className="flex flex-col gap-16 bg-[#333333] text-white px-16 py-16">
        <h2 className="text-primary font-bold text-center text-2xl">Become a Partner</h2>

        <div className="grid grid-cols-2 min-h-[500px] gap-16 items-center">

            <div className='flex flex-col gap-8'>
                <div>
                    <h1 className="font-bold text-2xl">Unlock the Earning Potential of Logistics</h1>
                    <p>Explore the possibilities of earning passive income, gaining valuable skills, and freelancing to earn simultaneously.</p>
                </div>

                <div className="grid grid-cols-2 grid-rows-2 gap-4">
                    {data.map((item) => <PartnerItem key={item.title} {...item} />)}
                </div>

                <div className="flex items-center gap-8 w-[50%]">
                    <Button className="flex-1">
                        Sign Up
                    </Button>

                    <Button variant="outlined" className="flex-1">
                        Sign in
                    </Button>
                </div>
            </div>

            <div className="h-full bg-black" />
        </div>
    </div>
}