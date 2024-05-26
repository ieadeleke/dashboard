export type GetSettlementAccountsParams = {
    page?: number
}

export type GetAllSettlementsParams = {
    page?: number,
    from?: string,
    to?: string,
    subaccount_id: string
}