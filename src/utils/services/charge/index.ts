import { request } from "../../request"
import { Reference } from "@/models/reference"
import { InitiatePaymentParams, InitiatePaymentWithUpperLinkParams, InitiatePaymentWithUpperLinkResponse, MakePaymentParams, MakePaymentResponse, PrintReceiptParams, UpperLinkPaymentNotificationParams, UpperLinkPaymentNotificationResponse, VerifyReferenceParams } from "./types"


export function ChargeService() {

    async function verifyReference(payload: VerifyReferenceParams) {
       
    }

    async function makePayment(payload: MakePaymentParams) {
      
    }

    async function printReceipt(payload: PrintReceiptParams) {
       
    }

    async function initiatePayment(payload: InitiatePaymentParams) {
      
    }

    async function initiatePaymentWithUpperlink(payload: InitiatePaymentWithUpperLinkParams) {
      
    }

    async function upperLinkNotification(payload: UpperLinkPaymentNotificationParams) {
       
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