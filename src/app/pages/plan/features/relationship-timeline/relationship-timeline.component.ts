import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../../../components/modal/modal.component';

@Component({
  selector: 'app-relationship-timeline',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent],
  templateUrl: './relationship-timeline.component.html',
  styleUrls: ['./relationship-timeline.component.scss']
})
export class RelationshipTimelineComponent {
  isAddEventModalOpen = false;
  newEvent = {
    title: '',
    date: '',
    description: ''
  };

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

  openAddEventModal() {
    this.isAddEventModalOpen? this.isAddEventModalOpen = false : this.isAddEventModalOpen = true;
  }

  closeAddEventModal() {
    this.isAddEventModalOpen = false;
    this.newEvent = {
      title: '',
      date: '',
      description: ''
    };
  }

  addEvent() {
    if (this.newEvent.title && this.newEvent.date && this.newEvent.description) {
      this.events.push({ ...this.newEvent });
      this.closeAddEventModal();
    }
  }
}
