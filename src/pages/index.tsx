import DashboardLayout from "@/components/layout/dashboard";
import { Overview } from "@/components/page_components/dashboard/Overview";

export default function Home() {
  return (
    <DashboardLayout>
      <div className="flex flex-col px-4 py-8 gap-8">
        <Overview />
      </div>
    </DashboardLayout>
  );
}
