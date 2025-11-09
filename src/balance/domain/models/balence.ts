import { Payment } from "./payment";

export class Balance {

    constructor(readonly payments: Payment[]) { }

    addPayment(payment: Payment): void {
        this.payments.push(payment)
    }
}