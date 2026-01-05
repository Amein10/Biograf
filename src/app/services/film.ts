import { Injectable, signal } from '@angular/core';

export interface Film {
  id: number;
  titel: string;
  beskrivelse: string;
  aar: number;
  genre: string;
}

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  // signal holder vores film-liste i memory
  private readonly _films = signal<Film[]>([
    { id: 1, titel: 'Inception', beskrivelse: 'Drømme i flere lag.', aar: 2010, genre: 'Sci-fi' },
    { id: 2, titel: 'The Dark Knight', beskrivelse: 'Batman mod Joker.', aar: 2008, genre: 'Action' },
    { id: 3, titel: 'Interstellar', beskrivelse: 'Rejse gennem rummet.', aar: 2014, genre: 'Sci-fi' }
  ]);

  // hent ALLE film
  getFilms() {
    return this._films();
  }

  // hent film efter id
  getFilmById(id: number) {
    return this._films().find(f => f.id === id) ?? null;
  }

  // ▶ CRUD (til senere admin sider)
  addFilm(film: Film) {
    this._films.update(list => [...list, film]);
  }

  updateFilm(film: Film) {
    this._films.update(list =>
      list.map(f => f.id === film.id ? film : f)
    );
  }

  deleteFilm(id: number) {
    this._films.update(list =>
      list.filter(f => f.id !== id)
    );
  }
}
