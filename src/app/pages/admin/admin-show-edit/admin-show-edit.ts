import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FilmService } from '../../../services/film';
import { ShowService, Show } from '../../../services/show.service';

@Component({
  selector: 'app-admin-show-edit',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './admin-show-edit.html',
  styleUrl: './admin-show-edit.css',
})
export class AdminShowEdit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private filmService = inject(FilmService);
  private showService = inject(ShowService);

  films = computed(() => this.filmService.getFilms());

  showId = Number(this.route.snapshot.paramMap.get('id'));
  show = this.showService.getShowById(this.showId);

  model: Show | null = this.show
    ? {
        ...this.show,
        startTime: this.toDateTimeLocal(this.show.startTime),
      }
    : null;

  save() {
    if (!this.model) return;

    const updated: Show = {
      ...this.model,
      filmId: Number(this.model.filmId),
      startTime: new Date(this.model.startTime).toISOString(),
      auditorium: this.model.auditorium.trim(),
      price: Number(this.model.price),
    };

    this.showService.update(updated);
    this.router.navigateByUrl('/admin/shows');
  }

  private toDateTimeLocal(iso: string): string {
    const d = new Date(iso);
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }
}
