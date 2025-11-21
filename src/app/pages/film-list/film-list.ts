import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

interface Film {
  titel: string;
  beskrivelse: string;
  aar: number;
}

@Component({
  selector: 'app-film-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './film-list.html',
  styleUrl: './film-list.css'
})
export class FilmList {     // <-- VIGTIGT! Det er navnet du importerer
  filmListe: Film[] = [
    { titel: 'Inception', beskrivelse: 'Drømme i flere lag.', aar: 2010 },
    { titel: 'The Dark Knight', beskrivelse: 'Batman mod Joker.', aar: 2008 },
    { titel: 'Interstellar', beskrivelse: 'Rejse gennem rummet.', aar: 2014 }
  ];
}
