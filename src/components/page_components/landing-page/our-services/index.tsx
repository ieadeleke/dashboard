import { CarIcon, HeadphonesIcon, HistoryIcon, TrainTrackIcon } from "lucide-react"

type ServiceItemProps = {
    title: string,
    description: string,
    icon: JSX.Element
}

const ServiceItem = (props: ServiceItemProps) => {
    return <div className="flex flex-col items-center gap-8">
        {props.icon}
        <div className="text-center">
            <h2 className="font-bold">{props.title}</h2>
            <p className="text-gray-500 text-sm">{props.description}</p>
        </div>
    </div>
}

const data: ServiceItemProps[] = [
    {
        title: "Easy Booking",
        description: "Lorem ipsum dolor sit amet consectetur. Aenean consectetur cursus viverra turpis at habitant.",
        icon: <HistoryIcon className="text-primary" />
    },
    {
        title: "Real time Tracking",
        description: "Follow the delivery of your packages in real time. We provide our clients with real time tracking and progress report.",
        icon: <TrainTrackIcon className="text-primary" />
    },
    {
        title: "Seamless Delivery",
        description: "We provide the best delivery options that way guaranteeing timely and trustworthy deliveries to our customers.",
        icon: <CarIcon className="text-primary" />
    },
    {
        title: "24/7 Support",
        description: "Support team available 24/7 to tend to your concerns and enquires about your delivery",
        icon: <HeadphonesIcon className="text-primary" />
    },
]
export const OurServices = () => {
    return <div className="flex flex-col gap-16">
        <div className="flex flex-col items-center text-center max-w-[75%] self-center gap-4">
            <h2 className="text-primary font-bold">OUR SERVICES</h2>
            <div>
                <h1 className="text-3xl">Unlock a <span className="text-primary">World</span> of Benefits.</h1>
                <p>Our platform offers a simple and seamless process for sending your packages, from tracking it to receiving  the package.
                </p>
            </div>
        </div>

        <div className="grid grid-cols-2 h-[500px] gap-8">
            <div className="h-full bg-black" />

            <div className="grid grid-cols-2 grid-rows-2 gap-4 h-full">
                {data.map((item) => <div className="w-full h-full bg-[#F9FAFB] flex flex-col justify-center px-2">
                    <ServiceItem key={item.title} {...item} />
                </div>)}
            </div>
        </div>
    </div>
}