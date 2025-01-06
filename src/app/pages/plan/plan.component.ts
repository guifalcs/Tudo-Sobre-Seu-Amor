import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SpecialDatesComponent } from './features/special-dates/special-dates.component';
import { RelationshipTimelineComponent } from './features/relationship-timeline/relationship-timeline.component';
import { WishlistComponent } from './features/wishlist/wishlist.component';
import { MemoryAlbumComponent } from './features/memory-album/memory-album.component';
import { AchievementsComponent } from './features/achievements/achievements.component';
import { LoveMapComponent } from './features/love-map/love-map.component';
import { AuthService } from '../../services/auth.service';
import { calculateDuration } from '../../components/dateCalc';

@Component({
  selector: 'app-plan',
  standalone: true,
  imports: [
    CommonModule,
    SpecialDatesComponent,
    RelationshipTimelineComponent,
    WishlistComponent,
    MemoryAlbumComponent,
    AchievementsComponent,
    LoveMapComponent
  ],
  templateUrl: './plan.component.html',
  styleUrl: './plan.component.scss'
})
export class PlanComponent {

  userName: string = ''
  relationshipDuration: string = ''
  partnerName: string = ''


  constructor(private authService: AuthService){}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.userName = user.user.name;
        if (user.user.relationship) {
          this.partnerName = user.user.relationship.partnerName;
          this.relationshipDuration = calculateDuration(user.user.relationship.startDate);
        }
      }
    });
  }
}
