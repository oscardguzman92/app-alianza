import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Client } from '../../models/client.model';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-client-form-modal',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    CommonModule],
    providers: [MatDatepickerModule, MatNativeDateModule],
  templateUrl: './client-form-modal.component.html',
  styleUrl: './client-form-modal.component.scss'
})
export class ClientFormModalComponent {
  clientForm: FormGroup;
  isEditMode = false;

  constructor(
    public dialogRef: MatDialogRef<ClientFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {isEdit: boolean; client: Client | null},
    private fb: FormBuilder
  ) {
    this.clientForm = this.fb.group({
      name: [data?.client?.name, [Validators.required, Validators.pattern(/^\S+\s\S+$/)]],
      phone: [data?.client?.phone, [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: [data?.client?.email, [Validators.required, Validators.email]],
      startDate: [data?.client?.startDate, Validators.required],
      endDate: [data?.client?.endDate, Validators.required]
    });
    this.isEditMode = data?.isEdit || false;

    if (data) {
      this.clientForm.patchValue(data);
    }
  }

  saveClient() {
    if (this.clientForm.valid) {
      const formData = this.clientForm.value;

      const name = formData.name.trim().split(' ');
      const lastName = name.length > 1 ? name[name.length - 1] : '';
      const sharedKey = `${name[0][0]}${lastName}`.toLowerCase();
      this.dialogRef.close({...this.clientForm.value, dateAdded: this.data.client?.dateAdded, sharedKey: sharedKey, id: this.data.client?.id});
    }
  }
  
  onSubmit(): void {
    if (this.clientForm.valid) {
      this.dialogRef.close(this.clientForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
