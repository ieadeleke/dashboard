import { ApiResponse } from "@/models"
import { Payment } from "@/models/payment"

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