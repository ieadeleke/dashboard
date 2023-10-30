import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { HTMLAttributes, InputHTMLAttributes } from "react";
import { RegularTextInput } from "./RegularTextInput";
import { Input as ShadInput } from "../ui/input";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    error?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, error, ...props }: InputProps, ref) => {

    return <ShadInput ref={ref} className={cn(`bg-transparent outline-none border-none w-full px-3 py-3 ${error ? `focus-within:outline-red-600` : 'focus-within:outline-primary'}`, className)} {...props} />
})

const TextFieldContainer = (containerProps: HTMLAttributes<HTMLDivElement>) => {
    const { className, ...props } = containerProps

    return <div className={cn(`flex flex-col focus-within:outline-red-700 outline-inherit bg-gray1 rounded-md gap-2 text-text-color`, className)} {...props} />
}

const Label = (containerProps: HTMLAttributes<HTMLParagraphElement>) => {
    const { className, ...props } = containerProps

    return <p className={cn(`block`, className)} {...props} />
}


export const TextField = {
    Container: TextFieldContainer,
    Input: Input,
    Label: Label
}

Input.displayName = "TextFieldInput"
TextFieldContainer.displayName = "TextFieldContainer"