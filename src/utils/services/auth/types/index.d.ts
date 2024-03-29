import { Profile } from "@/models/profile"
import { ApiResponse } from "../../types"

export type SignUpParams = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phoneNumber: string
}

export type VerifySignUpParams = {
    receivedChannel: string,
    activationCode: string
}

export type LoginParams = {
    email: string,
    password: string
}

export type ResetPasswordParams = {
    receivedChannel: string
}

export type ConfirmResetPasswordParams = {
    receivedChannel: string,
    activationCode: string,
    newPassword: string
}

export type SignUpResponseParams = ApiResponse & {

}

export type LoginResponseParams = ApiResponse & {
    profile: {
        personalInfo: Profile
    },
    token: string
}