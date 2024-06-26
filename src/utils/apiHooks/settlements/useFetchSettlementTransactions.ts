import { useState } from "react";
import { useApi } from "../index";
import { settlementService } from "@/utils/services/settlements";
import { GetAccountSettlementResponse, Settlement } from "@/models/settlements";

export const useFetchSettlementTransactions = () => {
  const [data, setData] = useState<GetAccountSettlementResponse | null>(null);
  const { isLoading, error, execute } = useApi();

  async function fetchSettlementTransactions(settlement_id: string) {
    setData(null);
    const response = await execute(
      async () =>
        await settlementService.getSettlementTransactions(settlement_id)
    );
    if (response) {
      setData(response.settlement);
    }
  }

  return { isLoading, error, data, fetchSettlementTransactions };
};
