import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-achievements',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.scss']
})
export class AchievementsComponent {
  achievements = [
    {
      title: '2 Anos Juntos!',
      description: 'Vocês completaram 2 anos de relacionamento',
      icon: '🎉'
    },
    {
      title: 'Primeira Viagem',
      description: 'Vocês fizeram sua primeira viagem juntos',
      icon: '✈️'
    },
    {
      title: 'Conhecendo a Família',
      description: 'Vocês conheceram as famílias um do outro',
      icon: '👨‍👩‍👧‍👦'
    }
  ];
}
