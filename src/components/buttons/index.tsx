import { cn } from '@/lib/utils';
import React, { forwardRef, ButtonHTMLAttributes, useMemo, MouseEvent } from 'react';

interface ForwardRefButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "contained" | "text" | "outlined"
}

const Button = forwardRef<HTMLButtonElement, ForwardRefButtonProps>((props, ref) => {
    const { className, disabled, onClick, ...rest } = props

    const bgClassName = useMemo(() => {
        switch (props.variant) {
            case 'contained':
                return 'bg-primary text-white border-none rounded-[3px]'
            case 'outlined':
                return 'bg-transparent border border-solid border-primary text-primary'
            case 'text':
                return 'bg-transparent text-primary'
            default:
                return 'text-primary'
        }
    }, [props.variant])

    function handleOnClick(event: MouseEvent<HTMLButtonElement>) {
        if (!disabled) {
            onClick?.(event)
        }
    }

    return <button className={cn(`rounded-md text-base text-base-semibold ${bgClassName} ${disabled ? 'opacity-50' : ''}`, className)} ref={ref} onClick={handleOnClick} {...rest} />
});
Button.displayName = "Button"
export default Button;
