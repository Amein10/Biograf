import { TestBed } from '@angular/core/testing';
import { Navbar } from './navbar';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

describe('Navbar', () => {
  it('should create', () => {
    TestBed.configureTestingModule({
      imports: [Navbar],
      providers: [
        {
          provide: AuthService,
          useValue: {
            getUser: () => ({ userId: 1, username: 'test' }),
            getRole: () => null,
            logout: () => {},
          },
        },
        {
          provide: Router,
          useValue: { navigateByUrl: () => Promise.resolve(true) },
        },
      ],
    });

    const fixture = TestBed.createComponent(Navbar);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
