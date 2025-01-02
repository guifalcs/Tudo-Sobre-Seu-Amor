import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  loginForm: FormGroup;
  private loginSubscription: Subscription | null = null

  constructor(private auth: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  fazerLogin() {
    const loginData = this.loginForm.value;

    this.loginSubscription = this.auth.login(loginData.email, loginData.password).subscribe({
      next: (user: any) => {
        if(user.subscription.title === 'Nenhum'){
          this.router.navigate(['getSub'])
        } else{
          this.router.navigate(['profile'])
        }
      },
      error: (e) => {
        alert(e.error);
      },
      complete: () => {},
    });

    this.loginForm.reset();
  }

  ngOnDestroy(){
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }
}
