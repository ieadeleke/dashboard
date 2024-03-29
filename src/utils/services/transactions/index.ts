import { request } from "../../request"
import { GetGroupedTransactionsResponse, GetTransactionByAgencyParams, GetTransactionByPaymentRefParams, GetTransactionByReferenceParams, GetTransactionsByAgencyResponse, GetTransactionByPaymentRefResponse, GetTransactionsByReferenceResponse, GetTransactionsParams, GetTransactionsResponse, DownloadReportParams } from "./types"


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

    async function getTransactionByPaymentRef(payload: GetTransactionByPaymentRefParams) {
        const data = await request({
            path: `v1/admin/Transaction/GetTransactionByPaymentRef`,
            body: payload,
            method: "PUT"
        })
        return data as GetTransactionByPaymentRefResponse
    }

    async function downloadReport(payload: DownloadReportParams) {
        const data = await request({
            path: `v1/admin/Transaction/DownloadReport`,
            body: payload,
            method: "PUT"
        })
        return data as GetTransactionByPaymentRefResponse
    }

    return {
        getTransactions,
        getGroupedTransactions,
        getTransactionsByReference,
        getTransactionsByAgency,
        getTransactionByPaymentRef,
        downloadReport
    }
}