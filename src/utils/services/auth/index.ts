import { ActivateUserResponse, ChangePasswordResponse, ConfirmResetPasswordResponse, LoginResponse, ResetPasswordResponse, SignUpResponse, UpdateUserResponse } from "@/models/auth/AuthResponse"
import { request } from "../../request"
import { ActivateUserParams, ChangePasswordParams, ConfirmResetPasswordParams, LoginParams, ResetPasswordParams, SignUpParams, UpdateUserParams } from "./types"


export function AuthService() {

    async function signUp(payload: SignUpParams) {
        const { data } = await request(`api/v1/auth/Signup`, "POST", {
            body: payload
        })
        return data as SignUpResponse
    }

    async function activateUser(payload: ActivateUserParams) {
        const { data } = await request(`api/v1/auth/ActivateUser`, "POST", {
            body: payload
        })
        return data as ActivateUserResponse
    }

    async function login(payload: LoginParams) {
        const { data } = await request(`api/v1/admin/Login`, "PUT", {
            body: payload
        })
        return data as LoginResponse
    }

    async function resetPassword(payload: ResetPasswordParams) {
        const { data } = await request(`api/v1/admin/ResetPassword`, "PUT", {
            body: payload
        })
        return data as ResetPasswordResponse
    }

    async function confirmResetPassword(payload: ConfirmResetPasswordParams) {
        const { data } = await request(`api/v1/auth/ConfirmResetPassword`, "PUT", {
            body: payload
        })
        return data as ConfirmResetPasswordResponse
    }

    async function updateUser(payload: UpdateUserParams) {
        const { data } = await request(`api/v1/auth/UpdateUser`, "PUT", {
            body: payload
        })
        return data as UpdateUserResponse
    }

    async function changePassword(payload: ChangePasswordParams) {
        const { data } = await request(`api/v1/auth/ChangePassword`, "PUT", {
            body: payload
        })
        return data as ChangePasswordResponse
    }

    return {
        signUp,
        activateUser,
        login,
        resetPassword,
        confirmResetPassword,
        updateUser,
        changePassword
    }

}