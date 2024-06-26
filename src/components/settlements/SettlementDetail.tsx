import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GetAccountSettlementResponse, Settlement } from "@/models/settlements";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import Button from "../buttons";
import { formatDate } from "@/utils/formatters/formatDate";
import { formatAmount } from "@/utils/formatters/formatAmount";
import { useFetchSettlementTransactions } from "@/utils/apiHooks/settlements/useFetchSettlementTransactions";
import { NetworkRequestContainer } from "../states/NetworkRequestContainer";
import { Divider } from "../Divider";

type SettlementDetailsPayload = {
  data: GetAccountSettlementResponse;
};

type SettlementDetailsProps = {};

export type SettlementDetailsRef = {
  open: (payload: SettlementDetailsPayload) => void;
  close?: () => void;
};

type DetailItemProps = {
  data: {
    title: string;
    value: string;
  };
};

const DetailItem = (props: DetailItemProps) => {
  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="name" className="text-left text-gray-600">
        {props.data.title}
      </Label>
      <Input
        id="name"
        disabled
        value={props.data.value}
        className="col-span-3"
      />
    </div>
  );
};

export const SettlementDetails = forwardRef<
  SettlementDetailsRef,
  SettlementDetailsProps
>((_, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const [settlement, setSettlement] = useState<GetAccountSettlementResponse>();
  const {
    fetchSettlementTransactions,
    isLoading: isFetchSettlementLoading,
    error: fetchSettlementError,
    data: fetchedSettlements,
  } = useFetchSettlementTransactions();

  useImperativeHandle(ref, () => ({
    open(payload: SettlementDetailsPayload) {
      setSettlement(payload.data);
      setIsVisible(true);
    },
    close() {
      closeModal();
    },
  }));

  function fetchData() {
    if (settlement) {
      fetchSettlementTransactions(settlement._id);
    }
  }

  useEffect(() => {
    if (fetchedSettlements) {
      setSettlement(fetchedSettlements);
    }
  }, [fetchedSettlements]);

  useEffect(() => {
    fetchData();
  }, [isVisible]);

  function closeModal() {
    setIsVisible(false);
  }

  function handlePrintReceipt() {}

  function handleGenerateReceipt() {}

  return (
    <Dialog open={isVisible} onOpenChange={setIsVisible}>
      {settlement && (
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-scroll no-scrollbar">
          <DialogHeader>
            <DialogTitle>Settlement Info</DialogTitle>
            <DialogDescription>Full details summary</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <DetailItem
              data={{
                title: "Account Name",
                value: settlement.account_name,
              }}
            />
            <DetailItem
              data={{
                title: "Account Number",
                value: settlement.account_name,
              }}
            />
            <DetailItem
              data={{
                title: "Bank Name",
                value: settlement.bank_name,
              }}
            />
            <DetailItem
              data={{
                title: "Service Charge",
                value: formatAmount(settlement.serviceCharge),
              }}
            />
            <DetailItem
              data={{
                title: "Transaction Date",
                value: formatDate(settlement.createdAt),
              }}
            />
            <DetailItem
              data={{
                title: "Settled Date",
                value: formatDate(settlement.SettleDate),
              }}
            />

            <DetailItem
              data={{
                title: "Number of Transactions",
                value: settlement.SettleDate,
              }}
            />
          </div>

          <NetworkRequestContainer
            isLoading={isFetchSettlementLoading}
            error={fetchSettlementError}
            onRetry={fetchData}
          >
            <div className="flex flex-col">
              {(settlement.transactionIds ?? [])
                .filter((item) => typeof item !== "string")
                .map((transaction, index) => {
                  return (
                    <div
                      key={transaction._id}
                      className="flex flex-col gap-4 mb-4"
                    >
                      <div className="flex items-center gap-8">
                        <Divider className="flex-1" />
                        <h1 className="text-2xl font-semibold">
                          Transactions #{index + 1}
                        </h1>
                        <Divider className="flex-1" />
                      </div>
                      <DetailItem
                        data={{
                          title: "Amount Paid",
                          value: formatAmount(transaction.amountPaid),
                        }}
                      />
                      <DetailItem
                        data={{
                          title: "Service charge",
                          value: formatAmount(transaction.serviceCharge),
                        }}
                      />
                      <DetailItem
                        data={{
                          title: "Date",
                          value: formatDate(transaction.createdAt),
                        }}
                      />

                      {transaction.paymentDetails && (
                        <div className="flex flex-col">
                          <p className="font-semibold text-black">
                            Payment Info
                          </p>
                          <div className="grid gap-4 py-4">
                            <DetailItem
                              data={{
                                title: "Currency",
                                value: transaction.paymentDetails.data.currency,
                              }}
                            />
                            <DetailItem
                              data={{
                                title: "Payment Method",
                                value:
                                  transaction.paymentDetails.data.auth_model,
                              }}
                            />
                            <DetailItem
                              data={{
                                title: "Channel Reference",
                                value: transaction.paymentDetails.data.flw_ref,
                              }}
                            />
                            <DetailItem
                              data={{
                                title: "Revenue Code",
                                value: transaction.RevenueCode,
                              }}
                            />
                            <DetailItem
                              data={{
                                title: "Transaction Refenrence",
                                value: transaction.paymentDetails.data.tx_ref,
                              }}
                            />
                          </div>
                        </div>
                      )}

                      {transaction.paymentDetails &&
                        transaction.paymentDetails.data.card && (
                          <div className="flex flex-col">
                            <p className="font-semibold text-black">
                              Card Info
                            </p>
                            <div className="grid gap-4 py-4">
                              <DetailItem
                                data={{
                                  title: "First 6 Digits",
                                  value:
                                    transaction.paymentDetails.data.card
                                      .first_6digits,
                                }}
                              />
                              <DetailItem
                                data={{
                                  title: "Last 6 Digits",
                                  value:
                                    transaction.paymentDetails.data.card
                                      .last_4digits,
                                }}
                              />
                              <DetailItem
                                data={{
                                  title: "Country",
                                  value:
                                    transaction.paymentDetails.data.card
                                      .country,
                                }}
                              />
                              <DetailItem
                                data={{
                                  title: "Card Type",
                                  value:
                                    transaction.paymentDetails.data.card.type,
                                }}
                              />
                            </div>
                          </div>
                        )}

                      {transaction.paymentDetails &&
                        transaction.paymentDetails.data.customer && (
                          <div className="flex flex-col">
                            <p className="font-semibold text-black">Customer</p>
                            <div className="grid gap-4 py-4">
                              <DetailItem
                                data={{
                                  title: "Name",
                                  value: `${transaction.paymentDetails.data.customer.name}`,
                                }}
                              />
                            </div>
                          </div>
                        )}

                      {transaction.subaccounts && (
                        <div className="flex flex-col">
                          <p className="font-semibold text-black">
                            Settlements
                          </p>
                          <div className="grid gap-4 py-4">
                            {transaction.subaccounts.map((account) => {
                              return (
                                <div
                                  key={account.id}
                                  className="flex flex-col gap-2 pb-8"
                                >
                                  <DetailItem
                                    data={{
                                      title: "Account Number",
                                      value: account.account_number,
                                    }}
                                  />
                                  <DetailItem
                                    data={{
                                      title: "Sort Code",
                                      value: account.account_bank,
                                    }}
                                  />
                                  <DetailItem
                                    data={{
                                      title: "Amount",
                                      value: formatAmount(
                                        account.transaction_charge
                                      ),
                                    }}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {transaction.paymentDetails ? (
                        <div className="flex flex-col">
                          <p className="font-semibold text-black">
                            Customer Info
                          </p>
                          <div className="grid gap-4 py-4">
                            <DetailItem
                              data={{
                                title: "Name",
                                value:
                                  transaction.paymentDetails.data.customer.name,
                              }}
                            />
                            <DetailItem
                              data={{
                                title: "Email",
                                value:
                                  transaction.paymentDetails.data.customer
                                    .email,
                              }}
                            />
                            <DetailItem
                              data={{
                                title: "Phone Number",
                                value:
                                  transaction.paymentDetails.data.customer
                                    .phone_number,
                              }}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col">
                          <p className="font-semibold text-black">
                            Customer Info
                          </p>
                          <div className="grid gap-4 py-4">
                            <DetailItem
                              data={{
                                title: "Name",
                                value: transaction.PayerName,
                              }}
                            />
                            <DetailItem
                              data={{
                                title: "Email",
                                value: transaction.email,
                              }}
                            />
                            <DetailItem
                              data={{
                                title: "Phone Number",
                                value: transaction.mobile,
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </NetworkRequestContainer>

          <DialogFooter className="gap-4">
            <Button onClick={closeModal} type="submit">
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
});

SettlementDetails.displayName = "SettlementDetails";
