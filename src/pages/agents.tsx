import DashboardLayout from "@/components/layout/dashboard";
import { TransactionTable } from "@/components/transactions/TransactionTable";

export default function Agents() {
  return (
    <DashboardLayout>
      <div className="flex flex-col px-4 py-8 gap-8">
        <div>
          {/* <TransactionTable name="Recent Transactions" transactions={[]} /> */}
        </div>
      </div>
    </DashboardLayout>
  );
}
