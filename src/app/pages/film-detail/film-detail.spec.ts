import { TestBed } from '@angular/core/testing';
import { FilmDetail } from './film-detail';

describe('FilmDetail', () => {
  it('should create', () => {
    TestBed.configureTestingModule({
      imports: [FilmDetail],
    });

    const fixture = TestBed.createComponent(FilmDetail);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
