import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

import { FilmService, Film } from '../../../services/film';

@Component({
  selector: 'app-admin-film-list',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  templateUrl: './admin-film-list.html',
  styleUrl: './admin-film-list.css',
})
export class AdminFilmList {
  filmListe$: Observable<Film[]>;

  constructor(private filmService: FilmService) {
    this.filmListe$ = this.filmService.getFilms();
  }

  refresh() {
    this.filmListe$ = this.filmService.getFilms();
  }

  deleteFilm(id: number) {
    const ok = confirm('Er du sikker på at du vil slette filmen?');
    if (!ok) return;

    this.filmService.deleteFilm(id).subscribe({
      next: () => this.refresh(),
      error: () => alert('Kunne ikke slette filmen.'),
    });
  }
}
