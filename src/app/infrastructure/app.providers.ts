import { BALANCE_SERVICE_TOKEN } from "../../balance/domain/ports/balance.service";
import { SettleBalanceUseCase } from "../../balance/domain/use-cases/settle-balance.use-case";
import { StorageBalanceService } from "../../balance/infrastructure/adapters/services/storage-balance.service";
import { EXPENSE_SERVICE_TOKEN } from "../../expense/domain/ports/expense.service";
import { AddExpenseUseCase } from "../../expense/domain/use-cases/add-expense.use-case";
import { DeleteExpenseUseCase } from "../../expense/domain/use-cases/delete-expense.use-case";
import { StorageExpenseService } from "../../expense/infrastructure/adapters/services/storage-expense.service";
import { RealLocalStorageService } from "../../local-storage/infrastructure/adapters/real-local-storage.service";
import { LOCAL_STORAGE_SERVICE_TOKEN } from "../../local-storage/infrastructure/ports/local-storage.service";
import { PAYER_SERVICE_TOKEN } from "../../payer/domain/ports/payer.service";
import { AddPayerUseCase } from "../../payer/domain/use-cases/add-payer.use-case";
import { DeletePayerUseCase } from "../../payer/domain/use-cases/delete-payer.use-case";
import { StoragePayerService } from "../../payer/infrastructure/adapters/services/storage-payer.service";
import { ROOM_SERVICE_TOKEN } from "../../room/domain/ports/room.service";
import { ROOM_STORE_TOKEN } from "../../room/domain/ports/room.store";
import { CreateRoomUseCase } from "../../room/domain/use-cases/create-room.use-case";
import { DeleteRoomUseCase } from "../../room/domain/use-cases/delete-room.use-case";
import { GetRoomListUseCase } from "../../room/domain/use-cases/get-room-list.use-case";
import { LoadRoomUseCase } from "../../room/domain/use-cases/load-room.use-case";
import { UpdateRoomNameUseCase } from "../../room/domain/use-cases/update-room-name.use-case";
import { StorageRoomService } from "../../room/infrastructure/adapters/services/storage-room.service";
import { ReactiveRoomStore } from "../../room/infrastructure/adapters/stores/reactive-room.store";
import { AngularRouterService } from "../../router/infrastructure/adapters/angular-router.service";
import { ROUTER_SERVICE_TOKEN } from "../../router/infrastructure/ports/router.service";
import { RealUuidService } from "../../uuid/infrastructure/adapters/real-uuid-service";
import { UUID_SERVICE_TOKEN } from "../../uuid/infrastructure/ports/uuid.service";

export const NAVIGATION_PROVIDERS = [
    {
        provide: ROUTER_SERVICE_TOKEN,
        useClass: AngularRouterService
    },
]

export const LOCAL_STORAGE_PROVIDERS = [
    {
        provide: LOCAL_STORAGE_SERVICE_TOKEN,
        useClass: RealLocalStorageService
    },
]

export const UUID_PROVIDERS = [
    {
        provide: UUID_SERVICE_TOKEN,
        useClass: RealUuidService
    },
]

export const ROOM_PROVIDERS = [
    {
        provide: ROOM_STORE_TOKEN,
        useClass: ReactiveRoomStore
    },

    {
        provide: ROOM_SERVICE_TOKEN,
        useClass: StorageRoomService,
        deps: [LOCAL_STORAGE_SERVICE_TOKEN, UUID_SERVICE_TOKEN]
    },

    {
        provide: CreateRoomUseCase,
        deps: [ROOM_SERVICE_TOKEN]
    },
    {
        provide: LoadRoomUseCase,
        deps: [ROOM_SERVICE_TOKEN, ROOM_STORE_TOKEN]
    },
    {
        provide: GetRoomListUseCase,
        deps: [ROOM_SERVICE_TOKEN]
    },
    {
        provide: DeleteRoomUseCase,
        deps: [ROOM_SERVICE_TOKEN]
    },
    {
        provide: UpdateRoomNameUseCase,
        deps: [ROOM_SERVICE_TOKEN, ROOM_STORE_TOKEN]
    },
]

export const PAYER_PROVIDERS = [
    {
        provide: PAYER_SERVICE_TOKEN,
        useClass: StoragePayerService,
        deps: [LOCAL_STORAGE_SERVICE_TOKEN, UUID_SERVICE_TOKEN]
    },
    {
        provide: AddPayerUseCase,
        deps: [PAYER_SERVICE_TOKEN, ROOM_STORE_TOKEN]
    },
    {
        provide: DeletePayerUseCase,
        deps: [PAYER_SERVICE_TOKEN, ROOM_STORE_TOKEN]
    },
]

export const EXPENSE_PROVIDERS = [
    {
        provide: EXPENSE_SERVICE_TOKEN,
        useClass: StorageExpenseService,
        deps: [LOCAL_STORAGE_SERVICE_TOKEN, UUID_SERVICE_TOKEN]
    },
    {
        provide: AddExpenseUseCase,
        deps: [EXPENSE_SERVICE_TOKEN, ROOM_STORE_TOKEN]
    },
    {
        provide: DeleteExpenseUseCase,
        deps: [EXPENSE_SERVICE_TOKEN, ROOM_STORE_TOKEN]

    }
]

export const BALANCE_PROVIDERS = [
    {
        provide: BALANCE_SERVICE_TOKEN,
        useClass: StorageBalanceService,
        deps: [LOCAL_STORAGE_SERVICE_TOKEN]
    },
    {
        provide: SettleBalanceUseCase,
        deps: [BALANCE_SERVICE_TOKEN, ROOM_STORE_TOKEN]
    }
]

