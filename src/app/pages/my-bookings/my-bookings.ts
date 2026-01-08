import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { BookingService } from '../../services/booking.service';
import { BookingDto, BookingSeatDto } from '../../services/api-dtos';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [RouterLink, AsyncPipe],
  templateUrl: './my-bookings.html',
  styleUrl: './my-bookings.css',
})
export class MyBookings {
  private auth = inject(AuthService);
  private bookingService = inject(BookingService);

  user = this.auth.getUser();

  bookings$: Observable<BookingDto[]> = this.user
    ? this.bookingService.getForMe()
    : of([]);

  deleteBooking(id: number) {
    const ok = confirm('Slet booking?');
    if (!ok) return;

    this.bookingService.delete(id).subscribe({
      next: () => {
        this.bookings$ = this.bookingService.getForMe();
      },
      error: () => alert('Kunne ikke slette booking.'),
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

  seatsText(b: BookingDto): string {
    if (!b.seats || b.seats.length === 0) return '-';
    return b.seats.map((s: BookingSeatDto) => `${s.row}${s.number}`).join(', ');
  }
}
