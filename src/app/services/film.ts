import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { API_BASE } from './api';

export interface Film {
  id: number;
  titel: string;
  beskrivelse: string;
  aar: number;
  genre: string;
}

/** API DTO (det din .NET API sender lige nu) */
interface MovieApiDto {
  id: number;
  title: string;
  durationMinutes: number;
  genres: string[];
}

@Injectable({ providedIn: 'root' })
export class FilmService {
  constructor(private http: HttpClient) {}

  /** GET /api/movies */
  getFilms(): Observable<Film[]> {
    return this.http.get<MovieApiDto[]>(`${API_BASE}/movies`).pipe(
      map(list => list.map(m => this.fromApi(m)))
    );
  }

  /** GET /api/movies/{id} */
  getFilmById(id: number): Observable<Film> {
    return this.http.get<MovieApiDto>(`${API_BASE}/movies/${id}`).pipe(
      map(m => this.fromApi(m))
    );
  }

  /** POST /api/movies  (du skal have et endpoint i API'et der matcher) */
  addFilm(film: Film): Observable<Film> {
    const payload = this.toApi(film);
    return this.http.post<MovieApiDto>(`${API_BASE}/movies`, payload).pipe(
      map(m => this.fromApi(m))
    );
  }

  /** PUT /api/movies/{id} */
  updateFilm(film: Film): Observable<void> {
    const payload = this.toApi(film);
    return this.http.put<void>(`${API_BASE}/movies/${film.id}`, payload);
  }

  /** DELETE /api/movies/{id} */
  deleteFilm(id: number): Observable<void> {
    return this.http.delete<void>(`${API_BASE}/movies/${id}`);
  }

  // ----------------- mapping -----------------

  private fromApi(m: MovieApiDto): Film {
    return {
      id: m.id,
      titel: m.title,
      beskrivelse: `Varighed: ${m.durationMinutes} min`,
      aar: new Date().getFullYear(),          // API har ikke "year" i dit screenshot
      genre: (m.genres ?? []).join(', '),
    };
  }

  private toApi(f: Film) {
    // Dit API har måske en CreateMovieDto med andre felter.
    // Tilpas hvis din API kræver flere felter.
    return {
      title: f.titel,
      durationMinutes: this.extractDurationFromDescription(f.beskrivelse) ?? 120,
      genres: f.genre ? f.genre.split(',').map(x => x.trim()).filter(Boolean) : [],
    };
  }

  private extractDurationFromDescription(desc: string): number | null {
    // hvis beskrivelse fx "Varighed: 169 min"
    const match = desc.match(/(\d+)\s*min/i);
    return match ? Number(match[1]) : null;
  }
}
