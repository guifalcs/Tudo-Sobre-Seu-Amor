import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes, scrollConfig } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers:
  [
   provideZoneChangeDetection({ eventCoalescing: true }),
   provideRouter(
    routes,
    withInMemoryScrolling(scrollConfig)
  )
  ]
};
