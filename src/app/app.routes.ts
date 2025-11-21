import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { FilmList } from './pages/film-list/film-list';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: 'film', component: FilmList},
  { path: '**', redirectTo: '' }
];

// Childroutes eller Children Routes Ide.