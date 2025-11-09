import { provideZonelessChangeDetection } from "@angular/core";
import { createComponentFactory, Spectator } from "@ngneat/spectator";
import { Expense } from "../../../expense/domain/models/expense";
import { Payer } from "../../../payer/domain/models/payer";
import { Room } from "../../../room/domain/models/room";
import { ROOM_STORE_TOKEN } from "../../../room/domain/ports/room.store";
import { ReactiveRoomStore } from "../../../room/infrastructure/adapters/stores/reactive-room.store";
import { FakeBalanceService } from "../../domain/fakes/fake-balance.service";
import { SettleBalanceUseCase } from "../../domain/use-cases/settle-balance.use-case";
import { BalanceComponent } from "./balance.component";

describe('BalanceComponent', () => {
    let spectator: Spectator<BalanceComponent>;
    let reactiveRoomStore: ReactiveRoomStore;
    let fakeBalanceService: FakeBalanceService;
    let settleBalanceUseCase: SettleBalanceUseCase;

    const createComponent = createComponentFactory({
        component: BalanceComponent,
        providers: [
            provideZonelessChangeDetection(),
            {
                provide: ROOM_STORE_TOKEN,
                useFactory: () => reactiveRoomStore
            },
            {
                provide: SettleBalanceUseCase,
                useFactory: () => settleBalanceUseCase
            }
        ],
    });

    beforeEach(() => {
        reactiveRoomStore = new ReactiveRoomStore();
        reactiveRoomStore.setRoom(
            new Room('room-001', 'Roomate', [
                new Payer('payer-001', 'John', [
                    new Expense('expense-001', 'Pizzas', 19),
                    new Expense('expense-002', 'Drinks', 6)
                ]),
                new Payer('payer-002', 'Tim', [
                    new Expense('expense-003', 'Groceries', 3),
                    new Expense('expense-004', 'Snacks', 7)
                ]),
                new Payer('payer-003', 'Alice', [
                    new Expense('expense-005', 'Party', 8),
                    new Expense('expense-006', 'Transport', 2)
                ])
            ])
        );
        fakeBalanceService = new FakeBalanceService();
        settleBalanceUseCase = new SettleBalanceUseCase(fakeBalanceService, reactiveRoomStore);

        spectator = createComponent();
    });

    it('should display balance', () => {
        expect(spectator.query('[data-testid="balance"]')).toHaveText(reactiveRoomStore.room()!.calculateTotalExpenses().toFixed(2));
        expect(spectator.query('[data-testid="balance"]')).toHaveText(reactiveRoomStore.room()!.calculateAverageExpensesPerPayer().toFixed(2));
        expect(spectator.query('[data-testid="balance"]')).toHaveText(['Tim', '5.00', 'John']);
        expect(spectator.query('[data-testid="balance"]')).toHaveText(['Alice', '5.00', 'John']);
    });

    it('should settle balance and clear all expenses', async () => {
        await clickAndWait('[data-testid="settle-balance"]');

        expect(fakeBalanceService.roomId).toEqual('room-001');
        expect(reactiveRoomStore.room()!.payers[0].expenses).toEqual([]);
        expect(reactiveRoomStore.room()!.payers[1].expenses).toEqual([]);
        expect(reactiveRoomStore.room()!.payers[2].expenses).toEqual([]);
    });

    async function clickAndWait(selector: string) {
        spectator.click(selector);
        await new Promise(resolve => setTimeout(resolve, 0));
        spectator.detectChanges();
    }
});
