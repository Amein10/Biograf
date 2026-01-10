import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  private auth = inject(AuthService);

  user = computed(() => this.auth.user());

  roleLabel = computed(() => {
    const role = this.user()?.role ?? 'Customer';
    return role === 'Admin' ? 'Admin' : 'Kunde';
  });
}
