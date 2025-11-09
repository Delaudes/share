import { FakeLocalStorageService } from "../../../../local-storage/infrastructure/adapters/fake-local-storage.service";
import { StorageBalanceService } from "./storage-balance.service";

describe('StorageBalanceService', () => {
    let storageBalanceService: StorageBalanceService;
    let fakeLocalStorageService: FakeLocalStorageService;

    beforeEach(() => {
        fakeLocalStorageService = new FakeLocalStorageService();
        storageBalanceService = new StorageBalanceService(fakeLocalStorageService);
    });

    it('should settle balance and clear all expenses from room in storage', async () => {
        const roomId = 'room-002';

        await storageBalanceService.settle(roomId);

        expect(fakeLocalStorageService.key).toEqual('share');
        expect(fakeLocalStorageService.newItem).toEqual(`[{"id":"${roomId}","name":"Roomate","payers":[{"id":"payer-001","name":"Alice","expenses":[]}]}]`);
    });
});
