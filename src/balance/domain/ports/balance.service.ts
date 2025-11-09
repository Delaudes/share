import { InjectionToken } from "@angular/core";

export interface BalanceService {
    settle(roomId: string): Promise<void>;
}

export const BALANCE_SERVICE_TOKEN = new InjectionToken<BalanceService>('BalanceService')
