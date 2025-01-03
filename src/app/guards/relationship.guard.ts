import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RelationshipService } from '../services/relationship.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RelationshipGuard {
  constructor(
    private router: Router,
    private relationshipService: RelationshipService
  ) {}

  canActivate() {
    return this.relationshipService.hasRelationship().pipe(
      map(hasRelationship => {
        if (!hasRelationship) {
          this.router.navigate(['/setup-relationship']);
          return false;
        }
        return true;
      })
    );
  }
}
