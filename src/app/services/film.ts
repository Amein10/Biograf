import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { CreateMovieDto, MovieDto } from './api-dtos';

export interface Film {
  id: number;
  titel: string;
  beskrivelse: string;
  aar: number;
  genre: string; // komma-separeret tekst til UI
}

@Injectable({ providedIn: 'root' })
export class FilmService {
  private http = inject(HttpClient);

  // ✅ Proxy: kald ALTID /api/... (ikke https://localhost:7050)
  private readonly baseUrl = '/api/movies';

  /** GET /api/movies */
  getFilms(): Observable<Film[]> {
    return this.http.get<MovieDto[]>(this.baseUrl).pipe(
      map(list => list.map(m => this.fromApi(m)))
    );
  }

  /** GET /api/movies/{id} */
  getFilmById(id: number): Observable<Film> {
    return this.http.get<MovieDto>(`${this.baseUrl}/${id}`).pipe(
      map(m => this.fromApi(m))
    );
  }

  /** POST /api/movies */
  addFilm(film: Film): Observable<Film> {
    const payload: CreateMovieDto = this.toCreateDto(film);
    return this.http.post<MovieDto>(this.baseUrl, payload).pipe(
      map(m => this.fromApi(m))
    );
  }

  /** PUT /api/movies/{id} */
  updateFilm(id: number, film: Film): Observable<void> {
    const payload: CreateMovieDto = this.toCreateDto(film);
    return this.http.put<void>(`${this.baseUrl}/${id}`, payload);
  }

  /** DELETE /api/movies/{id} */
  deleteFilm(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // ----------------- mapping -----------------

  private fromApi(m: MovieDto): Film {
    return {
      id: m.id,
      titel: m.title,
      beskrivelse: `Varighed: ${m.durationMinutes} min`,
      aar: new Date().getFullYear(), // API har ikke "år" -> placeholder
      genre: (m.genres ?? []).join(', ')
    };
  }

  private toCreateDto(f: Film): CreateMovieDto {
    return {
      title: f.titel.trim(),
      durationMinutes: this.extractDurationFromDescription(f.beskrivelse) ?? 120,
      genres: f.genre
        ? f.genre.split(',').map(x => x.trim()).filter(Boolean)
        : []
    };
  }

  private extractDurationFromDescription(desc: string): number | null {
    const match = desc?.match(/(\d+)\s*min/i);
    return match ? Number(match[1]) : null;
  }
}