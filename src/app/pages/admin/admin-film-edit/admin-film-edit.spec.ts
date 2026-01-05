import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFilmEdit } from './admin-film-edit';

describe('AdminFilmEdit', () => {
  let component: AdminFilmEdit;
  let fixture: ComponentFixture<AdminFilmEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminFilmEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminFilmEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
