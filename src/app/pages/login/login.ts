import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink], // ✅ VIGTIGT: RouterLink så [routerLink] virker i template
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private auth = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  // ✅ så template kan bruge returnUrl
  returnUrl: string | null = this.route.snapshot.queryParamMap.get('returnUrl');

  username = '';
  password = '';
  error = '';
  loading = false;

  onSubmit() {
    this.error = '';
    this.loading = true;

    this.auth
      .login({
        username: this.username.trim(),
        password: this.password,
      })
      .subscribe({
        next: () => {
          this.loading = false;
          this.router.navigateByUrl(this.returnUrl || '/film');
        },
        error: () => {
          this.loading = false;
          this.error = 'Forkert brugernavn eller password';
        },
      });
  }
}
