import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../../../components/modal/modal.component';
import { LoveMapService } from '../../../../services/lovemap.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-love-map',
  standalone: true,
  imports: [CommonModule, ModalComponent, FormsModule],
  templateUrl: './love-map.component.html',
  styleUrls: ['./love-map.component.scss']
})
export class LoveMapComponent implements OnInit {
  places = signal<any>([])
  isAddPlaceModalOpen = false;
  currentPlace: any = {
    title: '',
    subtitle: '',
    location: ''
  };

  constructor(
    private loveMapService: LoveMapService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe((user: any) => {
      if (user?.user.lovemap) {
        this.places.set(user.user.lovemap)
      }
    });
  }

  openAddPlaceModal() {
    this.currentPlace = { name: '', type: '', address: '' };
    this.isAddPlaceModalOpen = true;
  }


  closePlaceModal() {
    this.isAddPlaceModalOpen = false;
    this.currentPlace = { name: '', type: '', address: '' };
  }

  addPlace() {
    if (!this.currentPlace.title || !this.currentPlace.subtitle || !this.currentPlace.location) return alert("Todos os campos devem ser preenchidos")

      this.authService.currentUser$.subscribe(user => {
        if (user?.user.id) {
          this.loveMapService.addPlace({
            userId: user.user.id,
            title: this.currentPlace.title!,
            subtitle: this.currentPlace.subtitle!,
            location: this.currentPlace.location!
          }).subscribe({
            next: (place) => {
              this.places.update((lovePlaces) => [...lovePlaces, place])
              this.closePlaceModal()
            },
            error: (error) => alert("Erro ao adicionar local"),
            complete: () => {}
          });
        }
      }).unsubscribe();
  }

  deletePlace(id: string) {
    if(window.confirm("Deseja deletar o local?")){
      this.loveMapService.deletePlace(id).subscribe({
        next: () => {
          const updatedPlaces = this.places().filter((place: any) => place.id !== id);
          this.places.set(updatedPlaces)
        },
        error: () => alert("Erro ao deletar local"),
        complete: () => {}
      });
    }
  }
}
