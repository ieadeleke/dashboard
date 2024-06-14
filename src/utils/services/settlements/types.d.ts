export type GetSettlementAccountsParams = {
  page?: number;
};

export type GetAllSettlementsParams = {
  page?: number;
  from?: string;
  to?: string;
  account_number: string;
};

export type GetAccountSettlementParams = {
  account_number: string;
  page?: number;
  from?: string;
  to?: string;
};
