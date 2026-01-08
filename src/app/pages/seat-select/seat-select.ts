import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { ShowService } from '../../services/show.service';
import { BookingService } from '../../services/booking.service';
import { ShowDto } from '../../services/api-dtos';

type Seat = { seatId: number; code: string; isSelected: boolean };

@Component({
  selector: 'app-seat-select',
  standalone: true,
  imports: [RouterLink, AsyncPipe],
  templateUrl: './seat-select.html',
  styleUrl: './seat-select.css',
})
export class SeatSelect {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private auth = inject(AuthService);
  private showService = inject(ShowService);
  private bookingService = inject(BookingService);

  showId = Number(this.route.snapshot.paramMap.get('showId'));
  show$: Observable<ShowDto> = this.showService.getById(this.showId);

  // mock seats (indtil vi har Seat endpoints)
  rows = ['A', 'B', 'C', 'D', 'E', 'F'];
  cols = Array.from({ length: 10 }, (_, i) => i + 1);

  selected = new Set<number>(); // seatId
  seats: Seat[] = [];

  constructor() {
    this.buildSeats();
  }

  private buildSeats() {
    const all: Seat[] = [];
    let seatId = 1;

    for (const r of this.rows) {
      for (const c of this.cols) {
        const code = `${r}${c}`;
        all.push({
          seatId,
          code,
          isSelected: this.selected.has(seatId),
        });
        seatId++;
      }
    }

    this.seats = all;
  }

  toggleSeat(seatId: number) {
    if (this.selected.has(seatId)) this.selected.delete(seatId);
    else this.selected.add(seatId);

    this.buildSeats();
  }

  get selectedCount(): number {
    return this.selected.size;
  }

  selectedCodesText(): string {
    const codes = this.seats
      .filter(seat => this.selected.has(seat.seatId))
      .map(seat => seat.code)
      .sort();
    return codes.length ? codes.join(', ') : '-';
  }

  confirmBooking(show: ShowDto) {
    if (!this.auth.isLoggedIn()) {
      alert('Du skal logge ind for at booke.');
      this.router.navigateByUrl(
        `/login?returnUrl=${encodeURIComponent(this.router.url)}`
      );
      return;
    }

    const seatIds = Array.from(this.selected.values()).sort((a, b) => a - b);
    if (seatIds.length === 0) return;

    this.bookingService.create({ showId: show.id, seatIds }).subscribe({
      next: () => {
        alert('Booking oprettet!');
        this.router.navigateByUrl('/my-bookings');
      },
      error: () =>
        alert('Kunne ikke oprette booking. Er du logget ind, og kører API?'),
    });
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
