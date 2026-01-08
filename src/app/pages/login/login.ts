import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private auth = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  email = '';
  password = '';
  error = '';
  loading = false;

  onSubmit() {
    this.error = '';
    this.loading = true;

    const ok = this.auth.login(this.email.trim(), this.password);

    if (!ok) {
      this.loading = false;
      this.error = 'Forkert email eller password';
      return;
    }

    // Hvis guards har sendt os hertil med returnUrl, så brug den
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');

    if (returnUrl) {
      this.loading = false;
      this.router.navigateByUrl(returnUrl);
      return;
    }

    // Ellers redirect baseret på rolle
    if (this.auth.getRole() === 'Admin') {
      this.loading = false;
      this.router.navigateByUrl('/admin/film');
    } else {
      this.loading = false;
      this.router.navigateByUrl('/film');
    }
  }
}
