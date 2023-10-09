import { faker } from "@faker-js/faker/locale/af_ZA"

export type Admin = {
    id: string,
    name: string,
    image: string,
    department: string,
    phone_number: string,
    email: string
}

export function getAdminData(size: number): Admin[]{
    return Array(size).fill(0).map(() => ({
        id: faker.string.numeric({ length: 8 }),
        image: faker.image.url(),
        department: faker.person.jobDescriptor(),
        phone_number: faker.phone.number(),
        email: faker.internet.email(),
        name: faker.person.fullName()
    }))
}