import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FilmService, Film } from '../../../services/film';

@Component({
  selector: 'app-admin-film-list',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './film-list.html',
  styleUrls: ['./film-list.css']
})
export class AdminFilmListComponent {
  filmListe: Film[] = [];

  constructor(private filmService: FilmService) {
    this.filmListe = this.filmService.getFilms();
  }

  sletFilm(id: number) {
    this.filmService.deleteFilm(id);
    this.filmListe = this.filmService.getFilms(); // opdatér listen
  }
}
