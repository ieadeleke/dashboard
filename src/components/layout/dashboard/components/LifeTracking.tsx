import { Input } from "@/components/input/Input"
import { SearchIcon } from "lucide-react"

export const LifeTracking = () => {
    return <div className="flex flex-col gap-4">
        <div className="flex py-2 items-center">
            <p className="font-bold">Life Tracking</p>
            <div className="flex-1" />
            <Input containerProps={{
                className: "bg-white w-[300px] text-black"
            }} placeholder="Search" startIcon={<SearchIcon className="text-gray-300" />} />
        </div>

        <div className="h-[400px] bg-white rounded-lg" />
    </div>
}