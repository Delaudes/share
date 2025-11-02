import { Payer } from "../models/payer";
import { PayerService } from "../ports/payer.service";

export class FakePayerService implements PayerService {
    roomId?: string
    payerName?: string
    payerId?: string

    payer = new Payer('payer-001', 'John', [])

    async add(payerName: string, roomId: string): Promise<Payer> {
        this.roomId = roomId
        this.payerName = payerName

        return this.payer
    }

    async delete(payerId: string): Promise<void> {
        this.payerId = payerId
    }
}