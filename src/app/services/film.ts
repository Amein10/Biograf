import { Injectable, signal } from '@angular/core';

export interface Film {
  id: number;
  titel: string;
  beskrivelse: string;
  aar: number;
  genre: string;
}

@Injectable({ providedIn: 'root' })
export class FilmService {
  private readonly _films = signal<Film[]>([
    { id: 1, titel: 'Inception', beskrivelse: 'Drømme i flere lag.', aar: 2010, genre: 'Sci-fi' },
    { id: 2, titel: 'The Dark Knight', beskrivelse: 'Batman mod Joker.', aar: 2008, genre: 'Action' },
    { id: 3, titel: 'Interstellar', beskrivelse: 'Rejse gennem rummet.', aar: 2014, genre: 'Sci-fi' },
    { id: 4, titel: 'Parasite', beskrivelse: 'En mørk komedie om klasseforskel.', aar: 2019, genre: 'Drama' },
    { id: 5, titel: 'Toy Story', beskrivelse: 'Legetøj med følelser og eventyr.', aar: 1995, genre: 'Animation' },
  ]);

  getFilms(): Film[] {
    return this._films();
  }

  getFilmById(id: number): Film | null {
    return this._films().find(f => f.id === id) ?? null;
  }

  addFilm(film: Film): void {
    this._films.update(list => [...list, film]);
  }

  updateFilm(film: Film): void {
    this._films.update(list => list.map(f => (f.id === film.id ? film : f)));
  }

  deleteFilm(id: number): void {
    this._films.update(list => list.filter(f => f.id !== id));
  }
}
