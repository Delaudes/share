import { RoomStore } from "../../../room/domain/ports/room.store";
import { PayerService } from "../ports/payer.service";

export class DeletePayerUseCase {
    constructor(private readonly payerService: PayerService, private readonly roomStore: RoomStore) { }

    async execute(payerId: string): Promise<void> {
        await this.payerService.delete(payerId)

        this.roomStore.deletePayer(payerId)
    }
}
