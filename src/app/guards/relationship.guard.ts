import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RelationshipGuard {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate() {
    return this.authService.getCurrentUser().subscribe({
      next: (user) => {
        if(user!.user.relationship.id){return true}
        this.router.navigate(['/setup-relationship'])
        return false
      },
      error: (error) => {
        alert("Algum erro ocorreu ao acessar o seu relacionamento")
        return false
      },
      complete: () => {}
    })
  }
}
