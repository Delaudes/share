import { LocalStorageService } from "../../../../local-storage/infrastructure/ports/local-storage.service";
import { Room } from "../../../../room/domain/models/room";
import { mapToRooms } from "../../../../room/infrastructure/mappers/storage-room.mapper";
import { BalanceService } from "../../../domain/ports/balance.service";

export class StorageBalanceService implements BalanceService {
    constructor(private readonly localStorageService: LocalStorageService) { }

    async settle(roomId: string): Promise<void> {
        const stringRooms = this.localStorageService.getItem('share');
        const rooms = mapToRooms(stringRooms);

        const updatedRooms = rooms.map((room: Room) =>
            room.is(roomId) ? room.settleBalance() : room
        );

        this.localStorageService.setItem('share', JSON.stringify(updatedRooms));
    }
}
