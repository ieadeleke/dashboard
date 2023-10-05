import { faker } from "@faker-js/faker/locale/af_ZA"

type Operator = {
    id: string,
    name: string,
    email: string,
    owners_name: string
}

export function getOperatorsData(size: number): Operator[] {
    return Array(size).fill(0).map(() => ({
        id: faker.string.alpha({ length: 6 }),
        name: faker.person.fullName(),
        owners_name: faker.person.fullName(),
        email: faker.internet.email()
    }))
}