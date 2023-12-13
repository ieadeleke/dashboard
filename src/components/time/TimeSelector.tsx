import { ChangeEvent, useEffect } from "react"
import { useState } from "react"

type TimeSelectorProps = {
    onValueChanged?: (value: string) => void
}

export const TimeSelector = (props: TimeSelectorProps) => {
    const [hour, setHour] = useState(12)
    const [minute, setMinute] = useState(30)
    const [timeOfDay, setTimeOfDay] = useState<"am" | "pm">("am")

    useEffect(() => {
        props.onValueChanged?.(`${hour}:${minute} ${timeOfDay == 'am' ? "AM" : "PM"}`)
    }, [timeOfDay, hour, minute])

    function updateHour(event: ChangeEvent<HTMLInputElement>) {
        const value = parseInt(event.target.value)
        setHour(isNaN(value) ? 12 : value)
    }

    function updateMinute(event: ChangeEvent<HTMLInputElement>) {
        const value = parseInt(event.target.value)
        setMinute(isNaN(value) ? 12 : value)
    }

    
    function updateTimeOfDay(time: "am" | "pm") {
        setTimeOfDay(time)
    }

    return <div className="flex gap-2">
    <div>
        <input inputMode="numeric" maxLength={2} value={hour} onChange={updateHour} placeholder="00" className="border p-2 w-12 text-center" />
        <p className="text-xs">Hour</p>
    </div>

    <h1 className="text-lg font-bold mt-2">:</h1>

    <div >
        <input inputMode="numeric" maxLength={2} onChange={updateMinute} value={minute} placeholder="00" className="border p-2 w-12 text-center" />
        <p className="text-xs">Minute</p>
    </div>

    <div className="flex flex-col border">
        <p onClick={() => updateTimeOfDay("am")} className={`${timeOfDay == 'am' ? 'bg-gray-200' : 'bg-transparent'} px-2 text-sm flex-1 text-center pt-1 cursor-pointer`}>AM</p>
        <p onClick={() => updateTimeOfDay("pm")} className={`${timeOfDay == 'pm' ? 'bg-gray-200' : 'bg-transparent'} flex-1 px-2 text-sm text-center pt-1 cursor-pointer`}>PM</p>
    </div>
</div>
}