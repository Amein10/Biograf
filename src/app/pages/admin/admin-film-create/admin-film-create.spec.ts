import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFilmCreate } from './admin-film-create';

describe('AdminFilmCreate', () => {
  let component: AdminFilmCreate;
  let fixture: ComponentFixture<AdminFilmCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminFilmCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminFilmCreate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
