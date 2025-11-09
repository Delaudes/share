import { FakeLocalStorageService } from "../../../../local-storage/infrastructure/adapters/fake-local-storage.service"
import { FakeUuidService } from "../../../../uuid/infrastructure/adapters/fake-uuid.service"
import { Room } from "../../../domain/models/room"
import { RoomList } from "../../../domain/models/room-list"
import { StorageRoomService } from "./storage-room.service"

describe('StorageRoomService', () => {
    let storageRoomService: StorageRoomService
    let fakeLocalStorageService: FakeLocalStorageService
    let fakeUuidService: FakeUuidService

    beforeEach(() => {
        fakeLocalStorageService = new FakeLocalStorageService()
        fakeUuidService = new FakeUuidService()
        storageRoomService = new StorageRoomService(fakeLocalStorageService, fakeUuidService)
    })

    it('should create room in storage', async () => {
        const roomName = 'Holidays'

        const room = await storageRoomService.create(roomName)

        expect(room).toEqual(new Room(fakeUuidService.uuid, roomName, []))
        expect(fakeLocalStorageService.key).toEqual('share')
        expect(fakeLocalStorageService.newItem).toEqual(`[{"id":"room-002","name":"Roomate","payers":[{"id":"payer-001","name":"Alice","expenses":[{"id":"expense-001","name":"Groceries","amount":50}]}]},{"id":"${fakeUuidService.uuid}","name":"${roomName}","payers":[]}]`)
    })

    it('should create first room in storage', async () => {
        const roomName = 'Holidays'
        fakeLocalStorageService.item = undefined

        await storageRoomService.create('Holidays')

        expect(fakeLocalStorageService.newItem).toEqual(`[{"id":"${fakeUuidService.uuid}","name":"${roomName}","payers":[]}]`)
    })

    it('should fetch room from storage', async () => {
        const roomId = 'room-002'

        const room = await storageRoomService.fetch(roomId)

        expect(room).toBeDefined()
        expect(fakeLocalStorageService.key).toEqual('share')
    })

    it('should fetch undefined room from storage', async () => {
        fakeLocalStorageService.item = undefined

        const room = await storageRoomService.fetch('room-002')

        expect(room).toBeUndefined()
    })

    it('should fetch roomList from storage', async () => {
        const roomList = await storageRoomService.fetchAll()

        expect(roomList).toBeDefined()
        expect(fakeLocalStorageService.key).toEqual('share')
    })

    it('should fetch undefined roomList from storage', async () => {
        fakeLocalStorageService.item = undefined

        const roomList = await storageRoomService.fetchAll()

        expect(roomList).toEqual(new RoomList([]))
    })

    it('should delete room from storage', async () => {
        const roomId = 'room-002'

        await storageRoomService.delete(roomId)

        expect(fakeLocalStorageService.key).toEqual('share')
        expect(fakeLocalStorageService.newItem).toEqual('[]')
    })

    it('should update room name in storage', async () => {
        const roomId = 'room-002'
        const newName = 'Summer Trip'

        await storageRoomService.updateName(roomId, newName)

        expect(fakeLocalStorageService.key).toEqual('share')
        expect(fakeLocalStorageService.newItem).toEqual(`[{"id":"${roomId}","name":"${newName}","payers":[{"id":"payer-001","name":"Alice","expenses":[{"id":"expense-001","name":"Groceries","amount":50}]}]}]`)
    });
})