import { cn } from "@/lib/utils";

type OverviewItemProps = {
  title: string;
  description: string;
  icon?: JSX.Element;
  iconClassName?: string;
};

export const OverviewItem = (props: OverviewItemProps) => {
  return (
    <div className="flex items-center rounded-lg gap-4 px-2 p-4 py-10">
      <div className="flex flex-col flex-1">
        <p className="font-medium line-clamp-1">{props.title}</p>
        <p className="font-bold">{props.description}</p>
      </div>

      <div className={cn("rounded-full p-2", props.iconClassName)}>
        {props.icon}
      </div>
    </div>
  );
};