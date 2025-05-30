import { useRouter } from "next/router";
import Button from "../buttons";
import { usePrintReceipt } from "@/utils/apiHooks/charge/usePrintReceipt";
import { useContext, useEffect } from "react";
import { GlobalActionContext } from "@/context/GlobalActionContext";
import moment from "moment";

type GenerateReceiptProps = {
  data: {
    billingReference: string;
    paymentTime: string;
    amount: string;
    url: string,
    senderName: string;
  };
};

export const GenerateReceipt = (props: GenerateReceiptProps) => {
  const router = useRouter();
  const {
    isLoading,
    data: receiptData,
    error,
    printReceipt,
  } = usePrintReceipt();
  const { showSnackBar } = useContext(GlobalActionContext);
  const { data } = props;

  function handlePayAgain() {
    router.replace("/");
  }

  function handleDownloadReceipt() {
    window.open(data.url, "_blank")
  }

  useEffect(() => {
    if (error) {
      showSnackBar({ severity: "error", message: error });
    }
  }, []);

  return (
    <div className="w-full md:w-[500px]">
      <div className="flex flex-col gap-2 px-4 py-4 bg-no-repeat bg-primary rounded-2xl">
        <div className="text-center text-white">
          <h1 className="font-bold">Item Picked Up</h1>
          <p>Your payment has been successfully done.</p>
        </div>

        <div className="grid grid-cols-2 text-white mt-4 gap-4">
          <div className="border rounded-md border-white p-2">
            <p className="font-light">Billing Reference</p>
            <p className="font-medium">{data.billingReference}</p>
          </div>

          <div className="border rounded-md border-white p-2">
            <p className="font-light">Payment Time</p>
            <p className="font-medium">{moment(data.paymentTime).format("dddd, MMMM Do YYYY, h:mm:ss a")}</p>
          </div>

          <div className="border rounded-md border-white p-2">
            <p className="font-light">Amount</p>
            <p className="font-medium">{data.amount}</p>
          </div>

          <div className="border rounded-md border-white p-2">
            <p className="font-light">Sender Name</p>
            <p className="font-medium">{data.senderName}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4 h-12 mt-8">
        {/* <Button
          onClick={handlePayAgain}
          className="flex-1 h-full"
          variant="outlined"
        >
          Pay Again
        </Button> */}
        <Button
          disabled={isLoading}
          onClick={handleDownloadReceipt}
          className="flex-1 h-full rounded-md"
          variant="outlined"
        >
          Download Receipt
        </Button>
      </div>
    </div>
  );
};
