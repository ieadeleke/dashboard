import { request } from "@/utils/request"
import { GetAllSettlementsParams, GetSettlementAccountsParams } from "./types"
import { ApiResponse } from "../types"
import { Settlement, SettlementAccount } from "@/models/settlements"

const getSettlementAccounts = async (payload: GetSettlementAccountsParams) => {
    const data = await request({
        path: `v1/admin/Transaction/GetSettlementAccounts?page=${payload.page ?? 1}`,
        method: "GET"
    })
    return data as ApiResponse & {
        SettlementAccounts: SettlementAccount[],
        count: number
    }
}

const getAllSettlements = async (payload: GetAllSettlementsParams) => {
    const data = await request({
        path: `v1/admin/Transaction/GetAllSettlement?page=${payload.page ?? 1}&subaccount_id=${payload.subaccount_id}&from=${payload.from}&to=${payload.to}`,
        method: "GET"
    })
    return data as ApiResponse & {
        Settlements: {
            data: Settlement[],
            meta: {
                page_info: {
                    total: number,
                    current_page: number,
                    total_pages: number,
                    page_size: number
                }
            }
        }
    }
}

const getSettlement = async (id: string) => {
    const data = await request({
        path: `v1/admin/Transaction/GetSettlement?id=${id}`,
        method: "GET"
    })
    return data as ApiResponse & {
        Settlements: {
            data: Settlement
        }
    }
}

export const settlementService = {
    getSettlementAccounts,
    getAllSettlements,
    getSettlement
}