import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../../../components/modal/modal.component';

@Component({
  selector: 'app-love-map',
  standalone: true,
  imports: [CommonModule, ModalComponent, FormsModule],
  templateUrl: './love-map.component.html',
  styleUrls: ['./love-map.component.scss']
})
export class LoveMapComponent {
  isAddPlaceModalOpen = false;
  newPlace = {
    name: '',
    type: '',
    address: '',
    icon: '📍'
  };

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

  openAddPlaceModal() {
    this.isAddPlaceModalOpen? this.isAddPlaceModalOpen = false : this.isAddPlaceModalOpen = true;
  }

  closeAddPlaceModal() {
    this.isAddPlaceModalOpen = false;
    this.newPlace = {
      name: '',
      type: '',
      address: '',
      icon: '📍'
    };
  }

  addPlace() {
    if (this.newPlace.name && this.newPlace.type && this.newPlace.address) {
      this.places.push({ ...this.newPlace });
      this.closeAddPlaceModal();
    }
  }
}
