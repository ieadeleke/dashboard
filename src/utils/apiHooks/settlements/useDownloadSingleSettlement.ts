import { useState } from "react";
import { useApi } from "../index";
import { settlementService } from "@/utils/services/settlements";
import { GetAccountSettlementResponse, Settlement } from "@/models/settlements";
import { DownloadSingleSettlementParams } from "@/utils/services/settlements/types";

export const useDownloadSingleSettlement = () => {
  const [data, setData] = useState<any>(null);
  const { isLoading, error, execute } = useApi();

  async function downloadSingleSettlement(params: DownloadSingleSettlementParams) {
    setData(null);
    const response = await execute(
      async () =>
        await settlementService.downloadSingleSettlement(params)
    );
    if (response) {
        setData(response as any);
        const blob = new Blob([response], { type: "application/csv" });
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.setAttribute("download", "settlements.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(downloadUrl);
      }
  }

  return { isLoading, error, data, downloadSingleSettlement };
};