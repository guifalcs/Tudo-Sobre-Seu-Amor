import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  user: User | null = null;
  isLoading = true;
  isSaving = false;
  isEditMode = false;
  profileForm: FormGroup;
  private currentUserSubscription: Subscription | null = null

  constructor(
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    this.isLoading = true;
    this.currentUserSubscription = this.authService.getCurrentUser().subscribe({
      next: (user) => {
        this.user = user;
        if (user) {
          this.profileForm.patchValue({
            name: user.user.name,
            email: user.user.email
          });
        }
      },
      error: (e) => {
        alert()
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  toggleEditMode() {
    this.isEditMode = true;
    if (this.user) {
      this.profileForm.patchValue({
        name: this.user.user.name,
        email: this.user.user.email
      });
    }
  }

  cancelEdit() {
    this.isEditMode = false;
    if (this.user) {
      this.profileForm.patchValue({
        name: this.user.user.name,
        email: this.user.user.email
      });
    }
  }

  onSubmit() {
    if (this.profileForm.valid && this.user?.user.id) {
      this.isSaving = true;

      this.authService.updateUser(this.user.user.id as string, this.profileForm.value)
        .pipe(finalize(() => this.isSaving = false))
        .subscribe({
          next: (updatedUser) => {
            alert('Usuário atualizado')
            this.user = updatedUser;
            this.isEditMode = false
            this.isSaving = false
            window.location.reload()
          },
          error: (error) => {
            console.log(error)
          }
        });
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.profileForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  ngOnDestroy(){
    if (this.currentUserSubscription) {
      this.currentUserSubscription.unsubscribe();
    }
  }
}
