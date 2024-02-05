import { TransactionTable } from "@/components/transactions/TransactionTable";

export const TransactionDetails = () => {
  return (
    <div className="flex flex-col gap-4">
      <TransactionTable name="Recent Transactions" />
    </div>
  );
};
