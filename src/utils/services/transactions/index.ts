import { request } from "../../request"
import { GetGroupedTransactionsResponse, GetTransactionByAgencyParams, GetTransactionByReferenceParams, GetTransactionsByAgencyResponse, GetTransactionsByReferenceResponse, GetTransactionsParams, GetTransactionsResponse } from "./types"


export function TransactionService() {

    async function getTransactions(payload: GetTransactionsParams) {
        const data = await request({
            path: `v1/admin/Transaction/GetTransactions`,
            method: "PUT",
            body: payload
        })
        return data as GetTransactionsResponse
    }

    async function getGroupedTransactions(payload: GetTransactionsParams) {
        const data = await request({
            path: `v1/admin/Transaction/GetTransactionsGrouped`,
            body: payload,
            method: "PUT"
        })
        return data as GetGroupedTransactionsResponse
    }

    async function getTransactionsByReference(payload: GetTransactionByReferenceParams) {
        const data = await request({
            path: `v1/abc/GetTransactionByReference`,
            body: payload,
            method: "PUT"
        })
        return data as GetTransactionsByReferenceResponse
    }

    async function getTransactionsByAgency(payload: GetTransactionByAgencyParams) {
        const data = await request({
            path: `v1/admin/Transaction/GetTransactionAgency`,
            body: payload,
            method: "PUT"
        })
        return data as GetTransactionsByAgencyResponse
    }

    return {
        getTransactions,
        getGroupedTransactions,
        getTransactionsByReference,
        getTransactionsByAgency
    }
}