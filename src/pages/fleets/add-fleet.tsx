import { IconButton } from "@/components/buttons/IconButton";
import DashboardLayout from "@/components/layout/dashboard";
import SEO from "@/components/SEO";
import { XIcon } from "lucide-react";
import { useRouter } from "next/router";


export default function AddFleet() {
    const router = useRouter()

    return <DashboardLayout>
        <div className="pt-10">
            <SEO title="Laswa | Add Fleets" />
            <div className="flex flex-col gap-4">
                <div className="flex items-center">
                    <h1 className="text-3xl font-bold">Add Fleet</h1>
                    <div className="flex-1" />
                    <IconButton onClick={router.back} className="p-2">
                        <XIcon />
                    </IconButton>
                </div>
            </div>
        </div>
    </DashboardLayout>
}