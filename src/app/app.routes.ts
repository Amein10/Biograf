import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { FilmList } from './pages/film-list/film-list';
import { FilmDetail } from './pages/film-detail/film-detail';
import { AdminFilmList } from './pages/admin/admin-film-list/admin-film-list';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: 'film', component: FilmList },
  { path: 'film/:id', component: FilmDetail },

  // ADMIN (beskyttet)
  { path: 'admin/film', component: AdminFilmList, canActivate: [adminGuard] },
  {
    path: 'admin/film/create',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./pages/admin/admin-film-create/admin-film-create')
        .then(m => m.AdminFilmCreate)
  },
  {
    path: 'admin/film/edit/:id',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./pages/admin/admin-film-edit/admin-film-edit')
        .then(m => m.AdminFilmEdit)
  },

  { path: '**', redirectTo: '' },
];

// Childroutes eller Children Routes Ide.