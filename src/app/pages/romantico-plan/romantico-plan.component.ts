import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanSummaryCardComponent } from '../../components/plan-summary-card/plan-summary-card.component';
import { PlanDetailsCardComponent } from '../../components/plan-details-card/plan-details-card.component';

@Component({
  selector: 'app-premium-plan',
  standalone: true,
  imports: [CommonModule, PlanSummaryCardComponent, PlanDetailsCardComponent],
  templateUrl: './romantico-plan.component.html',
  styleUrls: ['./romantico-plan.component.scss']
})
export class RomanticoPlanComponent {
  summaryFeatures = [
    'Tudo do plano Básico',
    'Lista de desejos',
    'Lembretes personalizados',
    'Diário digital'
  ];

  detailedFeatures = [
    {
      title: 'Lista de Desejos',
      description: 'Crie e compartilhe listas de desejos para presentes, encontros e surpresas especiais.'
    },
    {
      title: 'Lembretes Personalizados',
      description: 'Configure lembretes avançados com mensagens personalizadas, frequência e tipos de notificação.'
    },
    {
      title: 'Diário Digital',
      description: 'Registre momentos especiais com texto, fotos e vídeos em um diário digital privado.'
    },
    {
      title: 'Recursos Avançados',
      description: 'Acesso a recursos premium como temas personalizados e backup na nuvem.'
    }
  ];
}
