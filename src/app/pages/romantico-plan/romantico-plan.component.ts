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
    'Linha do tempo',
    'Lista de Desejos',
    'Cadastro de 5 datas epeciais',
    'Lembretes de todas as datas especiais',
  ];

  detailedFeatures = [
    {
      title: 'Linha do tempo',
      description: 'Crie a cronologia do seu relacionamento, cadastrando cada momento especial que vocês viveram juntos em uma linha do tempo personalizada.'
    },
    {
      title: 'Lista de Desejos',
      description: 'Faça uma lista de tudo o que vocês desejam, podendo anexar links específicos para cada item. Além disso, cheque se o sonho foi realizado ou não'
    },
    {
      title: 'Cadastro de 5 datas especiais',
      description: 'Cadastre na plataforma até 5 datas especiais do seu relacionamento, como o dia que se conheceram, a data do primeiro beijo, etc. Visualize no dashboard qual delas é próxima a fazer aniversário, vendo sempre quanto tempo falta para ela chegar'
    },
    {
      title: 'Lembretes de todas as datas especiais',
      description: 'Receba no seu email sempre que uma data especial cadastrada fizer aniversário, além de aviso 1 semana antes do aniversário de relacionamento.'
    }
  ];
}
