import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../../../components/modal/modal.component';

@Component({
  selector: 'app-special-dates',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  templateUrl: './special-dates.component.html',
  styleUrls: ['./special-dates.component.scss']
})
export class SpecialDatesComponent {
  isAddDateModalOpen = false;

  specialDates = [
    { title: 'Primeiro Encontro', date: '2022-01-15' },
    { title: 'Primeiro Beijo', date: '2022-01-20' },
    { title: 'Início do Namoro', date: '2022-02-14' },
    { title: 'Primeira Viagem Juntos', date: '2022-07-10' }
  ];

  nextDate = {
    title: 'Aniversário de Namoro',
    date: '2024-02-14',
    daysLeft: 45
  };

  openAddDateModal() {
    this.isAddDateModalOpen = true;
  }

  closeAddDateModal() {
    this.isAddDateModalOpen = false;
  }
}
