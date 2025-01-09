import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { environment } from '../../../environment/environment';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  isSending = false;
  showSuccess = false;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      subject: [''],
      message: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  ngOnInit() {
    emailjs.init({
      publicKey: environment.MAILJS_PUBLIC_KEY,
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  async onSubmit() {
    if (this.contactForm.valid) {
      this.isSending = true;

      try {
        const templateParams = {
          to_email: 'tudosobreseuamor@gmail.com',
          from_name: this.contactForm.value.name,
          from_email: this.contactForm.value.email,
          subject: this.contactForm.value.subject,
          message: this.contactForm.value.message,
        };

        await emailjs.send(
          environment.MAILJS_SERVICE_ID,
          environment.MAILJS_TEMPLATE_ID,
          templateParams
        );

        this.showSuccess = true;
        this.contactForm.reset();
      } catch (error) {
        alert('Erro ao enviar mensagem. Por favor, tente novamente.');
      } finally {
        this.isSending = false;
      }
    }
  }
}
