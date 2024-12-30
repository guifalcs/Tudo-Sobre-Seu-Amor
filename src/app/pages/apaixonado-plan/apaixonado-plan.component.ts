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
    'Álbum de memórias',
    'Mapa do amor',
    'Todos os lembretes da plataforma',
    'Cadastro de até 15 datas especiais',
    'Recebimento de conquistas'
  ];

  detailedFeatures = [
    {
      title: 'Álbum de memórias',
      description: 'Salve algumas das suas fotos favoritas, relembrando dos momentos mais preciosos que vocês viveram juntos.'
    },
    {
      title: 'Mapa do amor',
      description: 'Lembre dos locais mais marcantes para vocês, eternizando em suas memórias onde seus momentos incríveis aconteceram.'
    },
    {
      title: 'Todos os lembretes da plataforma',
      description: 'Receba lembretes em seu email 1 mês, 1 semana e 1 dia antes do seu aniverário de relacionamento, para você poder preparar uma surpresa para sua companhia favorita.'
    },
    {
      title: 'Recebimento de conquistas',
      description: 'Receba conquistas com o passar do tempo do seu relacionamento.'
    }
  ];
}
