import { cn } from "@/lib/utils";

type OverviewItemProps = {
  title: string;
  description: string;
  icon?: JSX.Element;
  iconClassName?: string;
};

export const OverviewItem = (props: OverviewItemProps) => {
  return (
    <div className="flex items-center rounded-lg gap-4 p-4 py-10 bg-white">
      <div className="flex flex-col flex-1">
        <p className="font-medium">{props.title}</p>
        <p className="font-bold">{props.description}</p>
      </div>

      <div className={cn("rounded-full p-2", props.iconClassName)}>
        {props.icon}
      </div>
    </div>
  );
};