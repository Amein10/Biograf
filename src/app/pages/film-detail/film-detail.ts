import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FilmService, Film } from '../../services/film';
import { ShowService, Show } from '../../services/show.service';

@Component({
  selector: 'app-film-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './film-detail.html',
  styleUrl: './film-detail.css',
})
export class FilmDetail {
  film: Film | null = null;
  shows: Show[] = [];

  constructor(
    private route: ActivatedRoute,
    private filmService: FilmService,
    private showService: ShowService
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.film = this.filmService.getFilmById(id);
    this.shows = this.film ? this.showService.getShowsByFilm(this.film.id) : [];
  }

  formatDate(iso: string): string {
    const d = new Date(iso);
    return d.toLocaleString('da-DK', { weekday: 'short', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
  }
}
