export type SettlementAccount = {
    subAccount: string[],
    meta: string[],
    _id: string,
    id: number,
    account_number: string,
    account_bank: number,
    full_name: string,
    split_type: string,
    split_value: number,
    subaccount_id: string,
    bank_name: string,
    createdAt: string,
    updatedAt: string
}

export type Settlement = {
    id: string,
    account_id: string,
    merchant_name: string,
    merchant_email: string,
    settlement_account: string,
    bank_code: string,
    transaction_date: string,
    due_date: string,
    processed_date: string,
    status: string,
    is_local: boolean,
    currency: string,
    gross_amount: string,
    app_fee: string,
    merchant_fee: string,
    chargeback: string,
    refund: string,
    stampduty_charge: string,
    net_amount: string,
    transaction_count: string,
    processor_ref: string,
    disburse_ref: string,
    disburse_message: string,
    channel: string,
    destination: string,
    fx_data: boolean,
    flag_message: null,
    source_bankcode: string,
    created_at: string,
    meta: string[],
    refund_meta: string[],
    chargeback_meta: string[],
    transactions?: SettlementTransaction[]
}

export type SettlementTransaction = {
    customer_email: string,
    flw_ref: string,
    tx_ref: string,
    id: string,
    charged_amount: string,
    app_fee: string,
    merchant_fee: string,
    stampduty_charge: string,
    settlement_amount: string,
    status: string,
    payment_entity: string,
    transaction_date: string,
    currency: string,
    card_locale: string,
    rrn: string,
    subaccount_settlement: string
}