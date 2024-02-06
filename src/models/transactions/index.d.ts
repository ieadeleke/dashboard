export type Transaction = {
    _id: string,
    AgencyCode: string,
    AgencyName: string,
    PayerName: string,
    RevenueCode: string,
    reference: string,
    OraAgencyRev: string,
    RevName: string,
    amountPaid: 20000,
    paymentRef: string,
    NotificationDetails: {
        WebGuid: string,
        ResponseCode: string,
        ResponseDesc: string,
        ReceiptNumber: string,
        State: string,
        Status: string,
        TransID: string,
        TransCode: string,
        StatusMessage: string,
        Receipt: [],
        PropertyAddress: null
    },
    paymentDetails: {
        status: string,
        message: string,
        data: {
            id: string,
            tx_ref: string,
            flw_ref: string,
            device_fingerprint: string,
            amount: string,
            currency: string,
            charged_amount: string,
            app_fee: string,
            merchant_fee: string,
            processor_response: string,
            auth_model: string,
            ip: string,
            narration: string,
            status: string,
            payment_type: string,
            created_at: string,
            account_id: string,
            meta: {
                __CheckoutInitAddress: string,
            },
            amount_settled: 19720,
            customer: {
                id: string,
                name: string,
                phone_number: string,
                email: string,
                created_at: string,
            }
        }
    },
    createdAt: string,
    updatedAt: string
}

export type GroupedTransactions = {
    _id: string,
    totalAmountPaid: number,
    transactions: Transaction[]
}