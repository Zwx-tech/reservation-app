import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MenuComponent } from '../../components/menu/menu.component';
@Component({
  selector: 'app-landing-route',
  standalone: true,
  imports: [ButtonModule, MenuComponent],
  templateUrl: './landing-route.component.html',
  styleUrl: './landing-route.component.scss',
})
export class LandingRouteComponent {
  authService = inject(AuthService);
  router = inject(Router);
}
