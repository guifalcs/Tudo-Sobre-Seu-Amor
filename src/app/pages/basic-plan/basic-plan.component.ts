import { SubscriptionService } from './../../services/subscription.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanSummaryCardComponent } from '../../components/plan-summary-card/plan-summary-card.component';
import { PlanDetailsCardComponent } from '../../components/plan-details-card/plan-details-card.component';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environment/environment';

@Component({
  selector: 'app-basic-plan',
  standalone: true,
  imports: [CommonModule, PlanSummaryCardComponent, PlanDetailsCardComponent],
  templateUrl: './basic-plan.component.html',
  styleUrls: ['./basic-plan.component.scss']
})
export class BasicPlanComponent {
  summaryFeatures = [
    'Contador do tempo',
    'Lembrete de aniversário',
    'Cadastro de 3 datas especiais'
  ];

  onSubmit: any = () => {}
  args: any = {}
  userId: any = ''
  priceId: any = environment.basic_price_id

  constructor(
    private subscriptionService: SubscriptionService,
    private authService: AuthService
  ){
    this.authService.currentUser$.subscribe(user => {
          if (user) {
            this.userId = user.user.id
            this.onSubmit = subscriptionService.redirectToCheckout
          }
    })
}

  detailedFeatures = [
    {
      title: 'Contador do tempo',
      description: 'Visualize exatamente quanto tempo de relacionamento você tem, em anos, meses e dias.'
    },
    {
      title: 'Lembrete de aniversário',
      description: 'Receba um email no dia do seu aniversário de relacionamento para você não esquecer essa data especial.'
    },
    {
      title: 'Cadastro de 3 datas especiais',
      description: 'Cadastre na plataforma até 3 datas especiais do seu relacionamento, como o dia que se conheceram, a data do primeiro beijo, etc. Visualize no dashboard qual delas é próxima a fazer aniversário, vendo sempre quanto tempo falta para ela chegar'
    }
  ];


}
