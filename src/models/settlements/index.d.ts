export type SettlementAccount = {
  subAccount: string[];
  meta: string[];
  _id: string;
  id: number;
  account_number: string;
  account_bank: number;
  full_name: string;
  split_type: string;
  split_value: number;
  subaccount_id: string;
  bank_name: string;
  createdAt: string;
  updatedAt: string;
};

export type Settlement = {
  id: string;
  account_id: string;
  merchant_name: string;
  merchant_email: string;
  settlement_account: string;
  bank_code: string;
  transaction_date: string;
  due_date: string;
  processed_date: string;
  status: string;
  is_local: boolean;
  currency: string;
  gross_amount: string;
  app_fee: string;
  merchant_fee: string;
  chargeback: string;
  refund: string;
  stampduty_charge: string;
  net_amount: string;
  transaction_count: string;
  processor_ref: string;
  disburse_ref: string;
  disburse_message: string;
  channel: string;
  destination: string;
  fx_data: boolean;
  flag_message: null;
  source_bankcode: string;
  created_at: string;
  meta: string[];
  refund_meta: string[];
  chargeback_meta: string[];
  transactions?: SettlementTransaction[];
};

export type SettlementTransaction = {
  customer_email: string;
  flw_ref: string;
  tx_ref: string;
  id: string;
  charged_amount: string;
  app_fee: string;
  merchant_fee: string;
  stampduty_charge: string;
  settlement_amount: string;
  status: string;
  payment_entity: string;
  transaction_date: string;
  currency: string;
  card_locale: string;
  rrn: string;
  subaccount_settlement: string;
};

export type GetAccountSettlementResponse = {
  _id: string;
  amountSettle: string;
  serviceCharge: string;
  account_name: string;
  account_number: string;
  bank_name: string;
  numberOfTransaction: number;
  SettleDate: string;
  transactionIds?: {
    NotificationDetails?: {
      WebGuid: string;
      ResponseCode: string;
      ResponseDesc: string;
      ReceiptNumber: string;
      State: string;
      Status: string;
      TransID: number;
      TransCode: string;
      StatusMessage: string;
      Receipt: string[];
      PropertyAddress: null;
    };
    PaymentStatus: boolean;
    subAccount: string[];
    subaccounts?: [
      {
        id: string;
        transaction_charge_type: string;
        transaction_charge: number;
        account_number: string;
        account_bank: string;
        bank_name: string;
      }
    ];
    Status: string;
    Mode: string;
    settlementStatus: string;
    _id: string;
    AgencyCode: string;
    AgencyName: string;
    PayerName: string;
    RevenueCode: string;
    reference: string;
    OraAgencyRev: string;
    RevName: string;
    amountPaid: string;
    email: string;
    paymentRef: string;
    mobile: string;
    serviceCharge: string;
    Pid: string;
    CreditAccount: string;
    createdAt: string;
    updatedAt: string;
    PaymentGateway: string;
    paymentDetails?: {
      status: string;
      message: string;
      data: {
        id: string;
        tx_ref: string;
        flw_ref: string;
        device_fingerprint: string;
        amount: number;
        currency: NGN;
        charged_amount: number;
        app_fee: number;
        merchant_fee: 0;
        processor_response: string;
        auth_model: string;
        ip: string;
        narration: string;
        status: string;
        payment_type: string;
        created_at: string;
        account_id: string;
        card?: {
          first_6digits: string;
          last_4digits: string;
          issuer: string;
          country: string;
          type: string;
          token: string;
          expiry: string;
        };
        meta: {
          __CheckoutInitAddress: string;
        };
        amount_settled: number;
        customer: {
          id: string;
          name: string;
          phone_number: string;
          email: string;
          created_at: string;
        };
      };
    };
    transaction_id: number;
  }[];
  createdAt: string;
  settlementStatus: boolean;
};
