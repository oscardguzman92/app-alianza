import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
// Angular Material Modules
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ClientTableComponent } from './app/components/client-table/client-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter([ { path: '', component: ClientTableComponent },
    ]),
    importProvidersFrom(
      FormsModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatTableModule,
      MatDialogModule,
      MatButtonModule,
      MatInputModule,
      MatIconModule,
      ReactiveFormsModule, 
      MatSortModule,
      MatPaginatorModule      
    )
  ]
});
