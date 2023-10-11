
export type SignUpParams = {
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    password: string
}

export type ActivateUserParams = {
    email: string,
    activationCode: string
}

export type LoginParams = {
    email: string,
    password: string
}

export type ResetPasswordParams = {
    email: string
}

export type ConfirmResetPasswordParams = {
    email: string,
    activationCode: string,
    newPassword: string
}

export type UpdateUserParams = {
    firstName: string,
    lastName: string
}

export type ChangePasswordParams = {
    oldPassword: string,
    newPassword: string
}