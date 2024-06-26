import { useState } from "react";
import { useApi } from "../index";
import { settlementService } from "@/utils/services/settlements";
import { GetAllSettlementsParams } from "@/utils/services/settlements/types";
import { GetAccountSettlementResponse, Settlement } from "@/models/settlements";

export const useFetchAccountSettlements = () => {
  const [data, setData] = useState<GetAccountSettlementResponse[]>([]);
  const { isLoading, error, execute } = useApi();
  const [count, setCount] = useState(0);

  async function fetchAccountSettlements(params: GetAllSettlementsParams) {
    setData([]);
    const response = await execute(
      async () => await settlementService.getAccountSettlements(params)
    );
    if (response) {
      setData(response.AccountSettlement);
      setCount(response.count);
    }
  }

  return { isLoading, error, data, fetchAccountSettlements, count };
};
