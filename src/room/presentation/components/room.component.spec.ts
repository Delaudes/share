import { provideZonelessChangeDetection } from "@angular/core";
import { createComponentFactory, Spectator } from "@ngneat/spectator";
import { FakeBalanceService } from "../../../balance/domain/fakes/fake-balance.service";
import { SettleBalanceUseCase } from "../../../balance/domain/use-cases/settle-balance.use-case";
import { BalanceComponent } from "../../../balance/presentation/components/balance.component";
import { FakeExpenseService } from "../../../expense/domain/fakes/fake-expense.service";
import { AddExpenseUseCase } from "../../../expense/domain/use-cases/add-expense.use-case";
import { DeleteExpenseUseCase } from "../../../expense/domain/use-cases/delete-expense.use-case";
import { FakePayerService } from "../../../payer/domain/fakes/fake-payer.service";
import { AddPayerUseCase } from "../../../payer/domain/use-cases/add-payer.use-case";
import { DeletePayerUseCase } from "../../../payer/domain/use-cases/delete-payer.use-case";
import { PayerComponent } from "../../../payer/presentation/components/payer.component";
import { FakeRouterService } from "../../../router/infrastructure/adapters/fake-router.service";
import { ROUTER_SERVICE_TOKEN } from "../../../router/infrastructure/ports/router.service";
import { FakeRoomService } from "../../domain/fakes/fake-room.service";
import { ROOM_STORE_TOKEN } from "../../domain/ports/room.store";
import { LoadRoomUseCase } from "../../domain/use-cases/load-room.use-case";
import { ReactiveRoomStore } from "../../infrastructure/adapters/stores/reactive-room.store";
import { RoomComponent } from "./room.component";

describe('RoomComponent', () => {
  let spectator: Spectator<RoomComponent>;

  let fakeRouterService: FakeRouterService
  let fakeRoomService: FakeRoomService
  let fakePayerService: FakePayerService
  let reactiveRoomStore: ReactiveRoomStore
  let loadRoomUseCase: LoadRoomUseCase
  let addPayerUseCase: AddPayerUseCase

  const createComponent = createComponentFactory({
    component: RoomComponent,
    providers: [provideZonelessChangeDetection(),
    {
      provide: ROUTER_SERVICE_TOKEN,
      useFactory: () => fakeRouterService
    },
    {
      provide: LoadRoomUseCase,
      useFactory: () => loadRoomUseCase
    },
    {
      provide: AddPayerUseCase,
      useFactory: () => addPayerUseCase
    },
    {
      provide: ROOM_STORE_TOKEN,
      useFactory: () => reactiveRoomStore
    },
    ...provideChildrensDependencies()
    ],
  })

  beforeEach(async () => {
    fakeRouterService = new FakeRouterService()
    fakeRoomService = new FakeRoomService()
    fakePayerService = new FakePayerService()
    reactiveRoomStore = new ReactiveRoomStore()
    loadRoomUseCase = new LoadRoomUseCase(fakeRoomService, reactiveRoomStore)
    addPayerUseCase = new AddPayerUseCase(fakePayerService, reactiveRoomStore)

    spectator = createComponent()
    await new Promise(resolve => setTimeout(resolve, 0));
    spectator.detectChanges()
  });

  it('should display room', () => {
    expect(spectator.query('[data-testid="room"]')).toHaveText(reactiveRoomStore.room()!.name)
  })

  it('should load room', async () => {
    expect(fakeRouterService.paramName).toEqual('id')
    expect(fakeRoomService.createdRoomId).toEqual(fakeRouterService.paramValue)
  });

  it('should add payer', async () => {
    const payerName = 'John'

    spectator.typeInElement(payerName, '[data-testid="payer-name"]')
    await clickAndWait('[data-testid="add-payer"]');

    expect(fakePayerService.payerName).toEqual(payerName)
  })

  it('should display payers', async () => {
    expect(spectator.queryAll(PayerComponent).length).toEqual(0)

    await clickAndWait('[data-testid="add-payer"]');

    expect(spectator.queryAll(PayerComponent).length).toEqual(1)

    await clickAndWait('[data-testid="add-payer"]');

    expect(spectator.queryAll(PayerComponent).length).toEqual(2)
  })

  it('should display balance', () => {
    expect(spectator.query(BalanceComponent)).toBeTruthy();
  })

  it('should display empty state when room has no payers then hide it after adding payer', async () => {
    expect(spectator.query('[data-testid="empty-payers"]')).toBeTruthy()

    await clickAndWait('[data-testid="add-payer"]');

    expect(spectator.query('[data-testid="empty-payers"]')).toBeFalsy()
  })

  async function clickAndWait(selector: string) {
    spectator.click(selector);
    await new Promise(resolve => setTimeout(resolve, 0));
    spectator.detectChanges()
  }

  function provideChildrensDependencies() {
    return [
      {
        provide: AddExpenseUseCase,
        useFactory: () => new AddExpenseUseCase(new FakeExpenseService(), reactiveRoomStore)
      },
      {
        provide: DeleteExpenseUseCase,
        useFactory: () => new DeleteExpenseUseCase(new FakeExpenseService(), reactiveRoomStore)
      },
      {
        provide: DeletePayerUseCase,
        useFactory: () => new DeletePayerUseCase(fakePayerService, reactiveRoomStore)
      },
      {
        provide: SettleBalanceUseCase,
        useFactory: () => new SettleBalanceUseCase(new FakeBalanceService(), reactiveRoomStore)
      }]
  }
});


