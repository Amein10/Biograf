import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookingDto, CreateBookingDto } from './api-dtos';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private readonly baseUrl = '/api/Bookings'; // <-- vigtigt: samme casing som din API route

  constructor(private http: HttpClient) {}

  /** GET /api/Bookings/me (kræver Bearer token) */
  getForMe(): Observable<BookingDto[]> {
    return this.http.get<BookingDto[]>(`${this.baseUrl}/me`);
  }

  /** POST /api/Bookings (kræver Bearer token) */
  create(dto: CreateBookingDto): Observable<BookingDto> {
    return this.http.post<BookingDto>(this.baseUrl, dto);
  }

  /** DELETE /api/Bookings/{id} (kræver Bearer token) */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
