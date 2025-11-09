import { signal } from "@angular/core";
import { Expense } from "../../../../expense/domain/models/expense";
import { Payer } from "../../../../payer/domain/models/payer";
import { Room } from "../../../domain/models/room";
import { RoomStore } from "../../../domain/ports/room.store";

export class ReactiveRoomStore implements RoomStore {

    readonly room = signal<Room | undefined>(undefined)

    getRoom(): Room | undefined {
        return this.room()
    }

    setRoom(room?: Room): void {
        this.room.set(room)
    }

    addPayer(payer: Payer): void {
        const newRoom = this.room()?.addPayer(payer)
        this.setRoom(newRoom)
    }

    addExpense(expense: Expense, payerId: string): void {
        const newRoom = this.room()?.addExpense(expense, payerId)
        this.setRoom(newRoom)
    }

    deleteExpense(expenseId: string): void {
        const newRoom = this.room()?.deleteExpense(expenseId)
        this.setRoom(newRoom)
    }

    deletePayer(payerId: string): void {
        const newRoom = this.room()?.deletePayer(payerId)
        this.setRoom(newRoom)
    }

    settleBalance(): void {
        const newRoom = this.room()?.settleBalance();
        this.setRoom(newRoom);
    }

    updateName(newName: string): void {
        const newRoom = this.room()?.updateName(newName);
        this.setRoom(newRoom);
    }
}