import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-client-search',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './client-search.component.html',
  styleUrl: './client-search.component.scss'
})
export class ClientSearchComponent {
  @Output() filterChanged = new EventEmitter<any>();
  filterForm : FormGroup;

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      name: [''],
      email: [''],
      phone: ['']
    });
  }

  applyFilter() {
    this.filterChanged.emit(this.filterForm.value);
  }

  clearFilter() {
    this.filterForm.reset();
    this.applyFilter();
  }
}
