import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FilmService } from '../../../services/film';
import { ShowService, Show } from '../../../services/show.service';

@Component({
  selector: 'app-admin-show-list',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './admin-show-list.html',
  styleUrl: './admin-show-list.css',
})
export class AdminShowList {
  private filmService = inject(FilmService);
  private showService = inject(ShowService);

  films = computed(() => this.filmService.getFilms());
  selectedFilmId: number | 'all' = 'all';

  get shows(): Show[] {
    if (this.selectedFilmId === 'all') return this.showService.getAll();
    return this.showService.getShowsByFilm(this.selectedFilmId);
  }

  filmTitle(filmId: number): string {
    return this.filmService.getFilmById(filmId)?.titel ?? `Film #${filmId}`;
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
    this.showService.delete(id);
  }
}
