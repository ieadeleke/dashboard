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

export type InitiatePaymentParams = {
    paymentRef: string,
    amountPaid: number,
    reference: string,
    email: string,
    AgencyName: string,
    RevName: string,
    OraAgencyRev: string,
    RevenueCode: string,
    PayerName: string,
    AgencyCode: string,
    pan: string,
    expiry: string,
    cvv: string,
    cardholder: string,
    mobile: string,
    pin: string
}

export type PrintReceiptParams = {
    PaymentRef: string
}

export type MakePaymentResponse = ApiResponse & {
    ReceiptNumber: string
}


export type InitiatePaymentWithUpperLinkParams = {
    paymentRef: string,
    amountPaid: number,
    reference: string,
    email: string,
    AgencyName: string,
    RevName: string,
    OraAgencyRev: string,
    RevenueCode: string,
    PayerName: string,
    AgencyCode: string,
    serviceCharge: string,
    mobile: string
}

export type InitiatePaymentWithUpperLinkResponse = {
    Transaction: Payment
}

export type UpperLinkPaymentNotificationParams = {
    reference: string
}

export type UpperLinkPaymentNotificationResponse = {
    reference: string
}