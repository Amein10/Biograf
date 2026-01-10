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

  username = '';
  password = '';
  error = '';
  loading = false;

  onSubmit() {
    this.error = '';
    this.loading = true;

    this.auth.login({
      username: this.username.trim(),
      password: this.password,
    }).subscribe({
      next: () => {
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/film';
        this.loading = false;
        this.router.navigateByUrl(returnUrl);
      },
      error: () => {
        this.loading = false;
        this.error = 'Forkert brugernavn eller password';
      },
    });
  }
}
