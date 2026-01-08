import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateMovieDto, MovieDto } from './api-dtos';

@Injectable({ providedIn: 'root' })
export class MovieService {
  private http = inject(HttpClient);
  private baseUrl = '/api/movies';

  getAll(): Observable<MovieDto[]> {
    return this.http.get<MovieDto[]>(this.baseUrl);
  }

  getById(id: number): Observable<MovieDto> {
    return this.http.get<MovieDto>(`${this.baseUrl}/${id}`);
  }

  search(title: string): Observable<MovieDto[]> {
    return this.http.get<MovieDto[]>(`${this.baseUrl}/search`, { params: { title } });
  }

  create(dto: CreateMovieDto): Observable<MovieDto> {
    return this.http.post<MovieDto>(this.baseUrl, dto);
  }

  update(id: number, dto: CreateMovieDto): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
