import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { HTMLAttributes, InputHTMLAttributes } from "react";

export type InputProps = InputHTMLAttributes<HTMLInputElement>

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }: InputProps, ref) => {

    return <input ref={ref} className={cn("bg-transparent outline-none border-none px-0 py-3 w-full", className)} {...props} />
})

const TextFieldContainer = (containerProps: HTMLAttributes<HTMLDivElement>) => {
    const { className, ...props } = containerProps

    return <div className={cn(`flex items-center bg-gray1 rounded-md px-3 gap-4 text-text-color`, className)} {...props} />
}

export const TextField = {
    Container: TextFieldContainer,
    Input: Input
}