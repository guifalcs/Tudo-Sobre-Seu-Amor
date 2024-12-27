import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent {
  wishes = [
    {
      title: 'Viagem para Paris',
      link: 'https://example.com/paris',
      priority: 'high'
    },
    {
      title: 'Jantar no Restaurante Italiano',
      link: 'https://example.com/restaurant',
      priority: 'medium'
    },
    {
      title: 'Curso de Dança',
      link: 'https://example.com/dance',
      priority: 'low'
    }
  ];
}
