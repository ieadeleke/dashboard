import { ApiResponse } from ".."
import { User } from "../users"

export type LoginResponse = ApiResponse & {
    profile: {
        personalInfo: User
    },
    token: string
}

export type SignUpResponse = ApiResponse & {
    status: "OK"
}

export type ActivateUserResponse = ApiResponse & {
    status: "OK"
}

export type ResetPasswordResponse = ApiResponse & {
    status: "OK"
}

export type ConfirmResetPasswordResponse = ApiResponse & {
    status: "OK"
}

export type AuthResponse = ApiResponse & {
    status: "OK"
}

export type UpdateUserResponse = ApiResponse & {
    status: "OK",
    profile: {
        isActive: boolean,
        _id: string,
        loginDisabled: boolean,
        loginCount: number,
        Boats: string[],
        phoneNumber: string,
        lastName: string,
        firstName: string,
        email: string,
        loginReTryTime: string
    }
}

export type ChangePasswordResponse = ApiResponse& {
    status: "OK"
}