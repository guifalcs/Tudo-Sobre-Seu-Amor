import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../../../components/modal/modal.component';
ModalComponent

@Component({
  selector: 'app-memory-album',
  standalone: true,
  imports: [CommonModule, ModalComponent, FormsModule],
  templateUrl: './memory-album.component.html',
  styleUrls: ['./memory-album.component.scss']
})
export class MemoryAlbumComponent {
  isAddMemoryModalOpen = false;
  newMemory = {
    title: '',
    date: '',
    imageUrl: ''
  };

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

  openAddMemoryModal() {
    this.isAddMemoryModalOpen? this.isAddMemoryModalOpen = false : this.isAddMemoryModalOpen = true;
  }

  closeAddMemoryModal() {
    this.isAddMemoryModalOpen = false;
    this.newMemory = {
      title: '',
      date: '',
      imageUrl: ''
    };
  }

  addMemory() {
    if (this.newMemory.title && this.newMemory.date) {
      this.memories.push({ ...this.newMemory });
      this.closeAddMemoryModal();
    }
  }
}
