import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-relationship-timeline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './relationship-timeline.component.html',
  styleUrls: ['./relationship-timeline.component.scss']
})
export class RelationshipTimelineComponent {
  events = [
    {
      date: '15 Jan 2022',
      title: 'Primeiro Encontro',
      description: 'Café no Shopping'
    },
    {
      date: '14 Fev 2022',
      title: 'Início do Namoro',
      description: 'Pedido especial no restaurante favorito'
    },
    {
      date: '10 Jul 2022',
      title: 'Primeira Viagem',
      description: 'Final de semana na praia'
    },
    {
      date: '25 Dez 2022',
      title: 'Primeiro Natal Juntos',
      description: 'Ceia em família'
    }
  ];
}
