import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-route',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './landing-route.component.html',
  styleUrl: './landing-route.component.scss',
})
export class LandingRouteComponent {
  authService = inject(AuthService);
  router = inject(Router);
}
