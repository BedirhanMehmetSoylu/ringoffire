import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"ring-of-fire-4be26","appId":"1:356643315225:web:5896930e42aefc1be7d488","storageBucket":"ring-of-fire-4be26.firebasestorage.app","apiKey":"AIzaSyAQHi0mqof5YyS7slaHuOpVO1KrqUm2s2A","authDomain":"ring-of-fire-4be26.firebaseapp.com","messagingSenderId":"356643315225"})), provideFirestore(() => getFirestore())]
};
