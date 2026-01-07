import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FilmService, Film } from '../../../services/film';

@Component({
  selector: 'app-admin-film-create',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './admin-film-create.html',
  styleUrl: './admin-film-create.css',
})
export class AdminFilmCreate {
  saving = false;
  error = '';

  newFilm: Film = {
    id: 0,
    titel: '',
    beskrivelse: '',
    aar: new Date().getFullYear(),
    genre: '',
  };

  constructor(private filmService: FilmService, private router: Router) {}

  saveFilm(form: NgForm) {
    this.error = '';

    if (form.invalid) {
      this.error = 'Udfyld alle felter.';
      return;
    }

    this.saving = true;

    const film: Film = {
      ...this.newFilm,
      id: Date.now(),
      titel: this.newFilm.titel.trim(),
      beskrivelse: this.newFilm.beskrivelse.trim(),
      genre: this.newFilm.genre.trim(),
    };

    this.filmService.addFilm(film);

    this.saving = false;
    this.router.navigateByUrl('/admin/film');
  }
}
