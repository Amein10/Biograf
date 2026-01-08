import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FilmService } from '../../../services/film';
import { ShowService, Show } from '../../../services/show.service';

@Component({
  selector: 'app-admin-show-create',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './admin-show-create.html',
  styleUrl: './admin-show-create.css',
})
export class AdminShowCreate {
  private filmService = inject(FilmService);
  private showService = inject(ShowService);
  private router = inject(Router);

  films = computed(() => this.filmService.getFilms());

  model: Omit<Show, 'id'> = {
    filmId: 1,
    startTime: new Date().toISOString().slice(0, 16), // yyyy-MM-ddTHH:mm
    auditorium: 'Sal 1',
    price: 95,
  };

  save() {
    const show: Show = {
      id: this.showService.nextId(),
      filmId: Number(this.model.filmId),
      // datetime-local → ISO
      startTime: new Date(this.model.startTime).toISOString(),
      auditorium: this.model.auditorium.trim(),
      price: Number(this.model.price),
    };

    this.showService.add(show);
    this.router.navigateByUrl('/admin/shows');
  }
}
