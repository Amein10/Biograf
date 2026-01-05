import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmService, Film } from '../../services/film';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-film-detail',
  standalone: true,
  imports: [NgIf],
  templateUrl: './film-detail.html',
  styleUrl: './film-detail.css'
})
export class FilmDetail {
  film?: Film | null;

  constructor(
    private route: ActivatedRoute,
    private filmService: FilmService
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.film = this.filmService.getFilmById(id);
  }
}
