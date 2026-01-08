import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  BehaviorSubject,
  Subject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  switchMap,
} from 'rxjs';

import { MovieService } from '../../../services/movie.service';
import { MovieDto } from '../../../services/api-dtos';

@Component({
  selector: 'app-admin-film-list',
  standalone: true,
  imports: [RouterLink, FormsModule, AsyncPipe],
  templateUrl: './admin-film-list.html',
  styleUrl: './admin-film-list.css',
})
export class AdminFilmList {
  private movieService = inject(MovieService);

  query = '';
  private query$ = new BehaviorSubject<string>('');
  private refresh$ = new Subject<void>();

  movies$ = this.refresh$.pipe(
    startWith(void 0),
    switchMap(() => this.movieService.getAll())
  );

  filteredMovies$ = combineLatest([
    this.movies$,
    this.query$.pipe(startWith(''), debounceTime(200), distinctUntilChanged()),
  ]).pipe(
    map(([movies, q]) => {
      const s = (q ?? '').trim().toLowerCase();
      if (!s) return movies;
      return movies.filter((m: MovieDto) =>
        (m.title ?? '').toLowerCase().includes(s)
      );
    })
  );

  onQueryChange(v: string) {
    this.query$.next(v ?? '');
  }

  deleteMovie(id: number) {
    const ok = confirm('Er du sikker på at du vil slette filmen?');
    if (!ok) return;

    this.movieService.delete(id).subscribe({
      next: () => this.refresh$.next(),
      error: () => alert('Kunne ikke slette filmen.'),
    });
  }
}
