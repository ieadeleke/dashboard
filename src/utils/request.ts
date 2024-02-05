import axios from "axios";
import { BASE_URL } from "@/utils/constants";

type RequestType = "GET" | "POST" | "PUT" | "DELETE"

export type RequestConfig = {
    req?: any,
    body?: any
}


export async function request(route: string, method: RequestType, config?: RequestConfig) {
    const url = `${BASE_URL}/${route}`

    try {
        const response = await axios(url, {
            method,
            data: config?.body
        })
        return response
    } catch (error) {
        throw error
    }

}