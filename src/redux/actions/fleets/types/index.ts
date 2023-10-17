import { Fleet } from "@/models/fleets";

export type UpdateFleet = {
    fleet_id: string,
    data: Partial<Fleet>
}