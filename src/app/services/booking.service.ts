import { Injectable } from '@angular/core';

export interface Booking {
  id: string;
  userEmail: string;
  showId: number;
  filmId: number;
  filmTitle: string;
  startTime: string;
  auditorium: string;
  seats: string[];
  totalPrice: number;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class BookingService {
  private readonly key = 'bookings';

  getAll(): Booking[] {
    const raw = localStorage.getItem(this.key);
    return raw ? (JSON.parse(raw) as Booking[]) : [];
  }

  getForUser(email: string): Booking[] {
    return this.getAll()
      .filter(b => b.userEmail === email)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  getBookedSeatsForShow(showId: number): string[] {
    const seats = this.getAll()
      .filter(b => b.showId === showId)
      .flatMap(b => b.seats);
    return Array.from(new Set(seats));
  }

  add(booking: Booking): void {
    const all = this.getAll();
    localStorage.setItem(this.key, JSON.stringify([booking, ...all]));
  }

  delete(bookingId: string, userEmail: string): void {
    const all = this.getAll();
    const next = all.filter(b => !(b.id === bookingId && b.userEmail === userEmail));
    localStorage.setItem(this.key, JSON.stringify(next));
  }
}
