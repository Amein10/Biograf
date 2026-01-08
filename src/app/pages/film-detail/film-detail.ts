import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';

import { FilmService, Film } from '../../services/film';
import { ShowService, ShowDto } from '../../services/show.service';

@Component({
  selector: 'app-film-detail',
  standalone: true,
  imports: [RouterLink, AsyncPipe],
  templateUrl: './film-detail.html',
  styleUrl: './film-detail.css',
})
export class FilmDetail {
  filmId: number;

  film$: Observable<Film>;
  shows$: Observable<ShowDto[]>;

  constructor(
    private route: ActivatedRoute,
    private filmService: FilmService,
    private showService: ShowService
  ) {
    this.filmId = Number(this.route.snapshot.paramMap.get('id'));

    // ✅ FilmService.getFilmById() returnerer Observable<Film>
    this.film$ = this.filmService.getFilmById(this.filmId);

    // ✅ Shows hentes fra API via ShowService.getByMovie(movieId)
    this.shows$ = this.film$.pipe(
      switchMap(film => (film ? this.showService.getByMovie(film.id) : of([])))
    );
  }

  formatDate(iso: string): string {
    const d = new Date(iso);
    return d.toLocaleString('da-DK', {
      weekday: 'short',
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}
