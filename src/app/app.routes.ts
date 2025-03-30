import { Routes } from '@angular/router';
import { ClientTableComponent } from './components/client-table/client-table.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    { path: '', component: ClientTableComponent }, 
  { path: '**', redirectTo: '' }
];
