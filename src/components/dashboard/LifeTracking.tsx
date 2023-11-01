import { SearchIcon, XIcon } from "lucide-react"
import { ChangeEvent, useMemo, useRef, useState } from "react"
import { IconButton } from "../buttons/IconButton"
import { TextField } from "../input/InputText"
import { DefaultMap } from "../map/DefaultMap"

export const LifeTracking = () => {
    const [value, setValue] = useState('')
    const inputRef = useRef<HTMLInputElement | null>(null)
    const isEmpty = useMemo(() => value.trim().length == 0, [value])

    function onChangeText(event: ChangeEvent<HTMLInputElement>) {
        setValue(event.target.value.trimLeft())
    }

    function clearSearchValue(){
        inputRef.current?.focus()
        setValue('')
    }

    return <div className="flex flex-col gap-4">
        <div className="flex flex-col py-2 gap-2 md:flex-row md:items-center">
            <p className="font-bold">Live Tracking</p>
            <div className="flex-1" />
            <TextField.Container className="w-[300px] bg-white text-text-color">
                <SearchIcon />
                <TextField.Input ref={inputRef} value={value} onChange={onChangeText} placeholder="Search..." />
                <IconButton className={`${isEmpty ? 'hidden' : 'block'} -mx-2`} onClick={clearSearchValue}>
                    <XIcon />
                </IconButton>
            </TextField.Container>
        </div>

        <div className="min-h-[400px] bg-white rounded-lg">
            <DefaultMap />
        </div>
    </div>
}