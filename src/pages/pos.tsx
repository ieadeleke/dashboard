import { TextField } from "@/components/input/InputText";
import DashboardLayout from "@/components/layout/dashboard";
import { TransactionTable } from "@/components/transactions/TransactionTable";
import { SearchIcon } from "lucide-react";
import { useState } from "react";

export default function POS() {
  const [searchWord, setSearchWord] = useState("");
  const [terminalId, setTerminalID] = useState("");

  function onSubmit() {
    setTerminalID(searchWord);
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col px-4 py-8 gap-8">
        <form
          onSubmit={(evt) => {
            evt.preventDefault();
            onSubmit();
          }}
        >
          <TextField.Container className="bg-gray-200">
            <SearchIcon />
            <TextField.Input
              defaultValue={searchWord}
              onChange={(evt) => setSearchWord(evt.target.value)}
              placeholder="Search by terminal ID"
            />
          </TextField.Container>
        </form>

        <div>
          {terminalId.trim().length > 0 && (
            <TransactionTable
              name={`Showing recent Transactions for "${terminalId}"`}
            />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
