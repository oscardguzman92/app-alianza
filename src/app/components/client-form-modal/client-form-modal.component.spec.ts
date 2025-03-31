import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientFormModalComponent } from './client-form-modal.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ClientService } from '../../services/client.service';
import { ClientStateService } from '../../services/client-state.service';
import { provideHttpClient } from '@angular/common/http';

describe('ClientFormModalComponent', () => {
  let component: ClientFormModalComponent;
  let fixture: ComponentFixture<ClientFormModalComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<ClientFormModalComponent>>;

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [        
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        CommonModule,        
        ClientFormModalComponent
      ],
      providers: [
        FormBuilder,
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: { isEdit: false, client: null } },
        provideHttpClientTesting(),
        ClientService,
        ClientStateService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with the correct fields', () => {
    expect(component.clientForm.contains('name')).toBeTrue();
    expect(component.clientForm.contains('phone')).toBeTrue();
    expect(component.clientForm.contains('email')).toBeTrue();
    expect(component.clientForm.contains('startDate')).toBeTrue();
    expect(component.clientForm.contains('endDate')).toBeTrue();
  });

  it('should validate the "name" field', () => {
    let nameControl = component.clientForm.get('name');
    nameControl?.setValue('');
    expect(nameControl?.valid).toBeFalse();

    nameControl?.setValue('Jaimie'); 
    expect(nameControl?.valid).toBeFalse();

    nameControl?.setValue('John Lennon');
    expect(nameControl?.valid).toBeTrue();
  });

  it('should validate the "phone" field', () => {
    let phoneControl = component.clientForm.get('phone');
    phoneControl?.setValue('');
    expect(phoneControl?.valid).toBeFalse();

    phoneControl?.setValue('12345'); // Less than 10 digits
    expect(phoneControl?.valid).toBeFalse();

    phoneControl?.setValue('1234567890');
    expect(phoneControl?.valid).toBeTrue();
  });

  it('should validate the "email" field', () => {
    let emailControl = component.clientForm.get('email');
    emailControl?.setValue('');
    expect(emailControl?.valid).toBeFalse();

    emailControl?.setValue('not-an-email');
    expect(emailControl?.valid).toBeFalse();

    emailControl?.setValue('test@example.com');
    expect(emailControl?.valid).toBeTrue();
  });

  it('should call "dialogRef.close()" with the correct data when saving a client', () => {
    component.clientForm.setValue({
      name: 'James Deen',
      phone: '1234567890',
      email: 'test@example.com',
      startDate: '2024-01-01',
      endDate: '2024-12-31'
    });

    component.saveClient();

    expect(dialogRefSpy.close).toHaveBeenCalledWith({
      name: 'James Deen',
      phone: '1234567890',
      email: 'test@example.com',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      dateAdded: undefined,
      sharedKey: 'jdeen',
      id: undefined
    });
  });

  it('should close the dialog when calling "onCancel()"', () => {
    component.onCancel();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('should not close the dialog in "onSubmit()" if the form is invalid', () => {
    component.clientForm.patchValue({ name: '' }); // Invalid form
    component.onSubmit();
    expect(dialogRefSpy.close).not.toHaveBeenCalled();
  });

  it('should close the dialog with the correct values in "onSubmit()" if the form is valid', () => {
    component.clientForm.setValue({
      name: 'James Deen',
      phone: '1234567890',
      email: 'test@example.com',
      startDate: '2024-01-01',
      endDate: '2024-12-31'
    });

    component.onSubmit();

    expect(dialogRefSpy.close).toHaveBeenCalledWith({
      name: 'James Deen',
      phone: '1234567890',
      email: 'test@example.com',
      startDate: '2024-01-01',
      endDate: '2024-12-31'
    });
  });
});
