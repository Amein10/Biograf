import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FilmService } from '../../services/film';
import { ShowService, Show } from '../../services/show.service';
import { BookingService, Booking } from '../../services/booking.service';

type Seat = { code: string; isBooked: boolean; isSelected: boolean };

@Component({
  selector: 'app-seat-select',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './seat-select.html',
  styleUrl: './seat-select.css',
})
export class SeatSelect {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private auth = inject(AuthService);
  private showService = inject(ShowService);
  private filmService = inject(FilmService);
  private bookingService = inject(BookingService);

  showId = Number(this.route.snapshot.paramMap.get('showId'));
  show: Show | null = this.showService.getShowById(this.showId);

  // find film title
  filmTitle = this.show ? (this.filmService.getFilmById(this.show.filmId)?.titel ?? 'Ukendt film') : 'Ukendt film';

  // seat grid config
  rows = ['A', 'B', 'C', 'D', 'E', 'F'];
  cols = Array.from({ length: 10 }, (_, i) => i + 1);

  selected = new Set<string>();

  bookedSeats = new Set<string>(
    this.bookingService.getBookedSeatsForShow(this.showId)
  );

  seats: Seat[] = [];

  constructor() {
    this.buildSeats();
  }

  userEmail = computed(() => this.auth.getUser()?.email ?? '');

  private buildSeats() {
    const all: Seat[] = [];
    for (const r of this.rows) {
      for (const c of this.cols) {
        const code = `${r}${c}`;
        all.push({
          code,
          isBooked: this.bookedSeats.has(code),
          isSelected: this.selected.has(code),
        });
      }
    }
    this.seats = all;
  }

  toggleSeat(code: string) {
    if (this.bookedSeats.has(code)) return;

    if (this.selected.has(code)) this.selected.delete(code);
    else this.selected.add(code);

    this.buildSeats();
  }

  get selectedList(): string[] {
    return Array.from(this.selected).sort();
  }

  get totalPrice(): number {
    if (!this.show) return 0;
    return this.selectedList.length * this.show.price;
  }

  confirmBooking() {
    const email = this.userEmail();
    if (!email) return;

    if (!this.show) return;
    if (this.selectedList.length === 0) return;

    // sikkerhed: check igen om nogle seats blev booket imens (mock, men fint)
    for (const s of this.selectedList) {
      if (this.bookedSeats.has(s)) {
        alert('Et af dine sæder er allerede booket. Prøv igen.');
        return;
      }
    }

    const booking: Booking = {
      id: crypto.randomUUID(),
      userEmail: email,
      showId: this.show.id,
      filmId: this.show.filmId,
      filmTitle: this.filmTitle,
      startTime: this.show.startTime,
      auditorium: this.show.auditorium,
      seats: this.selectedList,
      totalPrice: this.totalPrice,
      createdAt: new Date().toISOString(),
    };

    this.bookingService.add(booking);

    alert('Booking gemt!');
    this.router.navigateByUrl('/my-bookings');
  }

  formatDate(iso: string): string {
    const d = new Date(iso);
    return d.toLocaleString('da-DK', { weekday: 'short', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
  }
}
