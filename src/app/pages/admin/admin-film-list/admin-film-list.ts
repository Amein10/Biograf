import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';  // <-- korrekt
import { FilmService, Film } from '../../../services/film';

@Component({
  selector: 'app-admin-film-list',
  standalone: true,
  imports: [NgFor, RouterLink],   // <-- RouterLink SKAL stå her
  templateUrl: './admin-film-list.html',
  styleUrl: './admin-film-list.css'
})
export class AdminFilmList {

  filmListe: Film[] = [];

  constructor(private filmService: FilmService) {
    this.filmListe = this.filmService.getFilms();
  }

  deleteFilm(id: number) {
    this.filmService.deleteFilm(id);
    this.filmListe = this.filmService.getFilms();
  }
}
