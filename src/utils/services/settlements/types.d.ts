export type GetSettlementAccountsParams = {
  page?: number;
};

export type GetCalculatedSettlementAccountsParams = {
  Date?: any;
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

export type FinalizeSettlementParams = {
  settlementId: string
}

export type InitiateSettlementParams = {
    Date: Date,
    account_number?: string,
}