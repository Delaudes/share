import { LocalStorageService } from "../../../../local-storage/infrastructure/ports/local-storage.service";
import { UuidService } from "../../../../uuid/infrastructure/ports/uuid.service";
import { Room } from "../../../domain/models/room";
import { RoomList } from "../../../domain/models/room-list";
import { RoomService } from "../../../domain/ports/room.service";
import { mapToRooms } from "../../mappers/storage-room.mapper";

export class StorageRoomService implements RoomService {
    constructor(private readonly localStorageService: LocalStorageService, private readonly uuidService: UuidService) { }


    async create(roomName: string): Promise<Room> {
        const room = new Room(this.uuidService.generate(), roomName, [])

        const stringRooms = this.localStorageService.getItem('share');
        const rooms = mapToRooms(stringRooms);

        this.localStorageService.setItem('share', JSON.stringify([...rooms, room]))

        return room
    }

    async fetch(roomId: string): Promise<Room | undefined> {
        const stringRooms = this.localStorageService.getItem('share')
        const rooms = mapToRooms(stringRooms);

        return rooms.find((room) => room.is(roomId))
    }

    async fetchAll(): Promise<RoomList> {
        const stringRooms = this.localStorageService.getItem('share')
        const rooms = mapToRooms(stringRooms);

        return new RoomList(rooms)
    }

    async delete(roomId: string): Promise<void> {
        const stringRooms = this.localStorageService.getItem('share')
        const rooms = mapToRooms(stringRooms);

        const filteredRooms = rooms.filter((room) => !room.is(roomId))
        this.localStorageService.setItem('share', JSON.stringify(filteredRooms))
    }

    async updateName(roomId: string, newName: string): Promise<void> {
        const stringRooms = this.localStorageService.getItem('share');
        const rooms = mapToRooms(stringRooms);

        const updatedRooms = rooms.map((room) =>
            room.is(roomId) ? room.updateName(newName) : room
        );

        this.localStorageService.setItem('share', JSON.stringify(updatedRooms));
    }
}