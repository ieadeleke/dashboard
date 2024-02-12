import { request } from "../../request"
import { Reference } from "@/models/reference"
import { InitiatePaymentParams, InitiatePaymentWithUpperLinkParams, InitiatePaymentWithUpperLinkResponse, MakePaymentParams, MakePaymentResponse, PrintReceiptParams, UpperLinkPaymentNotificationParams, UpperLinkPaymentNotificationResponse, VerifyReferenceParams } from "./types"


export function ChargeService() {

    async function verifyReference(payload: VerifyReferenceParams) {
        const { data } = await request(`v1/abc/ReferenceVerification`, "POST", {
            body: payload
        })
        return data as Reference
    }

    async function makePayment(payload: MakePaymentParams) {
        const { data } = await request(`v1/abc/Payment`, "POST", {
            body: payload
        })
        return data as MakePaymentResponse
    }

    async function printReceipt(payload: PrintReceiptParams) {
        const { data } = await request(`v1/abc/ReceiptReprint`, "POST", {
            body: payload
        })
        return data as Reference
    }

    async function initiatePayment(payload: InitiatePaymentParams) {
        const { data } = await request(`v1/abc/InitialPayWithEgoPay`, "POST", {
            body: payload
        })
        return data as MakePaymentResponse
    }

    async function initiatePaymentWithUpperlink(payload: InitiatePaymentWithUpperLinkParams) {
        const { data } = await request(`v1/abc/InitiateUpperLinkPayment`, "POST", {
            body: payload
        })
        return data as InitiatePaymentWithUpperLinkResponse
    }

    async function upperLinkNotification(payload: UpperLinkPaymentNotificationParams) {
        const { data } = await request(`v1/abc/UpperLinkPaymentNotification`, "POST", {
            body: payload
        })
        return data as UpperLinkPaymentNotificationResponse
    }

    return {
        verifyReference,
        makePayment,
        printReceipt,
        initiatePayment,
        initiatePaymentWithUpperlink,
        upperLinkNotification
    }
}