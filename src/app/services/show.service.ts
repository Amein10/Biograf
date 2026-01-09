import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ShowDto {
  id: number;
  startTime: string;       // ISO string
  price: number;

  movieId: number;
  movieTitle: string;

  auditoriumId: number;
  auditoriumName: string;
}

export interface CreateShowDto {
  startTime: string;       // ISO string
  price: number;
  movieId: number;
  auditoriumId: number;
}

@Injectable({ providedIn: 'root' })
export class ShowService {
  private readonly baseUrl = '/api/Shows';

  constructor(private http: HttpClient) {}

  /** GET /api/Shows?fromDate=... */
  getAll(fromDate?: Date): Observable<ShowDto[]> {
    let params = new HttpParams();
    if (fromDate) params = params.set('fromDate', fromDate.toISOString());
    return this.http.get<ShowDto[]>(this.baseUrl, { params });
  }

  /** GET /api/Shows/{id} */
  getById(id: number): Observable<ShowDto> {
    return this.http.get<ShowDto>(`${this.baseUrl}/${id}`);
  }

  /** GET /api/Shows/movie/{movieId} */
  getByMovie(movieId: number): Observable<ShowDto[]> {
    return this.http.get<ShowDto[]>(`${this.baseUrl}/movie/${movieId}`);
  }

  /** GET /api/Shows/upcoming?fromDate=... */
  getUpcoming(fromDate?: Date): Observable<ShowDto[]> {
    let params = new HttpParams();
    if (fromDate) params = params.set('fromDate', fromDate.toISOString());
    return this.http.get<ShowDto[]>(`${this.baseUrl}/upcoming`, { params });
  }

  /** POST /api/Shows */
  create(dto: CreateShowDto): Observable<ShowDto> {
    return this.http.post<ShowDto>(this.baseUrl, dto);
  }

  /** PUT /api/Shows/{id} */
  update(id: number, dto: CreateShowDto): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, dto);
  }

  /** DELETE /api/Shows/{id} */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getSeats(showId: number) {
  return this.http.get<
    { seatId: number; row: string; number: number; isBooked: boolean }[]
  >(`/api/Shows/${showId}/seats`);
}

  
}
