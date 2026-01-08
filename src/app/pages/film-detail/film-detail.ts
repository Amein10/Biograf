import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FilmService, Film } from '../../services/film';

@Component({
  selector: 'app-film-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './film-detail.html',
  styleUrl: './film-detail.css',
})
export class FilmDetail {
  film: Film | null = null;

  constructor(
    private route: ActivatedRoute,
    private filmService: FilmService
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.film = this.filmService.getFilmById(id);
  }
}
