import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClientFormModalComponent } from '../client-form-modal/client-form-modal.component';
import { Client } from '../../models/client.model';
import { ClientSearchComponent } from '../client-search/client-search.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { saveAs } from 'file-saver';
import { MatFormField, MatFormFieldControl, MatLabel } from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ClientStateService } from '../../services/client-state.service';
import { take } from 'rxjs';


@Component({
  selector: 'app-client-table',
  standalone: true,
  imports: [ClientSearchComponent, 
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule,
    MatIconModule, 
    MatTableModule,
    MatCardModule, 
    MatLabel, 
    MatFormField, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButton],
  templateUrl: './client-table.component.html',
  styleUrl: './client-table.component.scss'
})
export class ClientTableComponent {
  displayedColumns: string[] = ['sharedKey', 'name', 'email', 'phone', 'dateAdded', 'actions'];
  /*clients:Client[] = [
    {id: 1, sharedKey: 'oguzman', name: 'Oscar Guzman', phone: '1234567890', email: 'oscarguz92@example.com', dateAdded: new Date(), startDate: new Date('20/05/2019'), endDate: new Date('20/05/2019') }
  ];*/
  filteredClients = new MatTableDataSource<Client>([]);
  //filteredClients = [...this.clients];
  showAdvancedSearch = false;

  constructor(private dialog: MatDialog, private clientState: ClientStateService) {}

  ngOnInit():void {
    this.clientState.clients$.subscribe((clients: Client[]) => {
      this.filteredClients.data = clients;
    });
    this.clientState.loadClients(); 
  }

  openDialog(client?: Client): void {
    console.log(client);
    const dialogRef = this.dialog.open(ClientFormModalComponent, {
      width: '400px',      
        data: {
          isEdit: !!client,  
          client: client ? {...client} : null
        }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const isEdit = dialogRef.componentInstance?.data?.isEdit;        
        if (isEdit) {        
          this.clientState.updateClient(result);
        } else {
          const newClient = { ...result, dateAdded: new Date() };
          this.clientState.addClient(newClient);
        }
      }   
      
      
    });
  }

  toggleAdvancedSearch() {
    this.showAdvancedSearch = !this.showAdvancedSearch;
  }

  getClientsByKey(sharedKey: any) {
    this.clientState.clients$.pipe(take(1)).subscribe((clients: Client[]) => {
    this.filteredClients.data = clients.filter(client => 
        !sharedKey || client.sharedKey.toLowerCase().includes(sharedKey.toLowerCase())
      );      
      //this.filteredClients = new MatTableDataSource(filtered);
    });
  }

  /*onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value.trim();
    this.getClientsByKey(value);
  }*/
  

  applyQuickFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filteredClients.filter = filterValue;
  }

  applyFilter(filters: any) {
    console.log(filters);
    console.log(filters.name);
    this.clientState.clients$.subscribe((clients: Client[]) => {
      console.log(clients);
      this.filteredClients.data = clients.filter(client => {
        return (!filters.name || client.name?.toLowerCase().includes(filters.name.toLowerCase())) &&
               (!filters.email || client.email.toLowerCase().includes(filters.email.toLowerCase())) &&
               (!filters.phone || client.phone.includes(filters.phone));
      })
    });
  }

  search() {
    console.log('Buscar ejecutado');
  }

  clearFilters() {
    console.log('Limpiar filtros');
  }

  exportToCSV() {
    const csvData = this.convertToCSV(this.filteredClients.data);
    const blob = new Blob([csvData], { type: 'text/csv' });
    saveAs(blob, 'clientes.csv');
  }

  private convertToCSV(clients: Client[]): string {
    const headers = Object.keys(clients[0]).join(',');
    const rows = clients.map(client => Object.values(client).join(','));
    return [headers, ...rows].join('\n');
  }
}
