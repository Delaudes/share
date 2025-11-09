import { Payer } from "../../../payer/domain/models/payer";
import { FakeRoomService } from "../fakes/fake-room.service";
import { FakeRoomStore } from "../fakes/fake-room.store";
import { Room } from "../models/room";
import { UpdateRoomNameUseCase } from "./update-room-name.use-case";

describe('UpdateRoomNameUseCase', () => {
    let updateRoomNameUseCase: UpdateRoomNameUseCase;
    let fakeRoomService: FakeRoomService;
    let fakeRoomStore: FakeRoomStore;

    beforeEach(() => {
        fakeRoomStore = new FakeRoomStore();
        fakeRoomStore.setRoom(new Room('room-001', 'Holidays', [new Payer('payer-001', 'John', [])]));
        fakeRoomService = new FakeRoomService();
        updateRoomNameUseCase = new UpdateRoomNameUseCase(fakeRoomService, fakeRoomStore);
    });

    it('should update room name', async () => {
        const newName = 'Summer Trip';

        await updateRoomNameUseCase.execute(newName);

        expect(fakeRoomService.updatedRoomId).toEqual('room-001');
        expect(fakeRoomService.updatedRoomName).toEqual(newName);
        expect(fakeRoomStore.getRoom()?.name).toEqual(newName);
    });
});
