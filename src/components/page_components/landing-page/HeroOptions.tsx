import { BuildingIcon, CalculatorIcon, SendIcon } from "lucide-react"

export const HeroOptions = () => {
    return <div className="flex flex-row items-center bg-white shadow p-8 rounded-2xl">
        <div className="flex flex-col flex-1 text-center border-r">
            <SendIcon className="self-center text-primary" />
            <h2 className="font-bold text-lg">Ship Now</h2>
            <p className="text-gray-700 mt-4">Send your package with ease</p>
        </div>

        <div className="flex flex-col flex-1 text-center border-r px-8">
            <CalculatorIcon className="self-center text-primary" />
            <h2 className="font-bold text-lg">Calculate Price</h2>
            <p className="text-gray-700 mt-4">Get a cost estimate </p>
        </div>

        <div className="flex flex-col flex-1 text-center">
            <BuildingIcon className="self-center text-primary" />
            <h2 className="font-bold text-lg">Register as a Business</h2>
            <p className="text-gray-700 mt-4">Create a business account today and enjoy amazing benefits</p>
        </div>
    </div>
}