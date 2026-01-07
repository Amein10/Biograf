import { TestBed } from '@angular/core/testing';
import { AdminFilmCreate } from './admin-film-create';

describe('AdminFilmCreate', () => {
  it('should create', () => {
    TestBed.configureTestingModule({
      imports: [AdminFilmCreate],
    });

    const fixture = TestBed.createComponent(AdminFilmCreate);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
