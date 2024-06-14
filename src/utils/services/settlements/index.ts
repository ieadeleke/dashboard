import { request } from "@/utils/request";
import {
  GetAccountSettlementParams,
  GetSettlementAccountsParams,
} from "./types";
import { ApiResponse } from "../types";
import { Settlement, SettlementAccount } from "@/models/settlements";

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

const getAccountSettlements = async (params: GetAccountSettlementParams) => {
  const data = await request({
    path: `v1/settlement/GetAccountSettlement?page=${
      params.page ?? 1
    }&from=${params.from}&to=${params.to}`,
    method: "PUT",
    body: {
      account_number: params.account_number,
    },
  });
  return data as ApiResponse & {
    AccountSettlement: Settlement[];
    count: number;
  };
};

const getSettlementTransactions = async (settlement_id: string) => {
  const data = await request({
    path: `v1/settlement/GetAccountTransaction`,
    method: "PUT",
    body: {
      settlementId: settlement_id,
    },
  });
  return data as ApiResponse & {
    settlement: Settlement | null;
  };
};

export const settlementService = {
  getSettlementAccounts,
  getAccountSettlements,
  getSettlementTransactions,
};
