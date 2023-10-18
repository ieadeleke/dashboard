import { Trip } from '@/models/trips';

export type TripStatus = "active" | "complete" | "canceled" | "pending"


export function formatTrip(trip: Trip) {
    return {
        ...trip,
        status: trip.status == 'Active' ? "active" : trip.status == 'Cancelled' ? 'canceled' : trip.status == 'Complete' ? "complete" : "pending"
    }
}

export function formatTrips(trips: Trip[]) {
    return trips.map((trip) => formatTrip(trip))
}

export function parseTripStatus(status: TripStatus) {
    return status == 'active' ? "Active" : status == "canceled" ? "Canceled" : status == 'pending' ? "Pending" : "Complete"
}