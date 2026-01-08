// Auth
export interface AuthResponseDto {
  userId: number;
  username: string;
  token: string;
}

export interface LoginDto {
  username: string;
  password: string;
}

export interface RegisterDto {
  username: string;
  password: string;
}

// Shows
export interface ShowDto {
  id: number;
  startTime: string;
  price: number;
  movieId: number;
  movieTitle: string;
  auditoriumId: number;
  auditoriumName: string;
}

export interface CreateShowDto {
  startTime: string;
  price: number;
  movieId: number;
  auditoriumId: number;
}

// Movies
export interface MovieDto {
  id: number;
  title: string;
  durationMinutes: number;
  genres: string[];
}

export interface CreateMovieDto {
  title: string;
  durationMinutes: number;
  genres: string[];
}

// Bookings
export interface BookingSeatDto {
  seatId: number;
  row: string;
  number: number;
  priceAtBooking: number;
}

export interface BookingDto {
  id: number;
  userId: string;
  showId: number;

  showStartTime: string;
  movieTitle: string;
  auditoriumName: string;

  createdAt: string;
  status: string;

  seats: BookingSeatDto[];

  paymentAmount?: number | null;
  paymentStatus?: string | null;
  paymentMethod?: string | null;
}

export interface CreateBookingDto {
  showId: number;
  seatIds: number[];
}