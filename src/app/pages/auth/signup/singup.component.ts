import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  signupForm: FormGroup;

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

    this.auth
      .signup(loginData.name, loginData.email, loginData.password)
      .subscribe({
        next: (response) => {},
        error: (e) => {
          alert(e.error.message);
        },
        complete: () => {},
      });

    this.signupForm.reset();
  }
}
