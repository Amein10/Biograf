import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FilmService, Film } from '../../../services/film';

@Component({
  selector: 'app-admin-film-edit',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './admin-film-edit.html',
  styleUrl: './admin-film-edit.css',
})
export class AdminFilmEdit {
  film: Film | null = null;
  error = '';
  saving = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private filmService: FilmService
  ) {
    const filmId = Number(this.route.snapshot.paramMap.get('id'));

    this.filmService.getFilmById(filmId).subscribe({
      next: f => (this.film = { ...f }), // kopi så du ikke ændrer før gem
      error: () => (this.film = null),
    });
  }

  saveChanges(form: NgForm) {
    this.error = '';
    if (!this.film) return;

    if (form.invalid) {
      this.error = 'Udfyld alle felter.';
      return;
    }

    this.saving = true;

    const updated: Film = {
      ...this.film,
      titel: this.film.titel.trim(),
      beskrivelse: this.film.beskrivelse.trim(),
      genre: this.film.genre.trim(),
    };

    this.filmService.updateFilm(updated).subscribe({
      next: () => {
        this.saving = false;
        this.router.navigateByUrl('/admin/film');
      },
      error: () => {
        this.saving = false;
        this.error = 'Kunne ikke gemme ændringer.';
      },
    });
  }
}
