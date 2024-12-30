import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanSummaryCardComponent } from '../../components/plan-summary-card/plan-summary-card.component';
import { PlanDetailsCardComponent } from '../../components/plan-details-card/plan-details-card.component';

@Component({
  selector: 'app-couple-plan',
  standalone: true,
  imports: [CommonModule, PlanSummaryCardComponent, PlanDetailsCardComponent],
  templateUrl: './apaixonado-plan.component.html',
  styleUrls: ['./apaixonado-plan.component.scss']
})
export class ApaixonadoPlanComponent {
  summaryFeatures = [
    'Tudo do plano Premium',
    'Acesso para 2 pessoas',
    'Chat privado',
    'Planejador de encontros'
  ];

  detailedFeatures = [
    {
      title: 'Acesso para 2 Pessoas',
      description: 'Compartilhe a experiência com seu parceiro(a). Cada um tem seu próprio login e acesso personalizado.'
    },
    {
      title: 'Chat Privado',
      description: 'Comunique-se de forma segura e romântica com chat exclusivo para o casal.'
    },
    {
      title: 'Planejador de Encontros',
      description: 'Organize encontros especiais com sugestões personalizadas baseadas em seus gostos.'
    },
    {
      title: 'Recursos Exclusivos',
      description: 'Acesso a recursos exclusivos para casais como álbuns compartilhados e metas conjuntas.'
    }
  ];
}
