import { Expense } from "../../../expense/domain/models/expense";
import { Payer } from "../../../payer/domain/models/payer";
import { Room } from "../models/room";
import { RoomStore } from "../ports/room.store";

export class FakeRoomStore implements RoomStore {

    room?: Room

    getRoom(): Room | undefined {
        return this.room
    }

    setRoom(room: Room): void {
        this.room = room
    }

    addPayer(payer: Payer): void {
        this.room?.addPayer(payer)
    }

    addExpense(expense: Expense, payerId: string): void {
        this.room?.addExpense(expense, payerId)
    }

    deleteExpense(expenseId: string): void {
        this.room?.deleteExpense(expenseId)
    }

    deletePayer(payerId: string): void {
        this.room?.deletePayer(payerId)
    }

    settleBalance(): void {
        this.room = this.room?.settleBalance();
    }

    updateName(newName: string): void {
        this.room = this.room?.updateName(newName);
    }
}