import { ApiResponse } from "@/models"
import { GroupedTransactions, Transaction } from "@/models/transactions"

export type GetTransactionsParams = {
    startDate: string,
    endDate: string,
    page?: number
}

export type GetAllMDAsParams = {
    page?: number,
}

export type GetAllMDAsResponse = ApiResponse & {
    MDAs: any,
    page: number,
    count: number,
}

export type AllowMDAsParams = {
    MDAId?: string,
}

export type AllowMDAsResponse = ApiResponse & {
    MDA: {
        _id: string,
        allowConsultantSplitting: boolean,
        approveBy: string
    }
}

export type DisableMDAsParams = {
    MDAId?: string,
}

export type DisableMDAsResponse = ApiResponse & {
    MDA: {
        _id: string,
        allowConsultantSplitting: boolean,
        approveBy: string
    }
}

export type ApproveMDAsParams = {
    MDAId?: string,
}

export type ApproveMDAResponse = ApiResponse & {
    Consultant: {
        _id: string,
        name: string,
        approveBy: string,
        approve: boolean,
    }
}