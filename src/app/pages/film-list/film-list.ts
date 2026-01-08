import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FilmService, Film } from '../../services/film';

@Component({
  selector: 'app-film-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './film-list.html',
  styleUrl: './film-list.css',
})
export class FilmList {
  private filmService = inject(FilmService);

  filmListe: Film[] = [];
  loading = true;
  error = '';

  ngOnInit() {
    this.filmService.getFilms().subscribe({
      next: (data) => {
        this.filmListe = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Kunne ikke hente film fra API';
        this.loading = false;
      },
    });
  }

  trackById = (_: number, f: Film) => f.id;
}
