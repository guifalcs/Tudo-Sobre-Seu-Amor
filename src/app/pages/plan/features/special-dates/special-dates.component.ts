import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../../../components/modal/modal.component';
import { SpecialDatesService } from '../../../../services/specialDates.service';
import { AuthService } from '../../../../services/auth.service';
import { SpecialDate} from '../../../../models/specialDates.model';
import { take } from 'rxjs';
import { formatDateFromDB, formatDateToDDMMYYYY} from '../../../../components/formatDate';
@Component({
  selector: 'app-special-dates',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent],
  templateUrl: './special-dates.component.html',
  styleUrls: ['./special-dates.component.scss']
})
export class SpecialDatesComponent implements OnInit, OnDestroy {
  isAddDateModalOpen = false;
  specialDates = signal<any[]>([])
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
  subscription: any = false;

  constructor(
    private specialDatesService: SpecialDatesService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.subscription = this.authService.currentUser$.subscribe({
      next: (user) => {
      if (user?.user.id) {
        this.specialDates.set(user.user.specialDates.map(date => formatDateFromDB(date)))
        this.user = user.user
        this.updateNextDate()
      }},
      error: (e) => {},
      complete: () => {
      }
    });
  }

  openAddDateModal() {
    this.isAddDateModalOpen? this.isAddDateModalOpen = false : this.isAddDateModalOpen = true;
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

    if (this.newDate.title && this.newDate.date) {
        if (this.user?.id) {
          this.specialDatesService.addSpecialDate({
            userId: this.user.id,
            title: this.newDate.title,
            date: this.newDate.date
          }).subscribe({
            next: (newDate) => {
              this.specialDates.update((dates) => [...dates, {...newDate, date: formatDateFromDB(newDate)}.date])
              this.closeAddDateModal()
            },
            error: () => {alert("Erro ao adicionar data")},
            complete: () => {
             this.updateNextDate()
            }
          })
        }
    } else {
      alert("Todos os campos devem ser preenchidos")
    }
  }

  updateDate(id: string, date: Partial<SpecialDate>) {
    this.specialDatesService.updateSpecialDate(id, date).subscribe();
  }

  deleteDate(id: string) {
    if(window.confirm("Deseja realmente excluir a data?")){
      const date = this.specialDates().find((date: {title: string, id: string}) => date.id === id)
      this.specialDatesService.deleteSpecialDate(date.id).subscribe({
        next: () => {
          this.specialDates.update(dates => dates.filter((date_) => date_.id !== date.id));
        },
        error: () => {alert("Erro ao deletar registro")},
        complete: () => {
          this.updateNextDate()
        }

      })
    }
  }

  private updateNextDate() {
    if (this.specialDates().length > 0) {
      const today = new Date();
      const upcomingDates = this.specialDates()
        .map((date: any) => (
          {
          ...date,
          daysLeft: this.calculateDaysLeft(date.date)
        }))
        .sort((a: any, b: any) => a.daysLeft - b.daysLeft);

      if (upcomingDates.length > 0) {
        this.nextDate = upcomingDates[0];
      }
    }
  }

  private calculateDaysLeft(dateStr: string): number {
    const [day, month] = dateStr.split('/').map(Number);

    const currentYear = new Date().getFullYear();
    const targetDate = new Date(currentYear, month - 1, day);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (targetDate < today) {
      targetDate.setFullYear(currentYear + 1);
    }

    const timeDiff = targetDate.getTime() - today.getTime();

    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return daysLeft;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
