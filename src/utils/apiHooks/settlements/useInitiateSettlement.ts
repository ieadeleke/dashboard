import { useState } from "react";
import { useApi } from "../index";
import { settlementService } from "@/utils/services/settlements";
import { GetAccountSettlementResponse, Settlement } from "@/models/settlements";
import { InitiateSettlementParams } from "@/utils/services/settlements/types";

export const useInitiateSettlement = () => {
  const [data, setData] = useState<any>(null);
  const { isLoading, error, execute } = useApi();

  async function initiateSettlement(params: InitiateSettlementParams) {
    setData(null);
    const response = await execute(
      async () =>
        await settlementService.initiateSettlement(params)
    );
    if (response) {
      setData({
        found: true,
        ...response
      });
    }
  }

  return { isLoading, error, data, initiateSettlement };
};