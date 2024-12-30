import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanSummaryCardComponent } from '../../components/plan-summary-card/plan-summary-card.component';
import { PlanDetailsCardComponent } from '../../components/plan-details-card/plan-details-card.component';

@Component({
  selector: 'app-basic-plan',
  standalone: true,
  imports: [CommonModule, PlanSummaryCardComponent, PlanDetailsCardComponent],
  templateUrl: './basic-plan.component.html',
  styleUrls: ['./basic-plan.component.scss']
})
export class BasicPlanComponent {
  summaryFeatures = [
    'Calendário de datas',
    'Álbum de fotos',
    'Lembretes básicos'
  ];

  detailedFeatures = [
    {
      title: 'Calendário de Datas',
      description: 'Mantenha todas as datas importantes organizadas em um só lugar. Aniversários, comemorações e momentos especiais sempre à mão.'
    },
    {
      title: 'Álbum de Fotos',
      description: 'Armazene e organize suas fotos favoritas em álbuns temáticos. Reviva momentos especiais quando quiser.'
    },
    {
      title: 'Lembretes Básicos',
      description: 'Receba notificações para não esquecer nenhuma data importante do seu relacionamento.'
    }
  ];
}
