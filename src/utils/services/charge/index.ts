import { request } from "../../request"
import { Reference } from "@/models/reference"
import { MakePaymentParams, MakePaymentResponse, PrintReceiptParams, VerifyReferenceParams } from "./types"


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

    return {
        verifyReference,
        makePayment,
        printReceipt
    }
}