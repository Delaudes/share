import { Expense } from "../../../expense/domain/models/expense";
import { Payer } from "../../../payer/domain/models/payer";
import { FakeRoomStore } from "../../../room/domain/fakes/fake-room.store";
import { Room } from "../../../room/domain/models/room";
import { FakeBalanceService } from "../fakes/fake-balance.service";
import { SettleBalanceUseCase } from "./settle-balance.use-case";

describe('SettleBalanceUseCase', () => {
    let settleBalanceUseCase: SettleBalanceUseCase;
    let fakeBalanceService: FakeBalanceService;
    let fakeRoomStore: FakeRoomStore;

    beforeEach(() => {
        fakeRoomStore = new FakeRoomStore();
        fakeRoomStore.setRoom(new Room('room-001', 'Holidays', [
            new Payer('payer-001', 'John', [
                new Expense('expense-001', 'Pizzas', 26),
                new Expense('expense-002', 'Drinks', 10)
            ]),
            new Payer('payer-002', 'Alice', [
                new Expense('expense-003', 'Groceries', 50)
            ])
        ]));
        fakeBalanceService = new FakeBalanceService();
        settleBalanceUseCase = new SettleBalanceUseCase(fakeBalanceService, fakeRoomStore);
    });

    it('should settle balance and clear all expenses', async () => {
        await settleBalanceUseCase.execute();

        expect(fakeBalanceService.roomId).toEqual('room-001');
        expect(fakeRoomStore.getRoom()?.findPayer('payer-001')?.expenses).toEqual([]);
        expect(fakeRoomStore.getRoom()?.findPayer('payer-002')?.expenses).toEqual([]);
    });
});
