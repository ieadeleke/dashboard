import { useState } from "react";
import { useApi } from "../index";
import { settlementService } from "@/utils/services/settlements";
import { GetAccountSettlementResponse, Settlement } from "@/models/settlements";
import { FinalizeSettlementParams } from "@/utils/services/settlements/types";

export const useFinalizeSettlement = () => {
  const [data, setData] = useState<any>(null);
  const { isLoading, error, execute } = useApi();

  async function finalizeSettlement(params: FinalizeSettlementParams) {
    setData(null);
    const response = await execute(
      async () =>
        await settlementService.finalizeSettlement(params)
    );
    if (response) {
      setData({
        found: true,
        ...response
      });
    }
  }

  return { isLoading, error, data, finalizeSettlement };
};