import { useState } from "react";
import { useApi } from "../index";
import { DownloadReportParams } from "@/utils/services/transactions/types";
import { TransactionService } from "@/utils/services/transactions";

export const useDownloadReport = () => {
  const [data, setData] = useState<string | null>(null);
  const { isLoading, error, execute } = useApi();

  async function downloadReport(params: DownloadReportParams) {
    setData(null);
    const response = await execute(
      async () => await TransactionService().downloadReport(params)
    );
    if (response) {
      setData(response as any);
      const blob = new Blob([response], { type: "application/csv" });
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", "businesses.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    }
  }

  return { isLoading, error, data, downloadReport };
};
