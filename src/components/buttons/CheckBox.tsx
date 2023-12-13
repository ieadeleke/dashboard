import { cn } from "@/lib/utils"
import { CheckIcon } from "lucide-react"
import { useEffect } from "react"
import { useMemo } from "react"
import { useState } from "react"

type CheckBoxProps = {
    isChecked?: boolean,
    checkIconClassName?: string,
    onValueChange?: (value: boolean) => void
}

export const CheckBox = ({checkIconClassName, ...props}: CheckBoxProps) => {
    const [isChecked, setIsChecked] = useState(props.isChecked ?? false)

    const className = useMemo(() => isChecked ? `bg-primary text-white border-none` : `text-transparent`, [isChecked])

    useEffect(() => {
        props.onValueChange?.(isChecked)
    }, [isChecked])

    function toggleState(){
        setIsChecked((checked) => !checked)
    }

    return <input type="checkbox" checked={props.isChecked} onChange={(event) => props.onValueChange?.(event.target.checked)} />
    
    return <div onClick={toggleState} className={`border border-gray-200 rounded-sm p-[2px] cursor-pointer ${className}`}>
        <CheckIcon className={cn(`w-4 h-4`, checkIconClassName)} />
    </div>
}