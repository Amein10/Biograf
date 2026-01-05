import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFilmList } from './admin-film-list';

describe('AdminFilmList', () => {
  let component: AdminFilmList;
  let fixture: ComponentFixture<AdminFilmList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminFilmList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminFilmList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
