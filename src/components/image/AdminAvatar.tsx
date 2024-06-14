import { cn } from "@/lib/utils"
import { DetailedHTMLProps, ImgHTMLAttributes } from "react"

type AvatarProps = DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> & {
    name: string
}

export const AdminAvatar = ({ name, className, ...props }: AvatarProps) => {
    return <div className={cn("rounded-full p-2 px-4 bg-gray-400 flex justify-center items-center", className)}>
        <p className="line-clamp-1">{name.at(0)?.toUpperCase()}</p>
    </div>
}