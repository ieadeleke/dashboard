import { DetailedHTMLProps, ImgHTMLAttributes } from "react";
import { cn } from "../../lib/utils";
import Image from "next/image";

type AvatarProps = DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>

export const Avatar = ({ className, ...props }: AvatarProps) => {
    // return <Image alt="" width={"auo"} height={0} style={{ width: "100%", height: "auto" }}
    //     className={cn('w-7 h-7 rounded-full object-cover object-center', className)} {...props} />

    return <img alt="" style={{ width: "100%", height: "auto" }}
        className={cn('w-7 h-7 rounded-full object-cover object-center', className)} {...props} />
}