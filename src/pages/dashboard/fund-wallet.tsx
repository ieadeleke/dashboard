import DashboardLayout from "@/components/layout/dashboard";
import WalletIcon from '@/assets/icons/ic_wallet.svg'
import { IconButton } from "@/components/buttons/IconButton";
import { ArrowDown, EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import Button from "@/components/buttons";

type TransactionItemProps = {
  type: "debit" | "credit"
}

const TransactionItem = (props: TransactionItemProps) => {
  return <div className="bg-white px-4 py-2 shadow rounded-lg">
    <div className="flex items-center gap-3">
      <div className={`flex flex-col justify-center items-center w-8 h-8 ${props.type == 'debit' ? 'bg-red-300' : 'bg-green-200'} rounded-full`}>
        <ArrowDown className={`${props.type == 'debit' ? 'text-red-800' : 'text-green-800'}`} />
      </div>

      <div>
        <p className="font-medium">Delivery Fee</p>
        <p className="font-light text-sm">Feb 12, 2023</p>
      </div>

      <div className="flex-1" />

      <p className={`${props.type == 'debit' ? 'text-red-800' : 'text-green-800'}`}>-N1200.00</p>
    </div>
  </div>
}
export default function FundWallet() {
  const [showBalance, setShowBalance] = useState(false)

  function toggleShowBalance() {
    setShowBalance((value) => !value)
  }

  return <DashboardLayout>
    <div className="flex flex-col px-4 py-8 gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-xl">Fund Wallet</h1>
      </div>

      <div className="flex flex-col gap-12 md:flex-row md:items-center">
        <div className="flex flex-col justify-between bg-primary rounded-lg p-3 h-48 md:w-[60%] lg:w-[60%]">
          <h1>My Wallet</h1>

          <div className="flex items-center gap-6">
            <h1 className="font-semibold text-2xl">{showBalance ? `$12, 000.00` : '$XXXXX.XX'}</h1>
            <IconButton className="hover:bg-transparent" onClick={toggleShowBalance}>
              {showBalance ? <EyeOffIcon /> : <EyeIcon />}
            </IconButton>
          </div>

          <div className="flex items-center">
            <div className="flex items-center gap-2">
              <p className="text-green-500">+3.47%</p>
              <p>This Week</p>
            </div>

            <div className="flex-1" />

            <div className="flex items-center gap-2">
              <WalletIcon />
              <p>Top Up</p>
            </div>
          </div>
        </div>

        <Button className="flex-1">
          Fund Wallet
        </Button>
      </div>

      <div className="flex flex-col gap-6">
        <h1 className="font-medium text-xl">Recent Transactions</h1>
        <div className="flex flex-col gap-4">
          <TransactionItem type="debit" />
          <TransactionItem type="credit" />
          <TransactionItem type="debit" />
          <TransactionItem type="debit" />
          <TransactionItem type="credit" />
        </div>
      </div>
    </div>
  </DashboardLayout>
}
