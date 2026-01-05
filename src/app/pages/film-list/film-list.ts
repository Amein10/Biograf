import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';   // <-- IMPORTER DETTE
import { FilmService, Film } from '../../services/film';

@Component({
  selector: 'app-film-list',
  standalone: true,
  imports: [NgFor, RouterLink],   // <-- OG TILFØJ DET HER
  templateUrl: './film-list.html',
  styleUrl: './film-list.css'
})
export class FilmList {
  filmListe: Film[] = [];

  constructor(private filmService: FilmService) {
    this.filmListe = this.filmService.getFilms();
  }
}
