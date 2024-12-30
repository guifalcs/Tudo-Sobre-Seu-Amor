import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-plan-summary-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plan-summary-card.component.html',
  styleUrls: ['./plan-summary-card.component.scss']
})
export class PlanSummaryCardComponent {
  @Input() title = '';
  @Input() price = '';
  @Input() features: string[] = [];
  @Input() isPopular = false;
}
