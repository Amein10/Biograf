import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FilmService, Film } from '../../../services/film';

@Component({
  selector: 'app-admin-film-create',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-film-create.html',
  styleUrl: './admin-film-create.css',
})
export class AdminFilmCreate {

  // tom film-model til formularen
  newFilm: Film = {
    id: 0,
    titel: '',
    beskrivelse: '',
    aar: new Date().getFullYear(),
    genre: '',
  };

  constructor(private filmService: FilmService, private router: Router) {}

  saveFilm() {
    // lav unikt id
    this.newFilm.id = Date.now();

    this.filmService.addFilm(this.newFilm);

    // redirect tilbage til admin listen
    this.router.navigate(['/admin/film']);
  }
}
