import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RelationshipService} from '../../services/relationship.service';
import formatDateToDDMMYYYY from '../../components/formatDate';

@Component({
  selector: 'app-setup-relationship',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './setup-relationship.component.html',
  styleUrls: ['./setup-relationship.component.scss']
})
export class SetupRelationshipComponent implements OnDestroy {
  relationshipForm: FormGroup;
  isSubmitting = false;
  maxDate = new Date().toISOString().split('T')[0];
  private relationship: any = null


  constructor(
    private fb: FormBuilder,
    private relationshipService: RelationshipService,
    private router: Router
  ) {
    this.relationshipForm = this.fb.group({
      partnerName: ['', [Validators.required, Validators.minLength(2)]],
      startDate: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.relationshipForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;

      const formData = this.relationshipForm.value;
      const formattedStartDate = formatDateToDDMMYYYY(formData.startDate);
      const payload = {...formData, startDate: formattedStartDate};

      this.relationship = this.relationshipService.createRelationship(payload)
        .subscribe({
          next: () => {
            this.router.navigate(['/dashboard']);
          },
          error: () => {
            this.isSubmitting = false;
          }
        });
    }
  }

  ngOnDestroy(){
    if(this.relationship){
      this.relationship.unsubscribe()
    }
  }
}
