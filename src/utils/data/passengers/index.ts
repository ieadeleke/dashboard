import { faker } from '@faker-js/faker'

export type Passenger = {
    id: string,
    name: string,
    image: string,
    status: "Lorem",
    seats: number
}


export function getPassengersData(size: number): Passenger[] {
    return Array(size).fill(0).map(() => ({
        id: faker.string.numeric({ length: 8 }),
        image: faker.image.url(),
        seats: faker.number.int({ min: 2, max: 10 }),
        status: "Lorem",
        name: faker.person.fullName()
    }))
}