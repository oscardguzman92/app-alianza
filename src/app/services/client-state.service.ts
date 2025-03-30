import { Injectable } from '@angular/core';
import { BehaviorSubject, take, tap } from 'rxjs';
import { Client } from '../models/client.model';
import { ClientService } from './client.service';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class ClientStateService {
  private clientSubject = new BehaviorSubject<Client[]>([]);

  clients$ = this.clientSubject.asObservable();

  constructor(private clientService: ClientService) { }

  loadClients(): void {
    this.clientService.getClients().subscribe(response => {
      const clientsArray = Array.isArray(response.data) ? response.data : [];
      this.clientSubject.next(clientsArray);
    });
  }

  getClientsByKey(sharedKey: String): void {
    this.clientService.getClientBySharedKey(sharedKey).subscribe(response => {
      const clientsArray = Array.isArray(response.data) ? response.data : [];
      this.clientSubject.next(clientsArray);
    });
  }

  addClient(client: Client): void {
    this.clientService.createClient(client).pipe(
      take(1),
      tap(response => {
        this.clients$.pipe(take(1)).subscribe(currentClients => { 
          const updatedClients = [...currentClients, response.data[0]];          
          this.clientSubject.next(updatedClients);
        });
      })
    ).subscribe();
  }

  updateClient(updatedClient: Client): void {
    this.clientService.updateClient(updatedClient).pipe(
      take(1),
      tap(() => {
        this.clients$.pipe(take(1)).subscribe(currentClients => {
          const updatedClients = currentClients.map(client =>
            client.id === updatedClient.id ? updatedClient : client
          );
          this.clientSubject.next(updatedClients);
        });
      })
    ).subscribe();
  }

  

 
}
