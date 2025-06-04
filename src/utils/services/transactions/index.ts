import { request } from "../../request";
import {
  GetGroupedTransactionsResponse,
  GetTransactionByAgencyParams,
  GetTransactionByPaymentRefParams,
  GetTransactionByReferenceParams,
  GetTransactionsByAgencyResponse,
  GetTransactionByPaymentRefResponse,
  GetTransactionsByReferenceResponse,
  GetTransactionsParams,
  GetTransactionsResponse,
  DownloadReportParams,
  DashboardInfoResponseParams,
} from "./types";

export function TransactionService() {
  async function getTransactions(payload: GetTransactionsParams) {
    const data = await request({
      path: `v1/admin/Transaction/GetTransactions?page=${payload.page ?? 1}`,
      method: "PUT",
      body: payload,
    });
    return data as GetTransactionsResponse;
  }

  async function getGroupedTransactions(payload: GetTransactionsParams) {
    const data = await request({
      path: `v1/admin/Transaction/GetTransactionsGrouped?page=${
        payload.page ?? 1
      }`,
      body: payload,
      method: "PUT",
    });
    return data as GetGroupedTransactionsResponse;
  }

  async function getTransactionsByReference(
    payload: GetTransactionByReferenceParams
  ) {
    const data = await request({
      path: `v1/admin/Transaction/GetTransactionByReference?page=${
        payload.page ?? 1
      }`,
      body: payload,
      method: "PUT",
    });
    return data as GetTransactionsByReferenceResponse;
  }

  async function getTransactionsByAgency(
    payload: GetTransactionByAgencyParams
  ) {
    const data = await request({
      path: `v1/admin/Transaction/GetTransactionAgency?page=${
        payload.page ?? 1
      }`,
      body: payload,
      method: "PUT",
    });
    return data as GetTransactionsByAgencyResponse;
  }

  async function getTransactionByPaymentRef(
    payload: GetTransactionByPaymentRefParams
  ) {
    const data = await request({
      path: `v1/admin/Transaction/GetTransactionByPaymentRef`,
      body: payload,
      method: "PUT",
    });
    return data as GetTransactionByPaymentRefResponse;
  }

  async function downloadReport(payload: DownloadReportParams) {
    const data = await request({
      path: `v1/admin/Transaction/DownloadReport?startDate=${payload.startDate}&endDate=${payload.endDate}`,
      responseType: "blob",
      headers: {
        Accept: "application/csv",
      },
      method: "GET",
    });
    return data as any;
  }

  async function dashboardInfo() {
    const data = await request({
      path: `v1/admin/Transaction/DashboardInfo`,
      method: "GET",
    });
    return data as DashboardInfoResponseParams;
  }

  async function dashboardInfoDownload() {
    const data = await request({
      path: `v1/admin/Transaction/DashboardInfoDownload`,
      method: "GET",
    });
    return data;
  }

  return {
    getTransactions,
    getGroupedTransactions,
    getTransactionsByReference,
    getTransactionsByAgency,
    getTransactionByPaymentRef,
    dashboardInfo,
    downloadReport,
    dashboardInfoDownload
  };
}
