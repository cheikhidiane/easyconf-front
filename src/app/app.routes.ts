import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';

export const routes: Routes = [
  { path: 'register', component: Register, title: 'S\'inscrire'},
  { path: 'login', component: Login, title: 'Se connecter'},
];
