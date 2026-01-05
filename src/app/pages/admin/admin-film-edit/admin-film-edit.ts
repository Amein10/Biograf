import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { FilmService, Film } from '../../../services/film';

@Component({
  selector: 'app-admin-film-edit',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './admin-film-edit.html',
  styleUrl: './admin-film-edit.css'
})
export class AdminFilmEdit {

  film: Film | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private filmService: FilmService
  ) {
    const filmId = Number(this.route.snapshot.paramMap.get('id'));
    this.film = this.filmService.getFilmById(filmId);
  }

  saveChanges() {
    if (!this.film) return;

    this.filmService.updateFilm(this.film);
    this.router.navigate(['/admin/film']);
  }
}
