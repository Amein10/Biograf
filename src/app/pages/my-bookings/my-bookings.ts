import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { BookingService, Booking } from '../../services/booking.service';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './my-bookings.html',
  styleUrl: './my-bookings.css',
})
export class MyBookings {
  private auth = inject(AuthService);
  private bookingService = inject(BookingService);

  userEmail = computed(() => this.auth.getUser()?.email ?? '');

  get bookings(): Booking[] {
    const email = this.userEmail();
    if (!email) return [];
    return this.bookingService.getForUser(email);
  }

  deleteBooking(id: string) {
    const email = this.userEmail();
    if (!email) return;

    const ok = confirm('Slet booking?');
    if (!ok) return;

    this.bookingService.delete(id, email);
  }

  formatDate(iso: string): string {
    const d = new Date(iso);
    return d.toLocaleString('da-DK', { weekday: 'short', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
  }
}
