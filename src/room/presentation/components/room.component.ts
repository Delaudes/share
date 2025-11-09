import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BalanceComponent } from '../../../balance/presentation/components/balance.component';
import { AddPayerUseCase } from '../../../payer/domain/use-cases/add-payer.use-case';
import { PayerComponent } from '../../../payer/presentation/components/payer.component';
import { ROUTER_SERVICE_TOKEN } from '../../../router/infrastructure/ports/router.service';
import { ROOM_STORE_TOKEN } from '../../domain/ports/room.store';
import { LoadRoomUseCase } from '../../domain/use-cases/load-room.use-case';
import { UpdateRoomNameUseCase } from '../../domain/use-cases/update-room-name.use-case';

@Component({
  selector: 'app-room',
  imports: [FormsModule, PayerComponent, BalanceComponent],
  templateUrl: './room.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomComponent implements OnInit {
  protected payerName = ''
  protected isEditingName = signal(false)
  protected editedName = ''

  private readonly routerService = inject(ROUTER_SERVICE_TOKEN)
  protected readonly roomStore = inject(ROOM_STORE_TOKEN)
  private readonly loadRoomUseCase = inject(LoadRoomUseCase)
  private readonly addPayerUseCase = inject(AddPayerUseCase)
  private readonly updateRoomNameUseCase = inject(UpdateRoomNameUseCase)

  async ngOnInit() {
    const roomId = this.routerService.getParamValue('id')
    if (roomId) {
      await this.loadRoomUseCase.execute(roomId)
    }
  }

  protected async addPayer() {
    await this.addPayerUseCase.execute(this.payerName)
    this.payerName = ''
  }

  protected startEditingName() {
    this.editedName = this.roomStore.room()?.name || ''
    this.isEditingName.set(true)
  }

  protected async saveRoomName() {
    await this.updateRoomNameUseCase.execute(this.editedName.trim())
    this.isEditingName.set(false)
  }

  protected cancelEditingName() {
    this.isEditingName.set(false)
  }
}
