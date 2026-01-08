import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { FilmService, Film } from '../../services/film';

@Component({
  selector: 'app-film-list',
  standalone: true,
  imports: [RouterLink, AsyncPipe],
  templateUrl: './film-list.html',
  styleUrl: './film-list.css',
})
export class FilmList {
  private filmService = inject(FilmService);

  films$: Observable<Film[]> = this.filmService.getFilms();
}
