import { InjectionToken } from '@angular/core';

export interface AppConfiguration {
  production: boolean;
  EduPan: string;
}

export const AppConfig = new InjectionToken<AppConfiguration>(
  '@@appConfiguration'
);
