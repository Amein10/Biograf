import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FilmService, Film } from '../../../services/film';

@Component({
  selector: 'app-admin-film-list',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './admin-film-list.html',
  styleUrl: './admin-film-list.css',
})
export class AdminFilmList {
  filmListe: Film[] = [];

  constructor(private filmService: FilmService) {
    this.refresh();
  }

  refresh() {
    this.filmListe = this.filmService.getFilms();
  }

  deleteFilm(id: number) {
    const ok = confirm('Er du sikker på at du vil slette filmen?');
    if (!ok) return;

    this.filmService.deleteFilm(id);
    this.refresh();
  }
}
