import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

import { FilmService, Film } from '../../../services/film';
import { ShowService, CreateShowDto } from '../../../services/show.service';

@Component({
  selector: 'app-admin-show-create',
  standalone: true,
  imports: [FormsModule, RouterLink, AsyncPipe], // ✅ AsyncPipe her
  templateUrl: './admin-show-create.html',
  styleUrl: './admin-show-create.css',
})
export class AdminShowCreate {
  private filmService = inject(FilmService);
  private showService = inject(ShowService);
  private router = inject(Router);

  films$: Observable<Film[]> = this.filmService.getFilms();

  model: CreateShowDto = {
    movieId: 1,
    auditoriumId: 1,
    startTime: new Date().toISOString().slice(0, 16), // datetime-local
    price: 95,
  };

  save() {
    const payload: CreateShowDto = {
      movieId: Number(this.model.movieId),
      auditoriumId: Number(this.model.auditoriumId),
      startTime: new Date(this.model.startTime).toISOString(),
      price: Number(this.model.price),
    };

    this.showService.create(payload).subscribe({
      next: () => this.router.navigateByUrl('/admin/shows'),
      error: () => alert('Kunne ikke oprette show. Tjek at API kører og payload matcher.'),
    });
  }
}
