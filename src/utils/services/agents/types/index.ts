import { ApiResponse } from "@/models"
import { GroupedTransactions, Transaction } from "@/models/transactions"

export type GetTransactionsParams = {
    startDate: string,
    endDate: string,
    page?: number
}

export type GetAllAgentsParams = {
    page?: number,
}

export type GetAllAgentsResponse = ApiResponse & {
    Agents: any,
    page: number,
    count: number,
}

export type AddAgentParams = {
    email: string,
    userName: string,
    phoneNumber: string,
    firstName: string,
    lastName: string,
    profileType: string
}

export type AddAgentResponse = ApiResponse & {
    message: string,
    status: string
}
export type SuspendAgentParams = {
    userId: string
}
export type FetchAgentWalletParams = {
    walletId: string
    page?: number
}

export type FetchAgentWalletResponse = {
    message: string
    status: string
    count: number
    Transactions: any[]
}

export type FetchAgentTransactionsParams = {
    userId: string
    page?: number
    startDate: string
    endDate: string
}

export type FetchAgentTransactionsResponse = {
    message: string
    status: string
    count: number
    Transaction: any[]
}

export type SuspendAgentResponse = ApiResponse & {
    message: string,
    user: {
        _id: string,
        firstName: string,
        lastName: string,
        email: string,
        userName: string,
        phoneNumber: string,
        isActive: boolean
    }
}

export type FreezeAgentParam = {
    accountNumber: string,
}

export type FreezeAgentResponse = ApiResponse & {
    message: string,
    user: {
        _id: string,
        firstName: string,
        lastName: string,
        email: string,
        userName: string,
        phoneNumber: string,
        isActive: boolean
    }
}

export type FundWalletParams = {
    accountNumber: string,
    amount: number,
    fee?: number,
    vat?: number,
    description?: string
}

export type FundWalletResponse = ApiResponse & {
    message: string,
    status: string
}

export type UpdateWalletParams = {
    accountNumber: string,
    tier: string
}

export type UpdateWalletResponse = ApiResponse & {
    message: string,
    status: string
}