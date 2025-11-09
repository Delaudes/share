import { InjectionToken } from "@angular/core";
import { Expense } from "../../../expense/domain/models/expense";
import { Payer } from "../../../payer/domain/models/payer";
import { ReactiveRoomStore } from "../../infrastructure/adapters/stores/reactive-room.store";
import { Room } from "../models/room";

export interface RoomStore {
    addExpense(expense: Expense, payerId: string): void;
    addPayer(payer: Payer): void;
    getRoom(): Room | undefined
    setRoom(room?: Room): void
    deleteExpense(expenseId: string): void;
    deletePayer(payerId: string): void;
    settleBalance(): void;
    updateName(newName: string): void;
}

export const ROOM_STORE_TOKEN = new InjectionToken<ReactiveRoomStore>('RoomStore')