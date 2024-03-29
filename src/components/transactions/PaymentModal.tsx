import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Transaction } from "@/models/transactions";
import { cleanString } from "@/utils/validation/cleanString";
import { ChangeEvent, forwardRef, useImperativeHandle, useRef, useState } from "react";

type CardDetails = {
  cardNumber: string;
  cvv: string;
  pin: string;
  cardName: string;
  expiry: string;
};

type PaymentModalPayload = {
  onDone?: (data: CardDetails) => void;
};

type PaymentModalProps = {};

export type PaymentModalRef = {
  open: (payload: PaymentModalPayload) => void;
  close?: () => void;
};

export const PaymentModal = forwardRef<PaymentModalRef, PaymentModalProps>(
  (_, ref) => {
    const [isVisible, setIsVisible] = useState(false);
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCVV] = useState("");
    const [pin, setPin] = useState("");
    const [cardName, setCardName] = useState("");
    const [creditCardNumber, setCreditCardNumber] = useState("");
    const onDone = useRef<(data: CardDetails) => void>()

    const formatCreditCardNumber = (input: string) => {
      // Remove non-numeric characters
      const numericInput = input.replace(/\D/g, "");

      // Add spaces every 4 digits for better readability
      let formattedInput = "";
      for (let i = 0; i < numericInput.length; i += 4) {
        formattedInput += numericInput.slice(i, i + 4) + " ";
      }

      // Remove trailing space
      formattedInput = formattedInput.trim();

      // Limit to 16 digits
      formattedInput = formattedInput.slice(0, 19);

      return formattedInput;
    };

    const formatExpiryDate = (input: string) => {
      // Remove non-numeric characters
      const numericInput = input.replace(/\D/g, "");

      let formattedInput =
        numericInput.slice(0, 2) + (numericInput.length > 2 ? "/" : "");

      formattedInput = formattedInput.slice(0, 5);

      return formattedInput;
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value;
      const formattedInput = formatCreditCardNumber(input);
      setCreditCardNumber(formattedInput);
    };

    const handleExpiryInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value;
      // const formattedInput = formatExpiryDate(input);
      setExpiryDate(input);
    };

    const handlePinInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value;
      setPin(input.substring(0, 3));
    };


    const handleCVVInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value;
      setCVV(input.substring(0, 3));
    };

    const handleCardNameInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      setCardName(e.target.value);
    };

    useImperativeHandle(ref, () => ({
      open(payload: PaymentModalPayload) {
        onDone.current = payload.onDone
        setIsVisible(true);
      },
      close() {
        closeModal();
      },
    }));

    function closeModal() {
      setIsVisible(false);
      onDone.current = undefined
    }

    function submit(){
      onDone.current?.({
        cardName,
        cardNumber: cleanString(creditCardNumber),
        cvv,
        expiry: cleanString(expiryDate),
        pin
      })
    }

    return (
      <Dialog open={isVisible} onOpenChange={setIsVisible}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Complete Transaction</DialogTitle>
            <DialogDescription>Enter Card Details</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Card Name
              </Label>
              <Input
                id="username"
                placeholder="e.g John Doe"
                onChange={handleCardNameInputChange}
                value={cardName}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Card Number
              </Label>
              <Input
                id="name"
                onChange={handleInputChange}
                value={creditCardNumber}
                className="col-span-3"
                inputMode="numeric"
                pattern="[0-9\s]{13,19}"
                autoComplete="cc-number"
                maxLength={500}
                placeholder="xxxx xxxx xxxx xxxx"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="expiry" className="text-right">
                Expiry Date
              </Label>
              <Input
                id="expiry"
                onChange={handleExpiryInputChange}
                value={expiryDate}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cvv" className="text-right">
                CVV
              </Label>
              <Input id="cvv" onChange={handleCVVInputChange} className="col-span-3" />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="pin" className="text-right">
                Card Pin
              </Label>
              <Input id="pin" onChange={handlePinInputChange} className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={submit}>Continue</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
);
PaymentModal.displayName = "PaymentModal"