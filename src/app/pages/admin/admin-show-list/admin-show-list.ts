import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

import { FilmService, Film } from '../../../services/film';
import { ShowService, ShowDto } from '../../../services/show.service';

@Component({
  selector: 'app-admin-show-list',
  standalone: true,
  imports: [RouterLink, FormsModule, AsyncPipe], // ✅ AsyncPipe SKAL være her
  templateUrl: './admin-show-list.html',
  styleUrl: './admin-show-list.css',
})
export class AdminShowList {
  private filmService = inject(FilmService);
  private showService = inject(ShowService);

  films$: Observable<Film[]> = this.filmService.getFilms();

  selectedMovieId: number | 'all' = 'all';

  get shows$(): Observable<ShowDto[]> {
    if (this.selectedMovieId === 'all') return this.showService.getAll();
    return this.showService.getByMovie(this.selectedMovieId);
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

  deleteShow(id: number) {
    if (!confirm('Slet denne tid?')) return;

    this.showService.delete(id).subscribe({
      next: () => {
        // hvis du vil "refresh" listen med det samme, kan vi lave en Subject senere
      },
      error: () => alert('Kunne ikke slette show.'),
    });
  }
}
