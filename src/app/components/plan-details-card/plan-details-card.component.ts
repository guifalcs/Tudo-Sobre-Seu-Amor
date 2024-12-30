import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Feature {
  title: string;
  description: string;
}

@Component({
  selector: 'app-plan-details-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plan-details-card.component.html',
  styleUrls: ['./plan-details-card.component.scss']
})
export class PlanDetailsCardComponent {
  @Input() features: Feature[] = [];
}
