import { ApiResponse } from "@/models"
import { GroupedTransactions, Transaction } from "@/models/transactions"

export type GetTransactionsParams = {
    startDate: string,
    endDate: string
}

export type GetGroupedTransactionsResponse = ApiResponse & {
    transactions: GroupedTransactions[],
    count: number
}

export type GetTransactionByReferenceParams = {
    reference: string,
    startDate?: string,
    endDate?: string
}

export type GetTransactionByAgencyParams = {
    AgencyName: string,
    startDate?: string,
    endDate?: string
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

export type VerifyReferenceParams = {
    reference: string
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