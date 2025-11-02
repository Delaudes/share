import { LocalStorageService } from "../../../../local-storage/infrastructure/ports/local-storage.service";
import { mapToRooms } from "../../../../room/infrastructure/mappers/storage-room.mapper";
import { UuidService } from "../../../../uuid/infrastructure/ports/uuid.service";
import { Payer } from "../../../domain/models/payer";
import { PayerService } from "../../../domain/ports/payer.service";


export class StoragePayerService implements PayerService {
    constructor(private readonly localStorageService: LocalStorageService, private readonly uuidService: UuidService) { }

    async add(payerName: string, roomId: string): Promise<Payer> {
        const payer = new Payer(this.uuidService.generate(), payerName, [])

        const stringRooms = this.localStorageService.getItem('share')
        const rooms = mapToRooms(stringRooms);

        rooms.find((room) => room.is(roomId))?.addPayer(payer)
        this.localStorageService.setItem('share', JSON.stringify(rooms))

        return payer
    }

    async delete(payerId: string): Promise<void> {
        const stringRooms = this.localStorageService.getItem('share')
        const rooms = mapToRooms(stringRooms);

        rooms.forEach((room) => room.deletePayer(payerId))
        this.localStorageService.setItem('share', JSON.stringify(rooms))
    }
}