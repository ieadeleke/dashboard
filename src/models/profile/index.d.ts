export type Profile = {
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string
}


export type Admin = {
    _id: string,
    superAdmin: boolean,
    isActive: boolean,
    status: boolean,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string
    email: string,
    role?: {
        roleName: string,
        _id: string
    },
    privileges: string[]
}

export type Profile = {
    _id: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    isActive: boolean,
    createdAt: string,
    updateAt: string
}

export type SudoProfile = {
    _id: string,
    personalInfo: Profile,
    imgUrl: string,
    profileType: string
}

export type Role = {
    _id: string,
    roleName: string,
    roles: string[]
}

export type Staff = {
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    roleId: string
}
