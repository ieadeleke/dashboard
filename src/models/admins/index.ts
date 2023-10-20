
export type Admin = {
    superAdmin: boolean,
    isActive: boolean,
    status: false,
    loginDisabled: false,
    loginCount: false,
    _id: string,
    personalInfo: {
        firstName: string,
        lastName: string,
        email: string,
        phoneNumber: string
    },
    phoneNumber: string,
    email: string,
    addedBy: string,
    roleId: string | null
}