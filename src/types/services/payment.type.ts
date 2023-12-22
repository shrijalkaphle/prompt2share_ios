import { PaymentOption } from "@stripe/stripe-react-native/lib/typescript/src/types/PaymentSheet";

export interface IUpdatePaymentIntentPropos {
    payment_intent_id: string;
    amount: number;
}

export interface ICompletePurchaseProps {
    paymentIntentId: string,
    amount: string,
    paymentOption: string
}