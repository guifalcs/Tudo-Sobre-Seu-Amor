import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../../../components/modal/modal.component';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent {
  isAddWishModalOpen = false;
  newWish = {
    title: '',
    link: '',
    priority: 'medium'
  };

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

  openAddWishModal() {
    this.isAddWishModalOpen? this.isAddWishModalOpen = false : this.isAddWishModalOpen = true;
  }

  closeAddWishModal() {
    this.isAddWishModalOpen = false;
    this.newWish = {
      title: '',
      link: '',
      priority: 'medium'
    };
  }

  addWish() {
    if (this.newWish.title && this.newWish.link) {
      this.wishes.push({ ...this.newWish });
      this.closeAddWishModal();
    }
  }
}
