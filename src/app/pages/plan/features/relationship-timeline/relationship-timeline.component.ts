import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../../../components/modal/modal.component';
import { TimelineService } from '../../../../services/timeline.service';
import { AuthService } from '../../../../services/auth.service';
import { formatDateToDDMMYYYY } from '../../../../components/formatDate';
import { take } from 'rxjs';

@Component({
  selector: 'app-relationship-timeline',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent],
  templateUrl: './relationship-timeline.component.html',
  styleUrls: ['./relationship-timeline.component.scss']
})
export class RelationshipTimelineComponent implements OnInit {
  isAddEventModalOpen = false;
  newEvent = {
    title: '',
    date: '',
    description: ''
  };
  events: any[] = [];
  user: any = ""

  constructor(
    private timelineService: TimelineService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.currentUser$.pipe(take(1)).subscribe({

      next: (user) => {
      if (user?.user.timeline) {
        const sortedEvents = this.timelineService.setEvents(user.user.timeline);
        this.events = sortedEvents
      }},

      error: (error) => {},
      complete: () => {}
    });
  }

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
    this.newEvent.date = formatDateToDDMMYYYY(this.newEvent.date)

    if (this.newEvent.title && this.newEvent.date && this.newEvent.description) {
      this.authService.currentUser$.subscribe(user => {
        if (user?.user.id) {
          this.timelineService.addEvent({
            userId: user.user.id,
            ...this.newEvent
          }).subscribe({
            next: () => {
            alert("Evento adicionado")
            this.closeAddEventModal();
          },
          error: (error) => {},
          complete: () => {
            window.location.reload()
          }
        });
        }
      }).unsubscribe();
    } else {
      alert("Preencha todos os campos")
    }
  }

  deleteEvent(title: string) {

    const rigthEvent = this.events.find((event) => {
      event.title == title
      return event
    })

    if(window.confirm("Deseja mesmo deletar o evento?")){
      this.timelineService.deleteEvent(rigthEvent.id).subscribe({
      next: () => {
        alert("Evento deletado!")
      },
      error: (error) => {},
      complete: () => {
        window.location.reload()
      }
    })}
  }
}
