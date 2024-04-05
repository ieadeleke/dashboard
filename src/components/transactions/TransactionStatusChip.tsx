import { StatusChip } from "@/components/chips/StatusChip";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

export type TransactionStatus = "Successful" | "Fail" | "Pending"
type InspectionStatusChipProps = {
  status: TransactionStatus;
};

export const TransactionStatusChip = (props: InspectionStatusChipProps) => {
  const { status } = props;

  const statusStyles = useMemo(() => {
    switch (status) {
      case "Pending":
        return {
          container: "bg-barley-white-100",
          label: "text-barley-white-900",
        };
      case "Fail":
        return {
          container: "bg-red-200",
          label: "text-red-900",
        };
      default:
        return {
          container: "bg-pattens-blue-100",
          label: "text-pattens-blue-950",
        };
    }
  }, [status]);

  const statusText = useMemo(() => {
    return status;
  }, [status]);

  return (
    <StatusChip.Container className={statusStyles.container}>
      <StatusChip.Label className={cn("text-center", statusStyles.label)}>
        {statusText}
      </StatusChip.Label>
    </StatusChip.Container>
  );
};
