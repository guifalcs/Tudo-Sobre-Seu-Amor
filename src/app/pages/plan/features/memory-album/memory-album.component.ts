import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-memory-album',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './memory-album.component.html',
  styleUrls: ['./memory-album.component.scss']
})
export class MemoryAlbumComponent {
  memories = [
    {
      title: 'Primeira Viagem',
      date: '10 Jul 2022',
      imageUrl: 'assets/memories/beach.jpg'
    },
    {
      title: 'Jantar Romântico',
      date: '14 Fev 2023',
      imageUrl: 'assets/memories/dinner.jpg'
    },
    {
      title: 'Festival de Música',
      date: '20 Set 2023',
      imageUrl: 'assets/memories/festival.jpg'
    }
  ];
}
