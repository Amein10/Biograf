import { Injectable } from '@angular/core';

export interface Show {
  id: number;
  filmId: number;
  startTime: string;   // ISO string
  auditorium: string;  // fx "Sal 1"
  price: number;       // fx 95
}

@Injectable({ providedIn: 'root' })
export class ShowService {
  private shows: Show[] = [
    { id: 101, filmId: 1, startTime: '2026-01-10T18:00:00', auditorium: 'Sal 1', price: 95 },
    { id: 102, filmId: 1, startTime: '2026-01-10T20:30:00', auditorium: 'Sal 1', price: 110 },
    { id: 103, filmId: 2, startTime: '2026-01-11T19:00:00', auditorium: 'Sal 2', price: 100 },
    { id: 104, filmId: 3, startTime: '2026-01-12T17:30:00', auditorium: 'Sal 3', price: 90 },
    { id: 105, filmId: 4, startTime: '2026-01-12T20:00:00', auditorium: 'Sal 2', price: 105 },
    { id: 106, filmId: 5, startTime: '2026-01-13T16:00:00', auditorium: 'Sal 1', price: 80 },
  ];

  getAll(): Show[] {
    return [...this.shows].sort((a, b) => a.startTime.localeCompare(b.startTime));
  }

  getShowsByFilm(filmId: number): Show[] {
    return this.getAll().filter(s => s.filmId === filmId);
  }

  getShowById(showId: number): Show | null {
    return this.shows.find(s => s.id === showId) ?? null;
  }

  add(show: Show): void {
    this.shows = [...this.shows, show];
  }

  update(show: Show): void {
    this.shows = this.shows.map(s => (s.id === show.id ? show : s));
  }

  delete(showId: number): void {
    this.shows = this.shows.filter(s => s.id !== showId);
  }

  // lille helper til at lave "nyt id"
  nextId(): number {
    return Math.max(0, ...this.shows.map(s => s.id)) + 1;
  }
}
