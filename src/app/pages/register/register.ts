import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private auth = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  username = '';
  password = '';
  confirmPassword = '';

  error = '';
  loading = false;

  onSubmit() {
    this.error = '';

    const u = this.username.trim();
    if (u.length < 3) {
      this.error = 'Brugernavn skal være mindst 3 tegn';
      return;
    }
    if (this.password.length < 6) {
      this.error = 'Password skal være mindst 6 tegn';
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.error = 'Passwords matcher ikke';
      return;
    }

    this.loading = true;

    this.auth
      .register({ username: u, password: this.password })
      .subscribe({
        next: () => {
          this.loading = false;
          const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
          this.router.navigateByUrl(returnUrl || '/film');
        },
        error: (err) => {
          this.loading = false;

          // hvis dit API returnerer besked i body:
          const apiMsg =
            err?.error?.message ||
            err?.error?.error ||
            err?.error?.title ||
            null;

          this.error = apiMsg ?? 'Kunne ikke oprette bruger (tjek om brugernavn allerede findes).';
        },
      });
  }
}
