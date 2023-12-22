import { IconButton } from "@/components/buttons/IconButton";
import { ListFilterIcon } from "lucide-react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export const DailyAnalytics = () => {
  return (
    <div className="flex flex-col gap-4 bg-white rounded-lg p-4">
      <div className="flex items-center">
        <p className="flex-1">
          Daily Analytics: <span className="font-bold ml-3">50</span>
        </p>

        <IconButton className="bg-primary">
          <ListFilterIcon />
        </IconButton>
      </div>

      <div>
        <CircularProgressbar
          styles={buildStyles({
            // Rotation of path and trail, in number of turns (0-1)
            rotation: 0.25,

            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
            strokeLinecap: "butt",
            // Text size
            textSize: "16px",
            pathColor: "#FFB60B",
            textColor: "black",
            // How long animation takes to go from one percentage to another, in seconds
            pathTransitionDuration: 0.5,
            trailColor: "#d6d6d6",
          })}
          className="w-40 h-40 mt-10"
          value={60}
          text={`${60}%`}
        />
      </div>

      <div className="flex flex-col items-end">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-4 aspect-square bg-primary" />
            <p>50% Successful deliveries</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-4 aspect-square bg-primary-100" />
            <p>0% Pending deliveries</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-4 aspect-square bg-primary" />
            <p>0% Failed deliveries</p>
          </div>
        </div>
      </div>
    </div>
  );
};
