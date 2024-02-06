import { request } from "../../request"
import { GetGroupedTransactionsResponse, GetTransactionsParams, GetTransactionsResponse } from "./types"


export function TransactionService() {

    async function getTransactions(payload: GetTransactionsParams) {
        const { data } = await request(`v1/abc/GetTransactions`, "PUT", {
            body: payload
        })
        return data as GetTransactionsResponse
    }

    async function getGroupedTransactions(payload: GetTransactionsParams) {
        const { data } = await request(`v1/abc/GetTransactionsGrouped`, "PUT", {
            body: payload
        })
        return data as GetGroupedTransactionsResponse
    }

    return {
        getTransactions,
        getGroupedTransactions
    }
}