import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE } from './api';
import { BookingDto, CreateBookingDto } from './api-dtos';

@Injectable({ providedIn: 'root' })
export class BookingService {
  constructor(private http: HttpClient) {}

  /** GET /api/bookings/me (kræver Bearer token) */
  getForMe(): Observable<BookingDto[]> {
    return this.http.get<BookingDto[]>(`${API_BASE}/bookings/me`);
  }

  /** POST /api/bookings (kræver Bearer token) */
  create(dto: CreateBookingDto): Observable<BookingDto> {
    return this.http.post<BookingDto>(`${API_BASE}/bookings`, dto);
  }

  /** DELETE /api/bookings/{id} (kræver Bearer token) */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${API_BASE}/bookings/${id}`);
  }
}
