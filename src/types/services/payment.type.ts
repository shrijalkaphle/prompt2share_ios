import { PaymentOption } from "@stripe/stripe-react-native/lib/typescript/src/types/PaymentSheet";
import instance from "tsyringe/dist/typings/dependency-container";

export interface IUpdatePaymentIntentPropos {
    payment_intent_id: string;
    amount: number;
}

export interface ICompletePurchaseProps {
    paymentIntentId: string,
    amount: string,
    paymentOption: string
}

export interface IPaymentIntentProps {
    amount: number
}

export interface IWithdrawRequestProps {
    bankName: string
    routingNumber: string
    accountNumber: string
    name: string
    amount: string
}