import { cn } from '@/lib/utils';
import React, { forwardRef, HTMLAttributes } from 'react';

interface ForwardRefStackrops extends HTMLAttributes<HTMLDivElement> {
    direction?: "row" | "column"
}

const Stack = forwardRef<HTMLDivElement, ForwardRefStackrops>((props, ref) => {
    const { direction, className, ...rest } = props

    return <div ref={ref} className={cn(`flex ${direction == 'row' ? 'flex-row' : 'flex-col'}`, className)} {...rest} />
});

Stack.displayName = "Stack"
export default Stack;
