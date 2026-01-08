import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BehaviorSubject, combineLatest, debounceTime, distinctUntilChanged, map, startWith } from 'rxjs';

import { MovieService } from '../../services/movie.service';
import { MovieDto } from '../../services/api-dtos';

@Component({
  selector: 'app-film-list',
  standalone: true,
  imports: [RouterLink, FormsModule, AsyncPipe],
  templateUrl: './film-list.html',
  styleUrl: './film-list.css',
})
export class FilmList {
  private movieService = inject(MovieService);

  query = '';
  private query$ = new BehaviorSubject<string>('');

  movies$ = this.movieService.getAll();

  filteredMovies$ = combineLatest([
    this.movies$,
    this.query$.pipe(
      startWith(''),
      debounceTime(200),
      distinctUntilChanged()
    ),
  ]).pipe(
    map(([movies, q]) => {
      const s = (q ?? '').trim().toLowerCase();
      if (!s) return movies;
      return movies.filter(m => (m.title ?? '').toLowerCase().includes(s));
    })
  );

  onQueryChange(value: string) {
    this.query$.next(value ?? '');
  }

  // (valgfrit) hvis du vil bruge trackBy-funktion
  trackById(_: number, m: MovieDto) {
    return m.id;
  }
}
