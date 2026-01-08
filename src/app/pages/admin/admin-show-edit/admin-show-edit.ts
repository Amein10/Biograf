import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

import { FilmService, Film } from '../../../services/film';
import { ShowService, CreateShowDto, ShowDto } from '../../../services/show.service';

@Component({
  selector: 'app-admin-show-edit',
  standalone: true,
  imports: [FormsModule, RouterLink, AsyncPipe], // ✅ AsyncPipe her
  templateUrl: './admin-show-edit.html',
  styleUrl: './admin-show-edit.css',
})
export class AdminShowEdit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private filmService = inject(FilmService);
  private showService = inject(ShowService);

  films$: Observable<Film[]> = this.filmService.getFilms();

  showId = Number(this.route.snapshot.paramMap.get('id'));

  model: CreateShowDto | null = null;
  current: ShowDto | null = null;

  constructor() {
    this.showService.getById(this.showId).subscribe({
      next: show => {
        this.current = show;
        this.model = {
          movieId: show.movieId,
          auditoriumId: show.auditoriumId,
          price: show.price,
          startTime: this.toDateTimeLocal(show.startTime),
        };
      },
      error: () => (this.model = null),
    });
  }

  save() {
    if (!this.model) return;

    const payload: CreateShowDto = {
      movieId: Number(this.model.movieId),
      auditoriumId: Number(this.model.auditoriumId),
      price: Number(this.model.price),
      startTime: new Date(this.model.startTime).toISOString(),
    };

    this.showService.update(this.showId, payload).subscribe({
      next: () => this.router.navigateByUrl('/admin/shows'),
      error: () => alert('Kunne ikke gemme show.'),
    });
  }

  private toDateTimeLocal(iso: string): string {
    const d = new Date(iso);
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }
}
