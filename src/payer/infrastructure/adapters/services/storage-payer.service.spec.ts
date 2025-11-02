import { FakeLocalStorageService } from "../../../../local-storage/infrastructure/adapters/fake-local-storage.service"
import { FakeUuidService } from "../../../../uuid/infrastructure/adapters/fake-uuid.service"
import { Payer } from "../../../domain/models/payer"
import { StoragePayerService } from "./storage-payer.service"


describe('StoragePayerService', () => {
    let storagePayerService: StoragePayerService
    let fakeLocalStorageService: FakeLocalStorageService
    let fakeUuidService: FakeUuidService

    beforeEach(() => {
        fakeLocalStorageService = new FakeLocalStorageService()
        fakeUuidService = new FakeUuidService()
        storagePayerService = new StoragePayerService(fakeLocalStorageService, fakeUuidService)
    })

    it('should add payer to room in storage', async () => {
        const payerName = 'John'
        const roomId = 'room-002'

        const payer = await storagePayerService.add(payerName, roomId)

        expect(payer).toEqual(new Payer(fakeUuidService.uuid, payerName, []))
        expect(fakeLocalStorageService.key).toEqual('share')
        expect(fakeLocalStorageService.newItem).toEqual(`[{"id":"${roomId}","name":"Roomate","payers":[{"id":"payer-001","name":"Alice","expenses":[{"id":"expense-001","name":"Groceries","amount":50}]},{"id":"${fakeUuidService.uuid}","name":"${payerName}","expenses":[]}]}]`)
    })

    it('should delete payer from storage', async () => {
        const payerId = 'payer-001'

        await storagePayerService.delete(payerId)

        expect(fakeLocalStorageService.key).toEqual('share')
        expect(fakeLocalStorageService.newItem).not.toContain(payerId)
    })
})