import { request } from "@/utils/request";
import {
  FinalizeSettlementParams,
  GetAccountSettlementParams,
  GetCalculatedSettlementAccountsParams,
  GetSettlementAccountsParams,
  InitiateSettlementParams
} from "./types";
import { ApiResponse } from "../types";
import {
  GetAccountSettlementResponse,
  Settlement,
  SettlementAccount,
} from "@/models/settlements";

const getSettlementAccounts = async (payload: GetSettlementAccountsParams) => {
  const data = await request({
    path: `v1/settlement/GetSettlementAccount?page=${payload.page ?? 1}`,
    method: "GET",
  });
  return data as ApiResponse & {
    SettlementAccounts: SettlementAccount[];
    count: number;
  };
};

const getCalculatedSettlementAccounts = async (payload: GetCalculatedSettlementAccountsParams) => {
  const data = await request({
    path: `v1/settlement/CalculateSettlement?page=`,
    method: "POST",
    body: payload
  });
  return data as ApiResponse & {
    Transaction: GetAccountSettlementResponse[];
    count: number;
  };
};

const getAccountSettlements = async (params: GetAccountSettlementParams) => {
  const data = await request({
    path: `v1/settlement/GetAccountSettlement?page=${params.page ?? 1}&from=${
      params.from
    }&to=${params.to}`,
    method: "PUT",
    body: {
      account_number: params.account_number,
    },
  });
  return data as ApiResponse & {
    AccountSettlement: GetAccountSettlementResponse[];
    count: number;
  };
};

const getSettlementTransactions = async (settlement_id: string) => {
  const data = await request({
    path: `v1/settlement/GetSettlementTransaction`,
    method: "PUT",
    body: {
      settlementId: settlement_id,
    },
  });
  return data as ApiResponse & {
    settlement: GetAccountSettlementResponse | null;
  };
};

const initiateSettlement = async (params: InitiateSettlementParams) => {
  const data = await request({
    path: `v1/settlement/InitialSettlement`,
    method: "POST",
    body: params
  });
  return data as any;
};

const finalizeSettlement = async (params: FinalizeSettlementParams) => {
  const data = await request({
    path: `v1/settlement/FinalizeSettlement`,
    method: "PUT",
    body: params
  });
  return data as ApiResponse & any;
};

export const settlementService = {
  getSettlementAccounts,
  getAccountSettlements,
  getSettlementTransactions,
  getCalculatedSettlementAccounts,
  initiateSettlement,
  finalizeSettlement
};
