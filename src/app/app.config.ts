import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection
} from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { firebaseAppFactory } from './configFirebase/firebaseConfig';

export const appConfig: ApplicationConfig = {
  providers: [
    // 1. NUR diese Zeile behalten (mit Klammern bei withHashLocation!)
    provideRouter(routes, withHashLocation()), 
    
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideFirebaseApp(firebaseAppFactory),
    provideFirestore(() => getFirestore())
  ]
};
