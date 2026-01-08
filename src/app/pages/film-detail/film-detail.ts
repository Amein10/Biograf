import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { MovieService } from '../../services/movie.service';
import { MovieDto } from '../../services/api-dtos';
import { ShowService } from '../../services/show.service';
import { ShowDto } from '../../services/api-dtos';

@Component({
  selector: 'app-film-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './film-detail.html',
  styleUrl: './film-detail.css',
})
export class FilmDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private movieService = inject(MovieService);
  private showService = inject(ShowService);

  movieId = Number(this.route.snapshot.paramMap.get('id'));

  loadingMovie = true;
  loadingShows = true;

  movie: MovieDto | null = null;
  shows: ShowDto[] = [];

  errorMovie = '';
  errorShows = '';

  ngOnInit(): void {
    if (!this.movieId || this.movieId <= 0) {
      this.loadingMovie = false;
      this.movie = null;
      return;
    }

    this.loadingMovie = true;
    this.movieService.getById(this.movieId).subscribe({
      next: (m) => {
        this.movie = m;
        this.loadingMovie = false;

        // hent shows når movie er hentet
        this.loadShows(m.id);
      },
      error: () => {
        this.loadingMovie = false;
        this.movie = null;
        this.errorMovie = 'Kunne ikke hente filmen fra API.';
      },
    });
  }

  private loadShows(movieId: number) {
    this.loadingShows = true;
    this.showService.getByMovie(movieId).subscribe({
next: (list) => {
  const items = (list ?? []).slice();

  // Sortér: nærmeste først (stigende startTime)
  items.sort((a, b) => {
    const ta = new Date(a.startTime).getTime();
    const tb = new Date(b.startTime).getTime();
    return ta - tb;
  });

  this.shows = items;
  this.loadingShows = false;
},
      error: () => {
        this.shows = [];
        this.loadingShows = false;
        this.errorShows = 'Kunne ikke hente tider fra API.';
      },
    });
  }

  genresText(movie: MovieDto): string {
    return movie.genres?.length ? movie.genres.join(', ') : 'Ukendt genre';
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
  isPastShow(show: ShowDto): boolean {
  return new Date(show.startTime).getTime() < Date.now();
}
}
