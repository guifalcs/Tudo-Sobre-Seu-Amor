import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-no-sub',
  standalone: true,
  imports: [],
  templateUrl: './no-sub.component.html',
  styleUrl: './no-sub.component.scss'
})
export class NoSubComponent {
  constructor(private router: Router) {}

  navigateToPlans(): void {
    this.router.navigate(['/plans']);
  }

  navigateToHome(): void {
    this.router.navigate(['/']);
  }
}
