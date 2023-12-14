import { User } from "../users";

export type Operator = User & {
    isActive: boolean,
    approve: boolean,
    BusinessProfile?: {
        verify: boolean,
        _id: string,
        state: string,
        localGovt: string,
        postalCode: string,
        areaOfOperation: string,
        companyName: string,
        companyAddress: string,
        NIN: string,
        User: string,
        CAC?: {
            name: string,
            url: string
        },
        businessOwner?: {
            name: string,
            url: string
        },
        OperationalLicense?: {
            name: string,
            url: string,
        },
        CACForm2?: {
            name: string,
            url: string
        },
        CACForm?: {
            name: string,
            url: string
        }
    },
}