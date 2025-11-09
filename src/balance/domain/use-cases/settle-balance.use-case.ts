import { RoomStore } from "../../../room/domain/ports/room.store";
import { BalanceService } from "../ports/balance.service";

export class SettleBalanceUseCase {
    constructor(private readonly balanceService: BalanceService, private readonly roomStore: RoomStore) { }

    async execute(): Promise<void> {
        const room = this.roomStore.getRoom()!;
        await this.balanceService.settle(room.id);

        this.roomStore.settleBalance();
    }
}
