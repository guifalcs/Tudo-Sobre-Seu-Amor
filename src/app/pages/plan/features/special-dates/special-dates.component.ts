import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../../../components/modal/modal.component';
import { SpecialDatesService } from '../../../../services/specialDates.service';
import { AuthService } from '../../../../services/auth.service';
import { SpecialDate} from '../../../../models/specialDates.model';
import { formatDateFromDB, formatDateToDDMMYYYY

 } from '../../../../components/formatDate';
@Component({
  selector: 'app-special-dates',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent],
  templateUrl: './special-dates.component.html',
  styleUrls: ['./special-dates.component.scss']
})
export class SpecialDatesComponent implements OnInit {
  isAddDateModalOpen = false;
  specialDates: any = [];
  newDate = {
    title: '',
    date: '',
  };

  nextDate: any = {
    id : '',
    userId: '',
    title: '',
    date: '',
    createdAt: '',
    updatedAt: '',
    daysLeft: '',
  };

   user: any = ''

  constructor(
    private specialDatesService: SpecialDatesService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      if (user?.user.id) {
        this.specialDates = user.user.specialDates.map(date => formatDateFromDB(date));
        this.user = user.user
      }
    });
  }

  openAddDateModal() {
    this.isAddDateModalOpen = true;
  }

  closeAddDateModal() {
    this.isAddDateModalOpen = false;
    this.newDate = {
      title: '',
      date: ''
    };
  }

  addDate(title: any, date: any) {
    this.newDate = {
      title: title.value,
      date: formatDateToDDMMYYYY(date.value)
    }

    console.log(title)
    console.log(date.value)

    if (this.newDate.title && this.newDate.date) {
        if (this.user?.id) {
          this.specialDatesService.addSpecialDate({
            userId: this.user.id,
            title: this.newDate.title,
            date: this.newDate.date
          }).subscribe({
            next: () => {
              alert("Data adicionada")
            },
            error: () => {alert("Erro ao adicionar data")},
            complete: () => {this.closeAddDateModal()}
          });
        }
    } else {
      alert("Todos os campos devem ser preenchidos")
    }
  }

  updateDate(id: string, date: Partial<SpecialDate>) {
    this.specialDatesService.updateSpecialDate(id, date).subscribe();
  }

  deleteDate(dateTitle: string) {
    if(window.confirm("Deseja realmente excluir a data?")){
      const date = this.specialDates.find((date: {title: string, id: string}) => date.title === dateTitle)
      this.specialDatesService.deleteSpecialDate(date.id).subscribe({
        next: () => {
          alert("Data deletada")
          window.location.reload()
        },
        error: () => {alert("Erro ao deletar registro")},
        complete: () => {}
      });
    }
  }

  private updateNextDate() {
    if (this.specialDates.length > 0) {
      const today = new Date();
      const upcomingDates = this.specialDates
        .map((date: any) => ({
          ...date,
          daysLeft: this.calculateDaysLeft(date.date)
        }))
        .filter((date: any) => date.daysLeft >= 0)
        .sort((a: any, b: any) => a.daysLeft - b.daysLeft);

      if (upcomingDates.length > 0) {
        this.nextDate = upcomingDates[0];
      }
    }
  }

  private calculateDaysLeft(dateStr: string): number {
    const date = new Date(dateStr);
    const today = new Date();
    const timeDiff = date.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  }
}
