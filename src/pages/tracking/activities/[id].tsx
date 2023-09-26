import { TextField } from "@/components/input/InputText";
import DashboardLayout from "@/components/layout/dashboard";
import SearchIcon from '@/assets/icons/ic_search.svg'
import { ActivityItem } from "@/components/dashboard/RecentActivities";
import { Divider } from "@/components/Divider";
import { IconButton } from "@/components/buttons/IconButton";
import { MoreHorizontalIcon } from "lucide-react";

export default function Tracking() {

    return (
        <DashboardLayout>
            <div className="flex flex-col py-8 gap-8">

                <div className="flex flex-col gap-2 md:flex-row md:items-center">
                    <h1 className="font-bold text-lg">Recent Activities</h1>
                    <div className="flex-1" />

                    <TextField.Container className="bg-white rounded-lg border border-gray-100">
                        <SearchIcon className="text-gray-200" />
                        <TextField.Input placeholder="Search" />
                    </TextField.Container>
                </div>


                <div className="flex flex-col bg-white rounded-md">

                    <div className="flex items-center px-2 py-4">
                        <h2 className="font-bold">Recent Activities</h2>
                        <div className="flex-1" />
                        <IconButton className="text-gray-500">
                            <MoreHorizontalIcon />
                        </IconButton>

                    </div>
                    <Divider />

                    <div className="flex flex-col">
                        {Array(20).fill(0).map((item) => <ActivityItem />)}
                    </div>
                </div>

            </div>
        </DashboardLayout>
    )
}
