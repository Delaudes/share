import { RoomService } from "../ports/room.service";
import { RoomStore } from "../ports/room.store";

export class UpdateRoomNameUseCase {
    constructor(private readonly roomService: RoomService, private readonly roomStore: RoomStore) { }

    async execute(newName: string): Promise<void> {
        const roomId = this.roomStore.getRoom()!.id;
        await this.roomService.updateName(roomId, newName);

        this.roomStore.updateName(newName);
    }
}
