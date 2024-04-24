import { ApiResponse } from "@/models"
import { GroupedTransactions, Transaction } from "@/models/transactions"

export type GetTransactionsParams = {
    startDate: string,
    endDate: string,
    page?: number
}

export type GetGroupedTransactionsResponse = ApiResponse & {
    transactions: GroupedTransactions[],
    page?: number,
    count: number
}

export type GetTransactionByReferenceParams = {
    reference: string,
    page?: number
}

export type GetTransactionByAgencyParams = {
    AgencyName: string,
    startDate?: string,
    endDate?: string,
    page?: number
}

export type DownloadReportParams = {
    startDate?: string,
    endDate?: string
}

export type GetTransactionByPaymentRefParams = {
    paymentRef: string
}


export type GetTransactionsResponse = ApiResponse & {
    Transaction: Transaction[],
    count: number
}

export type GetTransactionsByReferenceResponse = ApiResponse & {
    Transactions: Transaction[],
    count: number
}

export type GetTransactionsByAgencyResponse = ApiResponse & {
    Transaction: Transaction[],
    count: number
}

export type GetTransactionByPaymentRefResponse = ApiResponse & {
    Transaction: Transaction
}

export type VerifyReferenceParams = {
    reference: string
}

export type DashboardInfoResponseParams = ApiResponse & {
    AllTransaction: number,
    TotalAmount: number,
    Agency: number,
    FailTransaction: number,
    SuccessfulTransaction: number,
    PendingTransaction: number,
    WeeklyTransactions: ({
        count: number,
        dayOfWeek: string
    })[],
    WeeklyAnalytics: ({
        status: string,
        count: number,
        percentage: number
    })[]
}

export type MakePaymentParams = {
    paymentRef: string,
    amountPaid: number,
    reference: string,
    email: string,
    AgencyName: string,
    RevName: string,
    OraAgencyRev: string,
    RevenueCode: string,
    PayerName: string,
    AgencyCode: string
}

export type PrintReceiptParams = {
    PaymentRef: string
}

export type MakePaymentResponse = ApiResponse & {
    ReceiptNumber: string
}