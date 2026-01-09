import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { ShowService } from '../../services/show.service';
import { BookingService } from '../../services/booking.service';
import { ShowDto } from '../../services/api-dtos';

type SeatStatusDto = {
  seatId: number;
  row: string;
  number: number;
  isBooked: boolean;
};

type SeatVM = {
  seatId: number;
  code: string;
  isBooked: boolean;
  isSelected: boolean;
};

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

  seats: SeatVM[] = [];
  selected = new Set<number>();

  constructor() {
    this.loadSeats();
  }

  private loadSeats() {
    this.showService.getSeats(this.showId).subscribe({
      next: (seats: SeatStatusDto[]) => {
        this.seats = seats.map(s => ({
          seatId: s.seatId,
          code: `${s.row}${s.number}`,
          isBooked: s.isBooked,
          isSelected: this.selected.has(s.seatId),
        }));
      },
      error: () => alert('Kunne ikke hente sæder fra API'),
    });
  }

  toggleSeat(seatId: number) {
    const seat = this.seats.find(s => s.seatId === seatId);
    if (!seat || seat.isBooked) return;

    if (this.selected.has(seatId)) this.selected.delete(seatId);
    else this.selected.add(seatId);

    this.seats = this.seats.map(s =>
      s.seatId === seatId
        ? { ...s, isSelected: this.selected.has(seatId) }
        : s
    );
  }

  get selectedCount(): number {
    return this.selected.size;
  }

  selectedCodesText(): string {
    return this.seats
      .filter(s => this.selected.has(s.seatId))
      .map(s => s.code)
      .sort()
      .join(', ') || '-';
  }

  confirmBooking(show: ShowDto) {
    if (!this.auth.isLoggedIn()) {
      alert('Du skal logge ind for at booke.');
      this.router.navigateByUrl(
        `/login?returnUrl=${encodeURIComponent(this.router.url)}`
      );
      return;
    }

    const seatIds = Array.from(this.selected.values());
    if (seatIds.length === 0) return;

    this.bookingService.create({ showId: show.id, seatIds }).subscribe({
      next: () => {
        alert('Booking oprettet!');
        this.selected.clear();
        this.loadSeats();
        this.router.navigateByUrl('/my-bookings');
      },
      error: () =>
        alert('Kunne ikke oprette booking (tjek login + API)'),
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
