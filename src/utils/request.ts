import axios from "axios";
import { BASE_URL } from "./constants";
import AuthToken from "./AuthToken";

type RequestType = "GET" | "POST" | "PUT" | "DELETE"
type RequestConfig = {
    path: string,
    method?: RequestType,
    body?: any,
    headers?: any
}


export async function request(params: RequestConfig) {
    const url = `${BASE_URL}/${params.path}`
    const token = AuthToken().retrieveToken()

    try {
        const { data } = await axios(url, {
            method: params.method ?? "POST",
            data: params.body,
            headers: {
                ...params.headers,
                "Authorization": token ? `Bearer ${token}` : undefined
            }
        })
        return data
    } catch (error) {
        throw error
    }

}