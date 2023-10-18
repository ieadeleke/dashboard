import axios from "axios";
import Router from "next/router";
import AuthToken from "./AuthToken";
import { BASE_URL } from "./constants/strings";
import { errorHandler } from "./errorHandler";

type RequestType = "GET" | "POST" | "PUT" | "DELETE"

export type RequestConfig = {
    req?: any,
    body?: any
}


export async function request(route: string, method: RequestType, config?: RequestConfig) {
    const url = `${BASE_URL}/${route}`
    const token = AuthToken().retrieveToken(config?.req)

    try {
        const response = await axios(url, {
            method,
            data: config?.body,
            headers: {
                "Authorization": token ? `Bearer ${token}` : undefined
            }
        })
        return response
    } catch (error) {
        const errorData = errorHandler(error)
        if (errorData.status == 401 || errorData.message == 'Not authenticated') {
            if (typeof window != "undefined") {
                Router.push('/login')
                // localStorage.clear()
                AuthToken().clearToken()
            }
            throw error
        }
        throw error
    }

}