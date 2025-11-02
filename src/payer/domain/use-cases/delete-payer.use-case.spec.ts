import { Payer } from "../../../payer/domain/models/payer";
import { FakeRoomStore } from "../../../room/domain/fakes/fake-room.store";
import { Room } from "../../../room/domain/models/room";
import { FakePayerService } from "../fakes/fake-payer.service";
import { DeletePayerUseCase } from "./delete-payer.use-case";

describe('DeletePayerUseCase', () => {
    let deletePayerUseCase: DeletePayerUseCase
    let fakePayerService: FakePayerService
    let fakeRoomStore: FakeRoomStore

    beforeEach(() => {
        fakeRoomStore = new FakeRoomStore()
        fakeRoomStore.setRoom(new Room('room-001', 'Holidays', [new Payer('payer-001', 'John', [])]))
        fakePayerService = new FakePayerService()
        deletePayerUseCase = new DeletePayerUseCase(fakePayerService, fakeRoomStore)
    })

    it('should delete payer', async () => {
        const payerId = 'payer-001'

        await deletePayerUseCase.execute(payerId)

        expect(fakeRoomStore.getRoom()?.payers).not.toContain(new Payer('payer-001', 'John', []))
        expect(fakePayerService.payerId).toEqual(payerId)
    })
})
