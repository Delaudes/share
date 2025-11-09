import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { BALANCE_PROVIDERS, EXPENSE_PROVIDERS, LOCAL_STORAGE_PROVIDERS, NAVIGATION_PROVIDERS, PAYER_PROVIDERS, ROOM_PROVIDERS, UUID_PROVIDERS } from './app.providers';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    ...LOCAL_STORAGE_PROVIDERS,
    ...UUID_PROVIDERS,
    ...ROOM_PROVIDERS,
    ...PAYER_PROVIDERS,
    ...EXPENSE_PROVIDERS,
    ...NAVIGATION_PROVIDERS,
    ...BALANCE_PROVIDERS
  ]
};
