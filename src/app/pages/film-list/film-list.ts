import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FilmService, Film } from '../../services/film';

@Component({
  selector: 'app-film-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './film-list.html',
  styleUrl: './film-list.css',
})
export class FilmList {
  filmListe: Film[] = [];

  constructor(private filmService: FilmService) {
    this.filmListe = this.filmService.getFilms();
  }
}
