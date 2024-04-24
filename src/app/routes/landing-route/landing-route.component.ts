import { Component, inject, ViewEncapsulation } from '@angular/core';
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
  encapsulation: ViewEncapsulation.None,
})
export class LandingRouteComponent {
  authService = inject(AuthService);
  router = inject(Router);
}
