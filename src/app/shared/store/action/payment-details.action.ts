import { PaymentDetails } from "../../interface/payment-details.interface";

export class GetPaymentDetails {
   static readonly type = "[Payment Details] Get";
}

export class UpdatePaymentDetails {
   static readonly type = "[Payment Details] Post";
   constructor(public payload: PaymentDetails) {}
}
