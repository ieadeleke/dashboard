import { request } from "@/utils/request"
import { ApiResponse } from "../types"
import { ConfirmResetPasswordParams, LoginParams, LoginResponseParams, ResetPasswordParams, SignUpParams, VerifySignUpParams } from "./types"


export function AuthService() {

    async function signUp(params: SignUpParams) {
        const response = await request({
            path: `v1/auth/signup`,
            method: "POST",
            body: params
        })
        return response as ApiResponse
    }

    async function verifySignUp(params: VerifySignUpParams) {
        const response = await request({
            path: `v1/auth/ActivateUser`,
            method: "POST",
            body: params
        })
        return response as ApiResponse
    }

    async function login(params: LoginParams) {
        const response = await request({
            path: `v1/admin/Login`,
            method: "POST",
            body: params
        })
        return response as LoginResponseParams
    }

    async function resetPassword(params: ResetPasswordParams) {
        const response = await request({
            path: `v1/admin/ResetPassword`,
            method: "PUT",
            body: params
        })
        return response as ApiResponse
    }

    async function confirmResetPassword(params: ConfirmResetPasswordParams) {
        const response = await request({
            path: `v1/admin/ConfirmResetPassword`,
            method: "PUT",
            body: params
        })
        return response as ApiResponse
    }

    return {
        signUp,
        verifySignUp,
        login,
        resetPassword,
        confirmResetPassword
    }
}