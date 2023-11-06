import { CheckIcon } from "lucide-react"
import { useEffect } from "react"
import { useMemo } from "react"
import { useState } from "react"

type CheckBoxProps = {
    isChecked?: boolean,
    onValueChange?: (value: boolean) => void
}

export const CheckBox = (props: CheckBoxProps) => {
    const [isChecked, setIsChecked] = useState(props.isChecked ?? false)

    const className = useMemo(() => isChecked ? `bg-primary text-white border-none` : `text-transparent`, [isChecked])

    useEffect(() => {
        props.onValueChange?.(isChecked)
    }, [isChecked])

    function toggleState(){
        setIsChecked((checked) => !checked)
    }
    
    return <div onClick={toggleState} className={`border border-gray-200 rounded-sm p-[2px] cursor-pointer ${className}`}>
        <CheckIcon className={`w-4 h-4`} />
    </div>
}