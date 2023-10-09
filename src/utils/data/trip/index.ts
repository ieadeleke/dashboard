import { faker } from '@faker-js/faker'

export type TripStatus = "active" | "complete" | "canceled"

export type Trip = {
    id: string,
    start: string,
    destination: string,
    ship_id: string,
    status: TripStatus
}

function getRandomTripStatus(): TripStatus {
    const statuses: TripStatus[] = ["active", "complete", "canceled"];
    const randomIndex = Math.floor(Math.random() * statuses.length);
    return statuses[randomIndex];
}

export function getTripData(size: number): Trip[] {
    return Array(size).fill(0).map(() => ({
        id: faker.string.numeric({ length: 8 }),
        start: faker.location.streetAddress(),
        destination: faker.location.streetAddress(),
        ship_id: faker.string.numeric({ length: 8 }),
        status: getRandomTripStatus()
    }))
}

export function parseTripStatus(status: TripStatus){
    return status == 'active' ? "Active" : status == "canceled" ? "Canceled" : "Complete"
}