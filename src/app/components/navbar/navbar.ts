import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private auth = inject(AuthService);
  private router = inject(Router);

  user = computed(() => this.auth.getUser());
  isAdmin = computed(() => this.auth.getRole() === 'Admin');

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/');
  }
}
