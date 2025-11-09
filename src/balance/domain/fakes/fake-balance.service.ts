import { BalanceService } from "../ports/balance.service";

export class FakeBalanceService implements BalanceService {
    roomId?: string;

    async settle(roomId: string): Promise<void> {
        this.roomId = roomId;
    }
}
