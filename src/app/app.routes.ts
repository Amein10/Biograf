import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { FilmList } from './pages/film-list/film-list';
import { FilmDetail } from './pages/film-detail/film-detail';
import { AdminFilmList } from './pages/admin/admin-film-list/admin-film-list';
import { adminGuard } from './guards/admin.guard';
import { authGuard } from './guards/auth.guard';

// Hvis du IKKE har disse pages endnu, så sig til – så giver jeg dem også.
import { Profile } from './pages/profile/profile';
import { MyBookings } from './pages/my-bookings/my-bookings';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: Login },

  { path: 'film', component: FilmList },
  { path: 'film/:id', component: FilmDetail },

  // FÆLLES (kræver login)
  { path: 'profile', component: Profile, canActivate: [authGuard] },
  { path: 'my-bookings', component: MyBookings, canActivate: [authGuard] },

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

  {
  path: 'shows/:showId/seats',
  canActivate: [authGuard],
  loadComponent: () =>
    import('./pages/seat-select/seat-select').then(m => m.SeatSelect),
},

  // ADMIN SHOWS (tider)
  {
    path: 'admin/shows',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./pages/admin/admin-show-list/admin-show-list').then(m => m.AdminShowList),
  },
  {
    path: 'admin/shows/create',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./pages/admin/admin-show-create/admin-show-create').then(m => m.AdminShowCreate),
  },
  {
    path: 'admin/shows/edit/:id',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./pages/admin/admin-show-edit/admin-show-edit').then(m => m.AdminShowEdit),
  },


  { path: '**', redirectTo: '' },
];
