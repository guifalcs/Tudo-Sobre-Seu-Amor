import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../../../components/modal/modal.component';
import { TimelineService } from '../../../../services/timeline.service';
import { AuthService } from '../../../../services/auth.service';
import { formatDateToDDMMYYYY } from '../../../../components/formatDate';

@Component({
  selector: 'app-relationship-timeline',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent],
  templateUrl: './relationship-timeline.component.html',
  styleUrls: ['./relationship-timeline.component.scss'],
})
export class RelationshipTimelineComponent implements OnInit, OnDestroy {
  isAddEventModalOpen = false;
  newEvent = {
    title: '',
    date: '',
    description: '',
  };
  events = signal<any[]>([]);
  subscription: any = false;

  constructor(
    private timelineService: TimelineService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.subscription = this.authService.currentUser$.subscribe({
      next: (user) => {
        if (user?.user.timeline) {
          const sortedEvents = this.timelineService.setEvents(
            user.user.timeline
          );
          this.events.set(sortedEvents);
        }
      },

      error: (error) => {},
      complete: () => {},
    });
  }

  openAddEventModal() {
    this.isAddEventModalOpen
      ? (this.isAddEventModalOpen = false)
      : (this.isAddEventModalOpen = true);
  }

  closeAddEventModal() {
    this.isAddEventModalOpen = false;
    this.newEvent = {
      title: '',
      date: '',
      description: '',
    };
  }

  addEvent() {
    if (
      !this.newEvent.title ||
      !this.newEvent.date ||
      !this.newEvent.description
    ) {
      alert('Preencha todos os campos');
    }

    this.newEvent.date = formatDateToDDMMYYYY(this.newEvent.date);

    this.authService.currentUser$
      .subscribe((user) => {
        if (user?.user.id) {
          this.timelineService
            .addEvent({
              userId: user.user.id,
              ...this.newEvent,
            })
            .subscribe({
              next: (event) => {
                this.events.update((events) =>
                  this.timelineService.setEvents([...events, event])
                );
                this.closeAddEventModal();
              },
              error: (error) => {
                alert('Algum erro ocorreu ao adicionar o evento');
              },
              complete: () => {},
            });
        }
      })
      .unsubscribe();
  }

  deleteEvent(title: string) {
    const rigthEvent = this.events().find((event) => {
      return event.title === title;
    });

    if (window.confirm('Deseja mesmo deletar o evento?')) {
      this.timelineService
        .deleteEvent(rigthEvent.id)
        .subscribe({
          next: () => {
            const updatedEvents = this.events().filter((event) => event.id !== rigthEvent.id);
            this.events.set(updatedEvents)
          },
          error: (error) => {
            alert('Algum erro deletar ao adicionar o evento');
          },
          complete: () => {},
        })
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
