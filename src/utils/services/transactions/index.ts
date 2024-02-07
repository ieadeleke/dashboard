import { request } from "../../request"
import { GetGroupedTransactionsResponse, GetTransactionByReferenceParams, GetTransactionsByReferenceResponse, GetTransactionsParams, GetTransactionsResponse } from "./types"


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

    async function getTransactionsByReference(payload: GetTransactionByReferenceParams) {
        const { data } = await request(`v1/abc/GetTransactionByReference`, "PUT", {
            body: payload
        })
        return data as GetTransactionsByReferenceResponse
    }

    return {
        getTransactions,
        getGroupedTransactions,
        getTransactionsByReference
    }
}