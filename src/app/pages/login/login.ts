import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
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

  email = '';
  password = '';
  error = '';

  onSubmit() {
    this.error = '';

    const ok = this.auth.login(this.email.trim(), this.password);

    if (!ok) {
      this.error = 'Forkert email eller password';
      return;
    }

    // Redirect baseret på rolle
    if (this.auth.getRole() === 'Admin') {
      this.router.navigateByUrl('/admin/film');
    } else {
      this.router.navigateByUrl('/film');
    }
  }
}
