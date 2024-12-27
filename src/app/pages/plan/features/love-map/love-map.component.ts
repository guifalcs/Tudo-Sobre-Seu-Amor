import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-love-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './love-map.component.html',
  styleUrls: ['./love-map.component.scss']
})
export class LoveMapComponent {
  places = [
    {
      name: 'Café Amor',
      type: 'Primeiro Encontro',
      address: 'Rua das Flores, 123',
      icon: '☕'
    },
    {
      name: 'Praia do Sol',
      type: 'Primeira Viagem',
      address: 'Litoral Norte',
      icon: '🏖️'
    },
    {
      name: 'Restaurante Italiano',
      type: 'Pedido de Namoro',
      address: 'Av. Principal, 456',
      icon: '🍝'
    }
  ];
}
