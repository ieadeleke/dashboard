import { RecentActivityItem } from "./recent-activity/RecentActivityItem";

export const RecentActivity = () => {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-medium">Recent Activity</p>

      <div className="flex flex-col gap-4">
        <RecentActivityItem />
        <RecentActivityItem />
      </div>
    </div>
  );
};
