import {
  InputProps,
  RegularTextInput,
} from "@/components/input/RegularTextInput";
import { cn } from "@/lib/utils";
import Button from "@/components/buttons";
import { useRouter } from "next/router";
import {
  ChangeEvent,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { isEmail } from "@/utils/validation/validation";
import { GetServerSideProps } from "next";
import { ChargeService } from "@/utils/services/charge";
import { errorHandler } from "@/utils/errorHandler";
import { Reference } from "@/models/reference";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { config } from "@/utils/data/flutterwave.config";
import { GlobalActionContext } from "@/context/GlobalActionContext";
import { GenerateReceipt } from "@/components/charge/GenerateReceipt";
import { ErrorComponent } from "@/components/charge/ErrorComponent";
import { Payment } from "@/models/payment";
import DashboardLayout from "@/components/layout/dashboard";
import {
  PaymentModal,
  PaymentModalRef,
} from "@/components/transactions/PaymentModal";
import moment from "moment";
import { useInitiatePaymentWithUpperlink } from "@/utils/apiHooks/charge/useInitiatePaymentWithUpperlink";
import { useUpperlinkNotification } from "@/utils/apiHooks/charge/useUpperlinkNotification";

const TextInput = ({ className, ...props }: InputProps) => (
  <RegularTextInput className={cn("w-full md:w-96", className)} {...props} />
);

type Error = {
  status: number;
  message: string;
};

type ChargeProps = {
  reference?: string;
  data: Reference;
  error?: Error;
};

export default function Charge(props: ChargeProps) {
  const router = useRouter();
  const [formFields, setFormFields] = useState({
    reference: "",
    phone: "",
    email: "",
    amount: "0",
  });
  const [isAboveLimit, setIsAboveLimit] = useState(false);
  const { showSnackBar } = useContext(GlobalActionContext);
  const [payment, setPayment] = useState<Payment | null>(null);
  const paymentModalRef = useRef<PaymentModalRef>(null);
  const {
    isLoading: isPaymentLoading,
    data,
    error: paymentError,
    initiatePaymentWithUpperlink,
  } = useInitiatePaymentWithUpperlink();
  const {
    isLoading: isUpperLinkNotificationLoading,
    data: upperLinkNotificationData,
    error: upperLinkNotificationError,
    upperlinkNotification,
  } = useUpperlinkNotification();

  const payNow = useFlutterwave({
    ...config,
    amount: parseInt(formFields.amount),
    tx_ref: Date.now().toString(),
    customer: {
      ...config.customer,
      email: formFields.email,
      phone_number: formFields.phone,
    },
  });

  const isLoading = useMemo(
    () => isUpperLinkNotificationLoading || isPaymentLoading,
    [isUpperLinkNotificationLoading, isPaymentLoading]
  );

  const error = useMemo(
    () => paymentError || upperLinkNotificationError,
    [paymentError, upperLinkNotificationError]
  );

  const serviceCharge = useMemo(() => {
    const amount = isNaN(parseInt(formFields.amount))
      ? 0
      : parseInt(formFields.amount);
    const total = amount * (props.data.settings.percentage / 100);
    return total < props.data.settings.min
      ? props.data.settings.min
      : total > props.data.settings.max
      ? props.data.settings.max
      : total;
  }, [props.data.settings.min, formFields.amount]);

  useEffect(() => {
    if (error) {
      showSnackBar({ severity: "error", message: error });
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      completePayment(data);
    }
  }, [data]);

  useEffect(() => {
    const query = router.query;
    if (query.reference) {
      setFormFields((value) => ({
        ...value,
        reference: query.reference as string,
      }));
    }
  }, [router.query]);

  function formatAmount(amount: string) {
    return parseInt(amount.replace(/,/g, ""), 10).toString();
  }

  useEffect(() => {
    if (props.data) {
      setFormFields((value) => ({
        ...value,
        amount: formatAmount(props.data.AmountDue),
      }));
    }
  }, [props.data]);

  useEffect(() => {
    if (props.data) {
      const { AmountDue } = props.data;
      const amount = parseInt(formatAmount(formFields.amount));
      setIsAboveLimit(
        amount < 100 || amount > parseInt(formatAmount(AmountDue))
      );
    }
  }, [props.data, formFields.amount]);

  function onSubmit(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    handlePayNow();
  }

  function onReferenceEntered(event: ChangeEvent<HTMLInputElement>) {
    setFormFields((value) => ({ ...value, reference: event.target.value }));
  }

  function submitReference() {
    if (formFields.reference.trim().length == 0) {
      return alert("Reference ID can't be empty");
    }
    router.push({ query: { reference: formFields.reference } });
  }

  function submitForm() {
    if (!isEmail(formFields.email)) {
      return alert("Invalid Email");
    } else if (formFields.phone.length < 11) {
      return alert("Invalid Phone Number");
    }
    handlePayNow();
  }

  function updateAmount(amount: string) {
    setFormFields((value) => ({
      ...value,
      amount: amount.trim() == "" ? "0" : amount,
    }));
  }

  function handlePayNow() {
    initiatePaymentWithUpperlink({
      AgencyCode: props.data.AgencyCode,
      AgencyName: props.data.AgencyName,
      PayerName: props.data.PayerName,
      RevenueCode: props.data.RevenueCode,
      reference: formFields.reference,
      OraAgencyRev: props.data.OraAgencyRev,
      RevName: props.data.RevName,
      amountPaid: parseInt(formFields.amount),
      email: formFields.email,
      paymentRef: moment().unix().toString(),
      mobile: formFields.phone,
      serviceCharge: serviceCharge.toString(),
    });
  }

  useEffect(() => {
    const { transaction_id } = router.query;
    if (transaction_id) {
      // sd
      upperlinkNotification({
        reference: transaction_id as string,
      });
    }
  }, [router.query]);

  function completePayment(data: Payment) {
    const transactionId = Math.random().toString().replace("0.", "");
    const name = data.PayerName.split(" ");
    const body = {
      transactionId: transactionId,
      amount: data.amountPaid,
      currency: "NGN",
      country: "NG",
      email: data.email,
      phoneNumber: data.mobile,
      firstName: name[0] ?? "",
      lastName: name[1] ?? "",
      logoURL: "",
      customerUrl: `http://localhost:3000/web-transactions?transaction_id=${transactionId}`,
      merchantId: "UPLN4AB",
      meta: "",
    };
    (window as any).payGateCheckout(body);
  }

  useEffect(() => {}, []);

  return (
    <DashboardLayout>
      <div className="mt-12 min-h-[500px] flex flex-col items-center">
        <div className="flex flex-col">
          {props.error ? (
            <ErrorComponent data={props.error} />
          ) : props.reference ? (
            <div className="flex flex-col">
              <h1 className="font-bold">Enter your reference ID</h1>
              <TextInput
                defaultValue={formFields.reference}
                onChange={onReferenceEntered}
                placeholder="XXXX-XXX-XXXXXX"
              />
              <Button
                onClick={submitReference}
                variant="contained"
                className="h-10 mt-4"
              >
                Submit
              </Button>
            </div>
          ) : payment ? (
            <GenerateReceipt
              data={{
                amount: props.data.AmountDue,
                url: "payment.ReceiptNumber",
                billingReference: formFields.reference,
                paymentTime: new Date().toString(),
                senderName: config.customer.name,
              }}
            />
          ) : (
            <div className="flex flex-col">
              <h1 className="font-bold text-2xl text-center">
                Revenue Collection
              </h1>
              <PaymentModal ref={paymentModalRef} />

              <form
                onSubmit={onSubmit}
                className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2"
              >
                <div className="flex flex-col gap-2">
                  <p className="font-medium">Billing Reference *</p>
                  <TextInput
                    disabled
                    value={formFields.reference}
                    placeholder=""
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <p className="font-medium">Agency Name *</p>
                  <TextInput
                    disabled
                    value={props.data.AgencyName}
                    placeholder=""
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <p className="font-medium">Amount Due *</p>
                  <TextInput
                    disabled
                    value={props.data.AmountDue}
                    placeholder=""
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <p className="font-medium">{`Payer's Name *`}</p>
                  <TextInput
                    disabled
                    value={props.data.PayerName}
                    placeholder=""
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <p className="font-medium">Organization Agency *</p>
                  <TextInput
                    disabled
                    value={props.data.OraAgencyRev}
                    placeholder=""
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <p className="font-medium">Rev Name *</p>
                  <TextInput
                    disabled
                    value={props.data.RevName}
                    placeholder=""
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <p className="font-medium">Agency Code *</p>
                  <TextInput
                    disabled
                    value={props.data.AgencyCode}
                    placeholder=""
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <p className="font-medium">Amount *</p>
                  <TextInput
                    onChange={(event) => updateAmount(event.target.value)}
                    inputMode="numeric"
                    defaultValue={formFields.amount}
                    placeholder="Enter your amount"
                  />
                  {isAboveLimit && (
                    <p className="text-sm text-red-500">
                      Amount must be between 100 and {props.data.AmountDue}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <p className="font-medium">Phone Number *</p>
                  <TextInput
                    onChange={(event) =>
                      setFormFields((value) => ({
                        ...value,
                        phone: event.target.value,
                      }))
                    }
                    inputMode="tel"
                    autoComplete="phone"
                    defaultValue={formFields.phone}
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <p className="font-medium">Email *</p>
                  <TextInput
                    onChange={(event) =>
                      setFormFields((value) => ({
                        ...value,
                        email: event.target.value,
                      }))
                    }
                    inputMode="email"
                    defaultValue={formFields.email}
                    placeholder="Enter your email"
                  />
                </div>
              </form>

              <Button
                disabled={isLoading || isAboveLimit}
                onClick={submitForm}
                className="w-60 h-12 mt-8 self-center"
                variant="contained"
              >
                {isLoading ? `Please wait...` : `Submit`}
              </Button>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const reference = query?.reference;
    if (!reference) {
      return {
        props: {
          reference: true,
        },
      };
    }
    const data = await ChargeService().verifyReference({
      reference: reference as string,
    });
    return {
      props: {
        data,
      },
    };
  } catch (error) {
    const parsedError = errorHandler(error);

    return {
      props: {
        error: parsedError,
      },
    };
  }
};
