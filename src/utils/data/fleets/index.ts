import { Fleet, FleetStatus } from '@/models/fleets';
import { faker } from '@faker-js/faker'

// function getRandomFleetStatus(): FleetStatus {
//     const statuses: FleetStatus[] = ["pending", "suspended", "active"];
//     const randomIndex = Math.floor(Math.random() * statuses.length);
//     return statuses[randomIndex];
// }

// export function getFleetData(size: number): Fleet[] {
//     return Array(size).fill(0).map(() => ({
//         id: faker.string.numeric({ length: 8 }),
//         image: faker.image.url(),
//         seats: faker.number.int({ min: 2, max: 10 }),
//         status: getRandomFleetStatus()
//     }))
// }

export function formatFleet(fleet: Fleet){
    return {
        ...fleet,
        status: fleet.status.toLowerCase(),
        image: faker.image.url()
    }
}

export function parseFleetStatus(status: FleetStatus) {
    return status == 'active' ? "Active" : status == "pending" ? "Pending" : status == 'suspended' ? "Suspended" : "Complete"
}