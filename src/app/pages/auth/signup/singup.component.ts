import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnDestroy {
  signupForm: FormGroup;
  private signUpSubscription: Subscription | null = null


  constructor(private auth: AuthService, private router: Router) {
    this.signupForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      confirmPassword: new FormControl(''),
    });
  }

  cadastrar() {
    const loginData = this.signupForm.value;

    if (loginData.password !== loginData.confirmPassword) {
      this.signupForm.reset();
      return alert('As senhas precisam ser iguais');
    }

    this.signUpSubscription = this.auth
      .signup(loginData.name, loginData.email, loginData.password)
      .subscribe({
        next: (response) => {
          this.router.navigate(['/profile']);
        },
        error: (e) => {
          alert(e.error.message);
        },
        complete: () => {},
      });

    this.signupForm.reset();
  }

  ngOnDestroy(){
    if (this.signUpSubscription) {
      this.signUpSubscription.unsubscribe();
    }
  }
}
